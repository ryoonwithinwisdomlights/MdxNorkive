/**
 * Notion 이미지 처리 유틸리티
 * Notion에서 가져온 이미지들을 Cloudinary로 변환하고 캐시 관리
 */

import { imageCacheManager } from "@/lib/cache/image_cache_manager";
import { uploadImageFromUrl } from "@/lib/cloudinary";

// 이미지 처리 통계
export let processedImagesCount = 0;
export let cloudinaryUploadCount = 0;
export let cacheHitCount = 0;
export let processedPageCoversCount = 0;

/**
 * 페이지 커버 이미지 처리
 */
export async function processPageCover(
  pageCover: string | null
): Promise<string | null> {
  if (!pageCover) return null;

  // Unsplash 이미지 URL인지 확인
  if (isUnsplashImageUrl(pageCover)) {
    return pageCover;
  }

  // Notion 만료 이미지 URL인지 확인
  if (isNotionExpiringImageUrl(pageCover)) {
    console.log(`🖼️ Notion 만료 pageCover 처리: ${extractFileName(pageCover)}`);
    const cloudinaryUrl = await getOrCreateCloudinaryUrl(
      pageCover,
      "pagecover"
    );
    processedPageCoversCount++;
    return cloudinaryUrl;
  }

  // 이미 Cloudinary URL이거나 다른 안전한 URL인 경우 그대로 반환
  return pageCover;
}

/**
 * 노션 이미지 URL을 Cloudinary URL로 변환
 */
export async function processNotionImages(content: string): Promise<string> {
  // 마크다운 이미지 문법 처리: ![alt](url)
  const markdownImageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  let processedContent = content;

  const markdownMatches = [...content.matchAll(markdownImageRegex)];
  for (const match of markdownMatches) {
    const [fullMatch, alt, imageUrl] = match;

    // alt 텍스트에 파일 확장자가 있고, 그 확장자가 이미지이고, URL이 Notion URL인 경우만 처리
    if (alt && isImageFile(alt) && isNotionImageUrl(imageUrl)) {
      console.log(`🖼️ 이미지 파일 감지: ${alt}`);
      const cloudinaryUrl = await getOrCreateCloudinaryUrl(imageUrl, "content");
      const newImageTag = `![${alt}](${cloudinaryUrl})`;
      processedContent = processedContent.replace(fullMatch, newImageTag);
      processedImagesCount++;
    }
  }

  // HTML img 태그 처리: <img src="url">
  const htmlImageRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/g;
  const htmlMatches = [...processedContent.matchAll(htmlImageRegex)];

  for (const match of htmlMatches) {
    const [fullMatch, imageUrl] = match;

    if (isNotionImageUrl(imageUrl)) {
      const cloudinaryUrl = await getOrCreateCloudinaryUrl(imageUrl, "content");
      const newImageTag = fullMatch.replace(imageUrl, cloudinaryUrl);
      processedContent = processedContent.replace(fullMatch, newImageTag);
      processedImagesCount++;
    }
  }

  return processedContent;
}

/**
 * Cloudinary 업로드 및 캐시 관리
 */
export async function getOrCreateCloudinaryUrl(
  originalUrl: string,
  type: "content" | "pagecover" = "content"
): Promise<string> {
  try {
    // Redis에서 캐시된 URL 확인
    const cachedUrl = await imageCacheManager.getCachedImageUrl(originalUrl);

    if (cachedUrl) {
      cacheHitCount++;
      console.log(`🔄 캐시 히트: ${extractFileName(originalUrl)}`);
      return cachedUrl;
    }

    // 캐시된 URL이 없으면 Cloudinary에 업로드
    console.log(`☁️ Cloudinary 업로드 시작: ${extractFileName(originalUrl)}`);
    const fileName = extractFileName(originalUrl);
    const cloudinaryResult = await uploadImageFromUrl(originalUrl, fileName);

    // Redis에 캐시 정보 저장
    await imageCacheManager.cacheImageUrl(
      originalUrl,
      cloudinaryResult.secure_url,
      {
        fileName: fileName,
        size: cloudinaryResult.bytes,
        contentType: `image/${cloudinaryResult.format}`,
      }
    );

    cloudinaryUploadCount++;
    console.log(
      `✅ Cloudinary 업로드 완료: ${fileName} → ${cloudinaryResult.secure_url}`
    );

    return cloudinaryResult.secure_url;
  } catch (error) {
    console.error(`❌ 이미지 처리 실패: ${originalUrl}`, error);
    // 실패 시 원본 URL 반환
    return originalUrl;
  }
}

/**
 * 파일명 추출
 */
export function extractFileName(url: string): string {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    let fileName = pathname.split("/").pop() || "image.jpg";

    if (fileName.includes("?")) {
      fileName = fileName.split("?")[0];
    }

    // 안전한 파일명으로 변환
    const safeFileName = fileName
      .replace(/[^a-zA-Z0-9가-힣._-]/g, "_")
      .replace(/_{2,}/g, "_")
      .replace(/^_|_$/g, "");

    return safeFileName || `image_${Date.now()}.jpg`;
  } catch (error) {
    return `image_${Date.now()}.jpg`;
  }
}

/**
 * Unsplash 이미지 URL인지 확인
 */
export function isUnsplashImageUrl(url: string): boolean {
  return url.startsWith("https://images.unsplash.com");
}

/**
 * Notion 만료 이미지 URL인지 확인
 */
export function isNotionExpiringImageUrl(url: string): boolean {
  return url.startsWith("https://prod-files-secure.s3.us-west-2.amazonaws.com");
}

/**
 * 노션 이미지 URL인지 확인
 */
export function isNotionImageUrl(url: string): boolean {
  return (
    url.includes("prod-files-secure.s3.us-west-2.amazonaws.com") ||
    url.includes("s3.us-west-2.amazonaws.com") ||
    url.includes("notion.so")
  );
}

/**
 * 파일 확장자가 이미지인지 확인
 */
export function isImageFile(fileName: string): boolean {
  const imageExtensions = [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "webp",
    "svg",
    "bmp",
    "tiff",
    "ico",
    "JPG",
    "JPEG",
    "PNG",
    "GIF",
    "WEBP",
    "SVG",
    "BMP",
    "TIFF",
    "ICO",
  ];

  return imageExtensions.some((ext) =>
    fileName.toLowerCase().endsWith(`.${ext}`)
  );
}

/**
 * 통계 초기화
 */
export function resetImageStats(): void {
  processedImagesCount = 0;
  cloudinaryUploadCount = 0;
  cacheHitCount = 0;
  processedPageCoversCount = 0;
}

/**
 * 이미지 처리 통계 출력
 */
export function printImageStats(): void {
  console.log("\n📊 이미지 처리 통계:");
  console.log(`   - 총 처리된 이미지: ${processedImagesCount}개`);
  console.log(`   - Cloudinary 업로드: ${cloudinaryUploadCount}개`);
  console.log(`   - 캐시 히트: ${cacheHitCount}개`);
  console.log(`   - 처리된 pageCover: ${processedPageCoversCount}개`);
}
