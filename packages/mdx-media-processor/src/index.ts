/**
 * @norkive/mdx-media-processor
 * MDX 콘텐츠의 이미지 및 문서를 처리하는 미디어 프로세서
 */

export { MediaProcessor } from "./media-processor";
export { createMediaProcessor } from "./factory";

export type {
  CloudinaryUploader,
  CacheManager,
  MediaProcessorConfig,
  ImageProcessorStats,
  DocumentProcessorStats,
  CloudinaryUploadResult,
} from "./types";

export { IMAGE_EXTENSIONS, FILE_EXTENSIONS } from "./constants";

