/**
 * Cloudinary 유틸리티 함수들
 */

/**
 * Cloudinary 이미지 최적화 URL 생성
 */
export function getOptimizedImageUrl(
  originalUrl: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: "auto" | "webp" | "jpg" | "png";
  } = {}
): string {
  if (!originalUrl.includes("cloudinary.com")) {
    return originalUrl;
  }

  // 기존 URL에서 변환 파라미터가 있는지 확인
  const hasTransformations =
    originalUrl.includes("/image/upload/") &&
    !originalUrl.includes("/image/upload/v");

  if (hasTransformations) {
    // 이미 변환이 적용된 URL인 경우 그대로 반환
    return originalUrl;
  }

  const transformations: string[] = [];

  if (options.width) transformations.push(`w_${options.width}`);
  if (options.height) transformations.push(`h_${options.height}`);
  if (options.quality) transformations.push(`q_${options.quality}`);
  if (options.format && options.format !== "auto")
    transformations.push(`f_${options.format}`);

  if (transformations.length === 0) {
    return originalUrl;
  }

  // Cloudinary URL 구조 변경: /image/upload/{transformations}/v{version}/{public_id}
  const urlParts = originalUrl.split("/image/upload/");
  if (urlParts.length !== 2) {
    return originalUrl;
  }

  const baseUrl = urlParts[0] + "/image/upload";
  const restOfUrl = urlParts[1];

  return `${baseUrl}/${transformations.join(",")}/${restOfUrl}`;
}

