/**
 * Media Processor 타입 정의
 * 패키지화를 위한 인터페이스 정의
 *  * @deprecated v2에서 사용하지 않음
 */

import { CloudinaryUploadResult } from "@/types/cloudinaty.model";

/**
 * Cloudinary 업로더 인터페이스
 * 사용자가 구현체를 제공하여 Cloudinary 또는 다른 서비스 사용 가능
 */
export interface CloudinaryUploader {
  /**
   * URL에서 파일을 다운로드하여 업로드
   * @param url 원본 파일 URL
   * @param fileName 파일명
   * @returns 업로드 결과
   */
  uploadFileFromUrl(
    url: string,
    fileName: string
  ): Promise<CloudinaryUploadResult>;

  /**
   * 이미지 업로드 (호환성을 위한 별도 메서드, 내부적으로 uploadFileFromUrl 사용 가능)
   * @param url 원본 이미지 URL
   * @param fileName 파일명
   * @returns 업로드 결과
   */
  uploadImageFromUrl?(
    url: string,
    fileName: string
  ): Promise<CloudinaryUploadResult>;

  /**
   * PDF/문서 업로드 (호환성을 위한 별도 메서드, 내부적으로 uploadFileFromUrl 사용 가능)
   * @param url 원본 파일 URL
   * @param fileName 파일명
   * @returns 업로드 결과
   */
  uploadPdfFromUrl?(
    url: string,
    fileName: string
  ): Promise<CloudinaryUploadResult>;
}

/**
 * 캐시 매니저 인터페이스
 * 선택적 의존성 - 캐시 없이도 동작 가능
 */
export interface CacheManager {
  /**
   * 캐시된 URL 조회
   * @param originalUrl 원본 URL
   * @returns 캐시된 URL 또는 null
   */
  getCachedImageUrl(originalUrl: string): Promise<string | null>;

  /**
   * URL 캐시 저장
   * @param originalUrl 원본 URL
   * @param cachedUrl 캐시된 URL
   * @param metadata 메타데이터 (선택적)
   */
  cacheImageUrl(
    originalUrl: string,
    cachedUrl: string,
    metadata?: {
      fileName?: string;
      size?: number;
      contentType?: string;
    }
  ): Promise<void>;
}

/**
 * 미디어 프로세서 설정
 */
export interface MediaProcessorConfig {
  /** 업로더 구현체 (필수) */
  uploader: CloudinaryUploader;
  /** 캐시 매니저 (선택적) */
  cache?: CacheManager;
  /** 처리 옵션 */
  options?: {
    /** WebP 최적화 활성화 */
    enableWebP?: boolean;
    /** 이미지 품질 (1-100) */
    quality?: number;
    /** Progressive JPEG 사용 */
    progressive?: boolean;
  };
}

/**
 * 이미지 처리 통계
 */
export interface ImageProcessorStats {
  processedImagesCount: number;
  cloudinaryUploadCount: number;
  cacheHitCount: number;
  processedPageCoversCount: number;
}

/**
 * 문서 처리 통계
 */
export interface DocumentProcessorStats {
  processedFilesCount: number;
  cloudinaryFileUploadCount: number;
}
