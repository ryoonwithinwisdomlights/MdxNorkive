/**
 * Notion 문서 처리 유틸리티
 * Notion에서 가져온 문서들을 Cloudinary로 변환하고 캐시 관리
 *
 * @deprecated 새로운 코드에서는 MediaProcessor를 직접 사용하세요.
 * 이 함수들은 하위 호환성을 위해 유지되며, 내부적으로 MediaProcessor를 사용합니다.
 */

import { redisCacheManager } from "@/lib/cache/redis_cache_manager";
import { uploadPdfFromUrl } from "@norkive/mdx-cloudinary-processor";
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
        return await uploadPdfFromUrl(url, fileName);
      },
      uploadPdfFromUrl: async (url, fileName) => {
        return await uploadPdfFromUrl(url, fileName);
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

// 문서 처리 통계 (기존 변수와 호환)
export let processedFilesCount = 0;
export let cloudinaryFileUploadCount = 0;

/**
 * 통계 동기화 헬퍼
 */
function syncStats() {
  const processor = getDefaultProcessor();
  const stats = processor.getDocumentStats();
  processedFilesCount = stats.processedFilesCount;
  cloudinaryFileUploadCount = stats.cloudinaryFileUploadCount;
}

/**
 * 문서 링크를 Cloudinary URL로 변환 (PDF, DOC, RTF 등)
 * @deprecated 새로운 코드에서는 MediaProcessor를 직접 사용하세요
 */
export async function processDocumentLinks(content: string): Promise<string> {
  const processor = getDefaultProcessor();
  const result = await processor.processDocumentLinks(content);
  syncStats();
  return result;
}

/**
 * 파일 확장자가 문서인지 확인
 */
export function isDocumentFile(fileName: string): boolean {
  const processor = getDefaultProcessor();
  return processor.isDocumentFile(fileName);
}

/**
 * 통계 초기화
 */
export function resetDocumentStats(): void {
  const processor = getDefaultProcessor();
  processor.resetStats();
  processedFilesCount = 0;
  cloudinaryFileUploadCount = 0;
}

/**
 * 문서 처리 통계 출력
 */
export function printDocumentStats(): void {
  const processor = getDefaultProcessor();
  processor.printDocumentStats();
}
