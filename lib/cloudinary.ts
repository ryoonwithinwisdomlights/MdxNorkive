import { v2 as cloudinary } from "cloudinary";

// Cloudinary 설정
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
}

/**
 * 이미지를 Cloudinary에 업로드
 */
export async function uploadImageToCloudinary(
  imageBuffer: Buffer,
  fileName: string,
  options: {
    folder?: string;
    transformation?: string;
  } = {}
): Promise<CloudinaryUploadResult> {
  try {
    // Base64로 인코딩
    const base64Image = imageBuffer.toString("base64");
    const dataURI = `data:image/jpeg;base64,${base64Image}`;

    // 업로드 옵션 설정
    const uploadOptions: any = {
      resource_type: "image",
      folder: process.env.CLOUDINARY_UPLOAD_FOLDER!,
      public_id: `${Date.now()}-${fileName.replace(/\.[^/.]+$/, "")}`,
      overwrite: false,
    };

    // 변환 옵션이 있으면 추가
    if (options.transformation) {
      uploadOptions.transformation = options.transformation;
    }

    // Cloudinary에 업로드
    const result = await cloudinary.uploader.upload(dataURI, uploadOptions);

    return {
      secure_url: result.secure_url,
      public_id: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
    };
  } catch (error) {
    console.error("Cloudinary 업로드 실패:", error);
    throw new Error(`Cloudinary 업로드 실패: ${error}`);
  }
}

/**
 * URL에서 이미지를 다운로드하여 Cloudinary에 업로드
 */
export async function uploadImageFromUrl(
  imageUrl: string,
  fileName: string
): Promise<CloudinaryUploadResult> {
  try {
    // 이미지 다운로드
    const response = await fetch(imageUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; NorkiveBot/1.0)",
      },
    });

    if (!response.ok) {
      throw new Error(`이미지 다운로드 실패: ${response.status}`);
    }

    const imageBuffer = Buffer.from(await response.arrayBuffer());

    // Cloudinary에 업로드
    return await uploadImageToCloudinary(imageBuffer, fileName, {
      folder: process.env.CLOUDINARY_UPLOAD_FOLDER!,
      // transformation: "f_auto,q_auto", // 자동 포맷, 자동 품질 (일부 계정에서 지원되지 않을 수 있음)
    });
  } catch (error) {
    console.error("URL에서 Cloudinary 업로드 실패:", error);
    throw error;
  }
}

/**
 * Cloudinary 이미지 삭제
 */
export async function deleteImageFromCloudinary(
  publicId: string
): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Cloudinary 이미지 삭제 실패:", error);
    throw error;
  }
}

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

  const transformations: string[] = [];

  if (options.width) transformations.push(`w_${options.width}`);
  if (options.height) transformations.push(`h_${options.height}`);
  if (options.quality) transformations.push(`q_${options.quality}`);
  if (options.format) transformations.push(`f_${options.format}`);

  if (transformations.length === 0) {
    return originalUrl;
  }

  // URL에 변환 파라미터 추가
  const separator = originalUrl.includes("?") ? "&" : "?";
  return `${originalUrl}${separator}${transformations.join(",")}`;
}
