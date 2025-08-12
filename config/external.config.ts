import "dotenv/config";
import { config } from "dotenv";
import path from "path";
// Vercel 환경에서는 .env.local 파일을 로드하지 않음
// 로컬 개발 환경에서만 .env.local 파일을 명시적으로 로드
if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
  config({ path: path.resolve(process.cwd(), ".env.local") });
}
export const EXTERNAL_CONFIG = {
  DIR_NAME: "content",
  DIR_NAME_TEST: "TEST",
  TEST_ID: process.env.TEST_ID || "",
  TEST_TYPE: process.env.TEST_TYPE || "ENGINEERINGS",
  // Notion 설정
  NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
  NOTION_ACTIVE_USER: process.env.NOTION_ACTIVE_USER || "",
  NOTION_ACCESS_TOKEN: process.env.NOTION_ACCESS_TOKEN, // Useful if you prefer not to make your database public

  // Cloudinary 설정
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME!,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY!,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET!,
  CLOUDINARY_UPLOAD_FOLDER: process.env.CLOUDINARY_UPLOAD_FOLDER!,
  // Redis (Upstash) 설정
  UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL!,
  UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN!,
};
