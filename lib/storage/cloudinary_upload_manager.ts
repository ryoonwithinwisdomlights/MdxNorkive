/**
 * @deprecated
 * 이 파일은 @norkive/mdx-cloudinary-processor 패키지로 이관되었습니다.
 *
 * 새로운 코드에서는 다음을 사용하세요:
 * import { ... } from '@norkive/mdx-cloudinary-processor';
 *
 * 또는 Factory를 사용하세요:
 * import { mediaProcessor } from '@/lib/media-processor-factory';
 *
 * 호환성을 위해 패키지 함수들을 재export합니다.
 */

// 재export: @norkive/mdx-cloudinary-processor 패키지에서 함수들을 가져옴
export {
  uploadFileToCloudinary,
  uploadImageToCloudinary,
  uploadPdfToCloudinary,
  uploadFileFromUrl,
  uploadImageFromUrl,
  uploadPdfFromUrl,
  deleteImageFromCloudinary,
  getOptimizedImageUrl,
  type CloudinaryUploadResult,
} from "@norkive/mdx-cloudinary-processor";
