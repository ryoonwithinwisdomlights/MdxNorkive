/**
 * Cloudinary 업로드 함수들
 */

import { UploadApiOptions } from "cloudinary";
import { cloudinary } from "./cloudinary-config";
import { CloudinaryUploadResult } from "./types";
import { IMAGE_EXTENSIONS, FILE_EXTENSIONS } from "./constants";

/**
 * 기본 폴더 설정 (옵션에서 제공되지 않은 경우 사용)
 */
let defaultFolder: string | undefined;

/**
 * 기본 폴더 설정
 */
export function setDefaultFolder(folder: string): void {
  defaultFolder = folder;
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
    const isImage = IMAGE_EXTENSIONS.includes(
      fileExtension as (typeof IMAGE_EXTENSIONS)[number]
    );
    const isDocument = FILE_EXTENSIONS.includes(
      fileExtension as (typeof FILE_EXTENSIONS)[number]
    );

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
    else if (isDocument) prefix = fileExtension;

    const public_id = `${prefix}_${timestamp}_${fileNameHash}`;

    // 업로드 옵션 설정
    const uploadOptions: UploadApiOptions = {
      resource_type: isImage ? "image" : "raw",
      folder: options.folder || defaultFolder,
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
 * URL에서 파일을 다운로드하여 Cloudinary에 업로드 (모든 파일 타입 지원)
 */
export async function uploadFileFromUrl(
  fileUrl: string,
  fileName: string,
  options: {
    folder?: string;
    transformation?: string;
  } = {}
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
      folder: options.folder || defaultFolder,
      transformation: options.transformation,
    });
  } catch (error) {
    console.error("URL에서 파일 Cloudinary 업로드 실패:", error);
    throw error;
  }
}

/**
 * URL에서 이미지를 다운로드하여 Cloudinary에 업로드 (기존 호환성 유지)
 */
export async function uploadImageFromUrl(
  imageUrl: string,
  fileName: string,
  options: {
    folder?: string;
    transformation?: string;
  } = {}
): Promise<CloudinaryUploadResult> {
  return await uploadFileFromUrl(imageUrl, fileName, options);
}

/**
 * URL에서 PDF를 다운로드하여 Cloudinary에 업로드
 */
export async function uploadPdfFromUrl(
  pdfUrl: string,
  fileName: string,
  options: {
    folder?: string;
  } = {}
): Promise<CloudinaryUploadResult> {
  return await uploadFileFromUrl(pdfUrl, fileName, options);
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

