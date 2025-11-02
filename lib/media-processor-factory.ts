/**
 * Media Processor Factory
 *
 * @norkive/mdx-cloudinary-processor 패키지를 위한 설정 팩토리
 * Cloudinary 초기화 및 Media Processor 인스턴스를 생성합니다.
 */

import {
  createMediaProcessor,
  initializeCloudinary,
  setDefaultFolder,
  uploadFileFromUrl,
  uploadImageFromUrl,
  uploadPdfFromUrl,
  type CloudinaryUploader,
  type CacheManager,
  type CloudinaryConfig,
} from "@norkive/mdx-cloudinary-processor";
import { EXTERNAL_CONFIG } from "@/config/external.config";
import { redisCacheManager } from "@/lib/cache/redis_cache_manager";

// 1. Cloudinary 설정 읽기 및 검증
const cloudinaryConfig: CloudinaryConfig = {
  cloud_name: EXTERNAL_CONFIG.CLOUDINARY_CLOUD_NAME,
  api_key: EXTERNAL_CONFIG.CLOUDINARY_API_KEY,
  api_secret: EXTERNAL_CONFIG.CLOUDINARY_API_SECRET,
  folder: EXTERNAL_CONFIG.CLOUDINARY_UPLOAD_FOLDER,
};

// 2. Cloudinary 초기화
initializeCloudinary(cloudinaryConfig);

// 3. 기본 폴더 설정
if (cloudinaryConfig.folder) {
  setDefaultFolder(cloudinaryConfig.folder);
}

// 4. 패키지 업로드 함수들을 인터페이스로 래핑
const uploader: CloudinaryUploader = {
  uploadFileFromUrl,
  uploadImageFromUrl,
  uploadPdfFromUrl,
};

// 5. 캐시 매니저 설정
const cache: CacheManager = {
  getCachedImageUrl:
    redisCacheManager.getCachedImageUrl.bind(redisCacheManager),
  cacheImageUrl: redisCacheManager.cacheImageUrl.bind(redisCacheManager),
};

// 6. Media Processor 인스턴스 생성 및 export
export const mediaProcessor = createMediaProcessor({
  uploader,
  cache,
});
