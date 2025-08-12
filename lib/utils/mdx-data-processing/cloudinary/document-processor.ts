/**
 * Notion 문서 처리 유틸리티
 * Notion에서 가져온 문서들을 Cloudinary로 변환하고 캐시 관리
 */

import { imageCacheManager } from "@/lib/cache/image_cache_manager";
import { uploadPdfFromUrl } from "@/lib/cloudinary";
import { isNotionImageOrFileUrl } from "./image-processor";
import { FILE_EXTENSIONS } from "@/constants/mdx.constants";

// 문서 처리 통계
export let processedFilesCount = 0;
export let cloudinaryFileUploadCount = 0;

/**
 * 문서 링크를 Cloudinary URL로 변환 (PDF, DOC, RTF 등)
 */
export async function processDocumentLinks(content: string): Promise<string> {
  // 문서 링크 패턴: [파일명.확장자](URL)
  const documentLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

  let processedContent = content;
  let match;

  while ((match = documentLinkRegex.exec(content)) !== null) {
    const [fullMatch, fileName, documentUrl] = match;

    // 파일명이 문서 확장자를 가지고 있고, URL이 Notion URL인 경우만 처리
    if (
      fileName &&
      isDocumentFile(fileName) &&
      isNotionImageOrFileUrl(documentUrl)
    ) {
      try {
        console.log(`📄 문서 처리 중: ${fileName} (${documentUrl})`);

        // Redis에서 캐시된 URL 확인
        const cachedUrl = await imageCacheManager.getCachedImageUrl(
          documentUrl
        );

        let cloudinaryUrl: string;

        if (cachedUrl) {
          console.log(`🔄 문서 캐시 히트: ${fileName}`);
          cloudinaryUrl = cachedUrl;
        } else {
          // 문서를 Cloudinary에 업로드
          console.log(`☁️ 문서 Cloudinary 업로드 시작: ${fileName}`);
          const cloudinaryResult = await uploadPdfFromUrl(
            documentUrl,
            fileName
          );

          // Redis에 캐시 정보 저장
          await imageCacheManager.cacheImageUrl(
            documentUrl,
            cloudinaryResult.secure_url,
            {
              fileName: fileName,
              size: cloudinaryResult.bytes,
              contentType: `application/${cloudinaryResult.format}`,
            }
          );

          cloudinaryUrl = cloudinaryResult.secure_url;
          cloudinaryFileUploadCount++;
          console.log(
            `✅ 문서 Cloudinary 업로드 완료: ${fileName} → ${cloudinaryResult.secure_url}`
          );
        }

        // 원본 링크를 Cloudinary URL로 교체
        const newLink = `[${fileName}](${cloudinaryUrl})`;
        processedContent = processedContent.replace(fullMatch, newLink);
        processedFilesCount++;
      } catch (error) {
        console.error(`❌ 문서 처리 실패: ${fileName}`, error);
        // 실패 시 원본 링크 유지
      }
    }
  }

  return processedContent;
}

/**
 * 파일 확장자가 문서인지 확인
 */
export function isDocumentFile(fileName: string): boolean {
  return FILE_EXTENSIONS.some((ext) =>
    fileName.toLowerCase().endsWith(`.${ext}`)
  );
}

/**
 * 통계 초기화
 */
export function resetDocumentStats(): void {
  processedFilesCount = 0;
  cloudinaryFileUploadCount = 0;
}

/**
 * 문서 처리 통계 출력
 */
export function printDocumentStats(): void {
  console.log("\n📄 문서 처리 통계:");
  console.log(`   - 총 처리된 문서: ${processedFilesCount}개`);
  console.log(`   - Cloudinary 문서 업로드: ${cloudinaryFileUploadCount}개`);
}
