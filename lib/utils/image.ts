import { BLOG } from "@/blog.config";
import { isEmoji } from "./general";

/**
 * Compress Pictures with responsive support
 * 1. Notion image bed can compress and crop images by specifying url-query parameters
 * 2. Unsplash pictures can control the compression quality through api
 * 3. Cloudinary images can be optimized with responsive parameters
 * @param {*} image
 */
export const compressImage = ({
  image,
  width = 800,
  quality = 50,
  fmt = "webp",
  height,
  crop = "scale",
}: {
  image: string;
  width?: number;
  quality?: number;
  fmt?: string;
  height?: number;
  crop?: string;
}) => {
  if (!image) return null;

  // Notion AWS images
  if (
    image.indexOf(BLOG.NOTION_HOST) === 0 &&
    image.indexOf("amazonaws.com") > 0
  ) {
    return `${image}&width=${width}`;
  }

  // Unsplash images - 최적화 강화
  if (image.indexOf("https://images.unsplash.com/") === 0) {
    const urlObj = new URL(image);
    const params = new URLSearchParams(urlObj.search);

    // 품질과 크기 최적화
    params.set("q", quality.toString());
    params.set("w", width.toString());
    if (height) params.set("h", height.toString());

    // 포맷 최적화
    params.set("fm", fmt);
    params.set("fit", "crop");
    params.set("crop", "entropy");

    urlObj.search = params.toString();
    return urlObj.toString();
  }

  // Cloudinary images - 반응형 최적화 적용
  if (image.indexOf("https://res.cloudinary.com/") === 0) {
    // Cloudinary URL 구조: https://res.cloudinary.com/cloud_name/image/upload/v123456/folder/image.jpg
    const urlParts = image.split("/");
    const uploadIndex = urlParts.findIndex((part) => part === "upload");

    if (uploadIndex !== -1 && uploadIndex < urlParts.length - 1) {
      // upload 다음에 변환 파라미터 삽입
      const baseUrl = urlParts.slice(0, uploadIndex + 1).join("/");
      const remainingPath = urlParts.slice(uploadIndex + 1).join("/");

      // 반응형 이미지 변환 파라미터
      const transformations = [
        `w_${width}`,
        height ? `h_${height}` : "",
        `q_${quality}`,
        `f_${fmt}`,
        "c_fill", // crop: fill
        "fl_progressive", // progressive loading
        "dpr_auto", // device pixel ratio 자동 조정
      ]
        .filter(Boolean)
        .join(",");

      return `${baseUrl}/${transformations}/${remainingPath}`;
    }

    return image; // URL 구조가 예상과 다르면 원본 반환
  }

  return image;
};
