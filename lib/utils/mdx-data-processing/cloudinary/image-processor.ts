/**
 * Notion 이미지 처리 유틸리티
 * Notion에서 가져온 이미지들을 Cloudinary로 변환하고 캐시 관리
 *
 * @deprecated 새로운 코드에서는 MediaProcessor를 직접 사용하세요.
 * 이 함수들은 하위 호환성을 위해 유지되며, 내부적으로 MediaProcessor를 사용합니다.
 */

import { redisCacheManager } from "@/lib/cache/redis_cache_manager";
import { uploadImageFromUrl } from "@norkive/mdx-cloudinary-processor";
import { createMediaProcessor } from "./factory";
import type { CacheManager, CloudinaryUploader } from "./types";

// 기본 프로세서 인스턴스 (싱글톤 패턴)
let defaultProcessor: ReturnType<typeof createMediaProcessor> | null = null;

/**
 * 기본 프로세서 초기화 (기존 코드와의 호환성을 위해)
 */
function getDefaultProcessor() {
  if (!defaultProcessor) {
    const uploader: CloudinaryUploader = {
      uploadFileFromUrl: async (url, fileName) => {
        return await uploadImageFromUrl(url, fileName);
      },
      uploadImageFromUrl: async (url, fileName) => {
        return await uploadImageFromUrl(url, fileName);
      },
    };

    const cache: CacheManager = {
      getCachedImageUrl: async (originalUrl) => {
        return await redisCacheManager.getCachedImageUrl(originalUrl);
      },
      cacheImageUrl: async (originalUrl, cachedUrl, metadata) => {
        await redisCacheManager.cacheImageUrl(originalUrl, cachedUrl, metadata);
      },
    };

    defaultProcessor = createMediaProcessor({
      uploader,
      cache,
    });
  }
  return defaultProcessor;
}

// 이미지 처리 통계 (기존 변수와 호환)
export let processedImagesCount = 0;
export let cloudinaryUploadCount = 0;
export let cacheHitCount = 0;
export let processedPageCoversCount = 0;

/**
 * 통계 동기화 헬퍼
 */
function syncStats() {
  const processor = getDefaultProcessor();
  const stats = processor.getImageStats();
  processedImagesCount = stats.processedImagesCount;
  cloudinaryUploadCount = stats.cloudinaryUploadCount;
  cacheHitCount = stats.cacheHitCount;
  processedPageCoversCount = stats.processedPageCoversCount;
}

/**
 * 페이지 커버 이미지 처리
 * @deprecated 새로운 코드에서는 MediaProcessor를 직접 사용하세요
 */
export async function processPageCover(
  pageCover: string | null
): Promise<string | null> {
  const processor = getDefaultProcessor();
  const result = await processor.processPageCover(pageCover);
  syncStats();
  return result;
}

/**
 * 노션 이미지 URL을 Cloudinary URL로 변환
 * @deprecated 새로운 코드에서는 MediaProcessor를 직접 사용하세요
 */
export async function processNotionImages(content: string): Promise<string> {
  const processor = getDefaultProcessor();
  const result = await processor.processNotionImages(content);
  syncStats();
  return result;
}

/**
 * Cloudinary 업로드 및 캐시 관리
 * @deprecated 새로운 코드에서는 MediaProcessor를 직접 사용하세요
 */
export async function getOrCreateCloudinaryUrl(
  originalUrl: string,
  type: "content" | "pagecover" = "content"
): Promise<string> {
  // processPageCover를 통해 간접적으로 처리
  const result = await processPageCover(originalUrl);
  return result || originalUrl;
}

/**
 * 파일명 추출
 */
export function extractFileName(url: string): string {
  const processor = getDefaultProcessor();
  return processor.extractFileName(url);
}

/**
 * Unsplash 이미지 URL인지 확인
 */
export function isUnsplashImageUrl(url: string): boolean {
  const processor = getDefaultProcessor();
  return processor.isUnsplashImageUrl(url);
}

/**
 * Notion 만료 이미지 URL인지 확인
 */
export function isNotionExpiringImageUrl(url: string): boolean {
  const processor = getDefaultProcessor();
  return processor.isNotionExpiringImageUrl(url);
}

/**
 * 노션 이미지 URL인지 확인
 */
export function isNotionImageOrFileUrl(url: string): boolean {
  const processor = getDefaultProcessor();
  return processor.isNotionImageOrFileUrl(url);
}

/**
 * 파일 확장자가 이미지인지 확인
 */
export function isImageFile(fileName: string): boolean {
  const processor = getDefaultProcessor();
  return processor.isImageFile(fileName);
}

/**
 * 통계 초기화
 */
export function resetImageStats(): void {
  const processor = getDefaultProcessor();
  processor.resetStats();
  processedImagesCount = 0;
  cloudinaryUploadCount = 0;
  cacheHitCount = 0;
  processedPageCoversCount = 0;
}

/**
 * 이미지 처리 통계 출력
 */
export function printImageStats(): void {
  const processor = getDefaultProcessor();
  processor.printImageStats();
}
