/**
 * Media Processor 클래스
 *  * @deprecated
 * 의존성 주입을 통한 유연한 미디어 처리
 */

import { IMAGE_EXTENSIONS, FILE_EXTENSIONS } from "@/constants/mdx.constants";
import type {
  CloudinaryUploader,
  CacheManager,
  MediaProcessorConfig,
  ImageProcessorStats,
  DocumentProcessorStats,
} from "./types";

/**
 * 미디어 프로세서 클래스
 * 이미지 및 문서 처리를 담당
 */
export class MediaProcessor {
  private uploader: CloudinaryUploader;
  private cache?: CacheManager;
  private options: Required<NonNullable<MediaProcessorConfig["options"]>>;

  // 통계
  private imageStats: ImageProcessorStats = {
    processedImagesCount: 0,
    cloudinaryUploadCount: 0,
    cacheHitCount: 0,
    processedPageCoversCount: 0,
  };

  private documentStats: DocumentProcessorStats = {
    processedFilesCount: 0,
    cloudinaryFileUploadCount: 0,
  };

  constructor(config: MediaProcessorConfig) {
    this.uploader = config.uploader;
    this.cache = config.cache;
    this.options = {
      enableWebP: config.options?.enableWebP ?? false,
      quality: config.options?.quality ?? 85,
      progressive: config.options?.progressive ?? true,
    };
  }

  /**
   * 페이지 커버 이미지 처리
   */
  async processPageCover(pageCover: string | null): Promise<string | null> {
    if (!pageCover) return null;

    // Unsplash 이미지 URL인지 확인
    if (this.isUnsplashImageUrl(pageCover)) {
      return pageCover;
    }

    // Notion 만료 이미지 URL인지 확인
    if (this.isNotionExpiringImageUrl(pageCover)) {
      console.log(
        `🖼️ Notion 만료 pageCover 처리: ${this.extractFileName(pageCover)}`
      );
      const cloudinaryUrl = await this.getOrCreateCloudinaryUrl(
        pageCover,
        "pagecover"
      );
      this.imageStats.processedPageCoversCount++;
      return cloudinaryUrl;
    }

    // 이미 Cloudinary URL이거나 다른 안전한 URL인 경우 그대로 반환
    return pageCover;
  }

  /**
   * 노션 이미지 URL을 Cloudinary URL로 변환
   */
  async processNotionImages(content: string): Promise<string> {
    // 마크다운 이미지 문법 처리: ![alt](url)
    const markdownImageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    let processedContent = content;

    const markdownMatches = [...content.matchAll(markdownImageRegex)];
    for (const match of markdownMatches) {
      const [fullMatch, alt, imageUrl] = match;

      // alt 텍스트에 파일 확장자가 있고, 그 확장자가 이미지이고, URL이 Notion URL인 경우만 처리
      if (
        alt &&
        this.isImageFile(alt) &&
        this.isNotionImageOrFileUrl(imageUrl)
      ) {
        console.log(`🖼️ 이미지 파일 감지: ${alt}`);
        const cloudinaryUrl = await this.getOrCreateCloudinaryUrl(
          imageUrl,
          "content"
        );
        const newImageTag = `![${alt}](${cloudinaryUrl})`;
        processedContent = processedContent.replace(fullMatch, newImageTag);
        this.imageStats.processedImagesCount++;
      }
    }

    // HTML img 태그 처리: <img src="url">
    const htmlImageRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/g;
    const htmlMatches = [...processedContent.matchAll(htmlImageRegex)];

    for (const match of htmlMatches) {
      const [fullMatch, imageUrl] = match;

      if (this.isNotionImageOrFileUrl(imageUrl)) {
        const cloudinaryUrl = await this.getOrCreateCloudinaryUrl(
          imageUrl,
          "content"
        );
        const newImageTag = fullMatch.replace(imageUrl, cloudinaryUrl);
        processedContent = processedContent.replace(fullMatch, newImageTag);
        this.imageStats.processedImagesCount++;
      }
    }

    return processedContent;
  }

  /**
   * 문서 링크를 Cloudinary URL로 변환 (PDF, DOC, RTF 등)
   */
  async processDocumentLinks(content: string): Promise<string> {
    // 문서 링크 패턴: [파일명.확장자](URL)
    const documentLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

    let processedContent = content;
    let match;

    while ((match = documentLinkRegex.exec(content)) !== null) {
      const [fullMatch, fileName, documentUrl] = match;

      // 파일명이 문서 확장자를 가지고 있고, URL이 Notion URL인 경우만 처리
      if (
        fileName &&
        this.isDocumentFile(fileName) &&
        this.isNotionImageOrFileUrl(documentUrl)
      ) {
        try {
          console.log(`📄 문서 처리 중: ${fileName} (${documentUrl})`);

          // 캐시된 URL 확인
          let cloudinaryUrl: string | null = null;

          if (this.cache) {
            cloudinaryUrl = await this.cache.getCachedImageUrl(documentUrl);
          }

          if (cloudinaryUrl) {
            console.log(`🔄 문서 캐시 히트: ${fileName}`);
          } else {
            // 문서를 Cloudinary에 업로드
            console.log(`☁️ 문서 Cloudinary 업로드 시작: ${fileName}`);
            const uploadMethod =
              this.uploader.uploadPdfFromUrl || this.uploader.uploadFileFromUrl;
            const cloudinaryResult = await uploadMethod(documentUrl, fileName);

            // 캐시에 저장
            if (this.cache) {
              await this.cache.cacheImageUrl(
                documentUrl,
                cloudinaryResult.secure_url,
                {
                  fileName: fileName,
                  size: cloudinaryResult.bytes,
                  contentType: `application/${cloudinaryResult.format}`,
                }
              );
            }

            cloudinaryUrl = cloudinaryResult.secure_url;
            this.documentStats.cloudinaryFileUploadCount++;
            console.log(
              `✅ 문서 Cloudinary 업로드 완료: ${fileName} → ${cloudinaryResult.secure_url}`
            );
          }

          // 원본 링크를 Cloudinary URL로 교체
          const newLink = `[${fileName}](${cloudinaryUrl})`;
          processedContent = processedContent.replace(fullMatch, newLink);
          this.documentStats.processedFilesCount++;
        } catch (error) {
          console.error(`❌ 문서 처리 실패: ${fileName}`, error);
          // 실패 시 원본 링크 유지
        }
      }
    }

    return processedContent;
  }

  /**
   * Cloudinary 업로드 및 캐시 관리
   */
  private async getOrCreateCloudinaryUrl(
    originalUrl: string,
    type: "content" | "pagecover" = "content"
  ): Promise<string> {
    try {
      // 캐시 확인
      let cachedUrl: string | null = null;
      if (this.cache) {
        cachedUrl = await this.cache.getCachedImageUrl(originalUrl);
      }

      if (cachedUrl) {
        this.imageStats.cacheHitCount++;
        console.log(`🔄 캐시 히트: ${this.extractFileName(originalUrl)}`);
        return cachedUrl;
      }

      // 캐시된 URL이 없으면 업로드
      console.log(
        `☁️ Cloudinary 업로드 시작: ${this.extractFileName(originalUrl)}`
      );
      const fileName = this.extractFileName(originalUrl);
      const uploadMethod =
        this.uploader.uploadImageFromUrl || this.uploader.uploadFileFromUrl;
      const cloudinaryResult = await uploadMethod(originalUrl, fileName);

      // 캐시에 저장
      if (this.cache) {
        await this.cache.cacheImageUrl(
          originalUrl,
          cloudinaryResult.secure_url,
          {
            fileName: fileName,
            size: cloudinaryResult.bytes,
            contentType: `image/${cloudinaryResult.format}`,
          }
        );
      }

      this.imageStats.cloudinaryUploadCount++;
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
  extractFileName(url: string): string {
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
  isUnsplashImageUrl(url: string): boolean {
    return url.startsWith("https://images.unsplash.com");
  }

  /**
   * Notion 만료 이미지 URL인지 확인
   */
  isNotionExpiringImageUrl(url: string): boolean {
    return url.startsWith(
      "https://prod-files-secure.s3.us-west-2.amazonaws.com"
    );
  }

  /**
   * 노션 이미지 URL인지 확인
   */
  isNotionImageOrFileUrl(url: string): boolean {
    return (
      url.includes("prod-files-secure.s3.us-west-2.amazonaws.com") ||
      url.includes("s3.us-west-2.amazonaws.com") ||
      url.includes("notion.so")
    );
  }

  /**
   * 파일 확장자가 이미지인지 확인
   */
  isImageFile(fileName: string): boolean {
    return IMAGE_EXTENSIONS.some((ext) =>
      fileName.toLowerCase().endsWith(`.${ext}`)
    );
  }

  /**
   * 파일 확장자가 문서인지 확인
   */
  isDocumentFile(fileName: string): boolean {
    return FILE_EXTENSIONS.some((ext) =>
      fileName.toLowerCase().endsWith(`.${ext}`)
    );
  }

  /**
   * 통계 초기화
   */
  resetStats(): void {
    this.imageStats = {
      processedImagesCount: 0,
      cloudinaryUploadCount: 0,
      cacheHitCount: 0,
      processedPageCoversCount: 0,
    };
    this.documentStats = {
      processedFilesCount: 0,
      cloudinaryFileUploadCount: 0,
    };
  }

  /**
   * 이미지 처리 통계 조회
   */
  getImageStats(): ImageProcessorStats {
    return { ...this.imageStats };
  }

  /**
   * 문서 처리 통계 조회
   */
  getDocumentStats(): DocumentProcessorStats {
    return { ...this.documentStats };
  }

  /**
   * 이미지 처리 통계 출력
   */
  printImageStats(): void {
    console.log("\n📊 이미지 처리 통계:");
    console.log(
      `   - 총 처리된 이미지: ${this.imageStats.processedImagesCount}개`
    );
    console.log(
      `   - Cloudinary 업로드: ${this.imageStats.cloudinaryUploadCount}개`
    );
    console.log(`   - 캐시 히트: ${this.imageStats.cacheHitCount}개`);
    console.log(
      `   - 처리된 pageCover: ${this.imageStats.processedPageCoversCount}개`
    );
  }

  /**
   * 문서 처리 통계 출력
   */
  printDocumentStats(): void {
    console.log("\n📄 문서 처리 통계:");
    console.log(
      `   - 총 처리된 문서: ${this.documentStats.processedFilesCount}개`
    );
    console.log(
      `   - Cloudinary 문서 업로드: ${this.documentStats.cloudinaryFileUploadCount}개`
    );
  }
}
