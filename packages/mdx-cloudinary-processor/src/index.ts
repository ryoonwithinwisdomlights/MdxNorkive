/**
 * @norkive/mdx-cloudinary-processor
 * MDX 콘텐츠의 이미지 및 문서를 Cloudinary로 처리하는 미디어 프로세서
 */

// Media Processor 관련
export { MediaProcessor } from "./media-processor";
export { createMediaProcessor } from "./factory";

// 타입 정의
export type {
  CloudinaryUploader,
  CacheManager,
  MediaProcessorConfig,
  ImageProcessorStats,
  DocumentProcessorStats,
  CloudinaryUploadResult,
} from "./types";

// 상수
export { IMAGE_EXTENSIONS, FILE_EXTENSIONS } from "./constants";

// Cloudinary 설정 및 초기화
export {
  initializeCloudinary,
  type CloudinaryConfig,
} from "./cloudinary-config";
export { setDefaultFolder } from "./upload-functions";

// Cloudinary 업로드 함수들
export {
  uploadFileToCloudinary,
  uploadImageToCloudinary,
  uploadPdfToCloudinary,
  uploadFileFromUrl,
  uploadImageFromUrl,
  uploadPdfFromUrl,
  deleteImageFromCloudinary,
} from "./upload-functions";

// Cloudinary 유틸리티
export { getOptimizedImageUrl } from "./utils";

