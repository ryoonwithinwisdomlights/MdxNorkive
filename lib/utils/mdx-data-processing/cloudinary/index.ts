// 기존 함수들 (하위 호환성)
// export * from "./document-processor";
// export * from "./image-processor";

// 새로운 구조 (의존성 주입)
export { createMediaProcessor } from "./factory";
export { MediaProcessor } from "./media-processor";
export type {
  CloudinaryUploader,
  CacheManager,
  MediaProcessorConfig,
  ImageProcessorStats,
  DocumentProcessorStats,
} from "./types";

// Enhanced image processor
export * from "./enhanced-image-processor";
