import { EXTERNAL_CONFIG } from "@/config/external.config";
import { CloudinaryUploadResult } from "@/types/cloudinaty.model";
import { v2 as cloudinary, UploadApiOptions } from "cloudinary";
import { FILE_EXTENSIONS, IMAGE_EXTENSIONS } from "@/constants/mdx.constants";

// Cloudinary 설정
const cloudinaryConfig = {
  cloud_name: EXTERNAL_CONFIG.CLOUDINARY_CLOUD_NAME,
  api_key: EXTERNAL_CONFIG.CLOUDINARY_API_KEY,
  api_secret: EXTERNAL_CONFIG.CLOUDINARY_API_SECRET,
  folder: EXTERNAL_CONFIG.CLOUDINARY_UPLOAD_FOLDER,
};

// 설정 확인 및 초기화
function initializeCloudinary() {
  console.log("🔧 Cloudinary 설정 확인:");
  console.log(`   - cloud_name: ${cloudinaryConfig.cloud_name}`);
  console.log(
    `   - api_key: ${cloudinaryConfig.api_key ? "✅ 설정됨" : "❌ 설정 안됨"}`
  );
  console.log(
    `   - api_secret: ${
      cloudinaryConfig.api_secret ? "✅ 설정됨" : "❌ 설정 안됨"
    }`
  );

  // 모든 설정이 완료된 경우에만 config 설정
  if (
    cloudinaryConfig.cloud_name &&
    cloudinaryConfig.api_key &&
    cloudinaryConfig.api_secret
  ) {
    cloudinary.config(cloudinaryConfig);
    console.log("✅ Cloudinary 설정 완료");
    return true;
  } else {
    console.log("❌ Cloudinary 설정 실패 - 환경변수 확인 필요");
    return false;
  }
}

// 초기화 실행
initializeCloudinary();

/**
 * 이미지를 Cloudinary에 업로드 (기존 호환성 유지)
 */
export async function uploadImageToCloudinary(
  imageBuffer: Buffer,
  fileName: string,
  options: {
    folder?: string;
    transformation?: string;
  } = {}
): Promise<CloudinaryUploadResult> {
  return await uploadFileToCloudinary(imageBuffer, fileName, options);
}

/**
 * URL에서 이미지를 다운로드하여 Cloudinary에 업로드 (기존 호환성 유지)
 */
export async function uploadImageFromUrl(
  imageUrl: string,
  fileName: string
): Promise<CloudinaryUploadResult> {
  return await uploadFileFromUrl(imageUrl, fileName);
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

/**
 * 파일을 Cloudinary에 업로드 (PDF, 문서, 이미지 등 모든 파일 타입 지원)
 */
export async function uploadFileToCloudinary(
  fileBuffer: Buffer,
  fileName: string,
  options: {
    folder?: string;
    transformation?: string;
  } = {}
): Promise<CloudinaryUploadResult> {
  try {
    // 파일 확장자 확인
    const fileExtension = fileName.split(".").pop()?.toLowerCase() || "";
    const isImage = IMAGE_EXTENSIONS.includes(fileExtension);
    // const isPdf = fileExtension === "pdf";
    const isDocument = FILE_EXTENSIONS.includes(fileExtension);

    // 파일 타입에 따른 MIME 타입 설정
    let mimeType = `application/${fileExtension}`;
    if (isImage) {
      mimeType = `image/${fileExtension === "jpg" ? "jpeg" : fileExtension}`;
    } else if (isDocument) {
      mimeType = `application/${fileExtension}`;
    }

    // Base64로 인코딩
    const base64File = fileBuffer.toString("base64");
    const dataURI = `data:${mimeType};base64,${base64File}`;

    // 파일명 길이 제한 및 안전한 문자만 사용
    const sanitizedFileName = fileName
      .replace(/\.[^/.]+$/, "") // 파일 확장자 제거
      .replace(/[^a-zA-Z0-9가-힣_-]/g, "_") // 안전하지 않은 문자를 _로 변경
      .substring(0, 50); // 최대 50자로 제한

    // 타임스탬프와 해시 기반의 안전한 public_id 생성
    const timestamp = Date.now();
    const fileNameHash = Buffer.from(sanitizedFileName)
      .toString("base64")
      .substring(0, 10);

    // 파일 타입에 따른 접두사 설정
    let prefix = "file";
    if (isImage) prefix = fileExtension;
    // else if (isPdf) prefix = fileExtension;
    else if (isDocument) prefix = fileExtension;

    const public_id = `${prefix}_${timestamp}_${fileNameHash}`;

    // 업로드 옵션 설정
    const uploadOptions: UploadApiOptions = {
      resource_type: isImage ? "image" : "raw",
      folder: options.folder || cloudinaryConfig.folder,
      public_id: public_id,
      overwrite: false,
    };

    // 이미지인 경우 변환 옵션 추가
    if (isImage && options.transformation) {
      uploadOptions.transformation = options.transformation;
    }

    // Cloudinary에 업로드
    const result = await cloudinary.uploader.upload(dataURI, uploadOptions);

    return {
      secure_url: result.secure_url,
      public_id: result.public_id,
      width: result.width || 0,
      height: result.height || 0,
      format: result.format || fileExtension,
      bytes: result.bytes,
    };
  } catch (error) {
    console.error("파일 Cloudinary 업로드 실패:", error);
    throw new Error(`파일 Cloudinary 업로드 실패: ${error}`);
  }
}

/**
 * PDF 파일을 Cloudinary에 업로드 (기존 호환성 유지)
 */
export async function uploadPdfToCloudinary(
  pdfBuffer: Buffer,
  fileName: string,
  options: {
    folder?: string;
  } = {}
): Promise<CloudinaryUploadResult> {
  return await uploadFileToCloudinary(pdfBuffer, fileName, options);
}

/**
 * URL에서 PDF를 다운로드하여 Cloudinary에 업로드
 */
export async function uploadPdfFromUrl(
  pdfUrl: string,
  fileName: string
): Promise<CloudinaryUploadResult> {
  try {
    // PDF 다운로드
    const response = await fetch(pdfUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; NorkiveBot/1.0)",
      },
    });

    if (!response.ok) {
      throw new Error(`PDF 다운로드 실패: ${response.status}`);
    }

    const pdfBuffer = Buffer.from(await response.arrayBuffer());

    // Cloudinary에 업로드
    return await uploadFileToCloudinary(pdfBuffer, fileName, {
      folder: cloudinaryConfig.folder,
    });
  } catch (error) {
    console.error("URL에서 PDF Cloudinary 업로드 실패:", error);
    throw error;
  }
}

/**
 * URL에서 파일을 다운로드하여 Cloudinary에 업로드 (모든 파일 타입 지원)
 */
export async function uploadFileFromUrl(
  fileUrl: string,
  fileName: string
): Promise<CloudinaryUploadResult> {
  try {
    // 파일 다운로드
    const response = await fetch(fileUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; NorkiveBot/1.0)",
      },
    });

    if (!response.ok) {
      throw new Error(`파일 다운로드 실패: ${response.status}`);
    }

    const fileBuffer = Buffer.from(await response.arrayBuffer());

    // Cloudinary에 업로드
    return await uploadFileToCloudinary(fileBuffer, fileName, {
      folder: cloudinaryConfig.folder,
    });
  } catch (error) {
    console.error("URL에서 파일 Cloudinary 업로드 실패:", error);
    throw error;
  }
}
