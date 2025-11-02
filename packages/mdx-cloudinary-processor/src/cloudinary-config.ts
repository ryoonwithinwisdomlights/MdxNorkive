/**
 * Cloudinary 설정 타입 및 초기화 함수
 */

import { v2 as cloudinary } from "cloudinary";

/**
 * Cloudinary 설정 인터페이스
 */
export interface CloudinaryConfig {
  cloud_name: string;
  api_key: string;
  api_secret: string;
  folder?: string;
}

/**
 * Cloudinary 초기화
 * @param config Cloudinary 설정 객체
 * @returns 초기화 성공 여부
 */
export function initializeCloudinary(config: CloudinaryConfig): boolean {
  // 설정 검증
  if (!config.cloud_name || !config.api_key || !config.api_secret) {
    console.error("❌ Cloudinary 설정 실패 - 필수 설정이 누락되었습니다");
    return false;
  }

  // Cloudinary 설정 적용
  cloudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.api_key,
    api_secret: config.api_secret,
  });

  console.log("✅ Cloudinary 초기화 완료");
  return true;
}

/**
 * Cloudinary 인스턴스 내보내기 (내부 사용)
 */
export { cloudinary };

