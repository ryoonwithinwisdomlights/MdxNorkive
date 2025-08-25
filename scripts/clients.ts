import { EXTERNAL_CONFIG } from "@/config/external.config";
import { Client } from "@notionhq/client";
import { config } from "dotenv";
import "dotenv/config";
import { NotionToMarkdown } from "notion-to-md";
import path from "path";
const NOTION_ACCESS_TOKEN = EXTERNAL_CONFIG.NOTION_ACCESS_TOKEN!;

export const NOTION_DATABASE_ID = EXTERNAL_CONFIG.NOTION_DATABASE_ID!;

if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
  config({ path: path.resolve(process.cwd(), ".env.local") });
}

// 환경 변수 디버깅
console.log("🔧 환경 변수 확인:");
console.log(
  "  - NOTION_ACCESS_TOKEN:",
  process.env.NOTION_ACCESS_TOKEN ? "✅ 설정됨" : "❌ 설정되지 않음"
);
console.log(
  "  - NOTION_DATABASE_ID:",
  process.env.NOTION_DATABASE_ID ? "✅ 설정됨" : "❌ 설정되지 않음"
);
console.log(
  "  - EXTERNAL_CONFIG.NOTION_DATABASE_ID:",
  EXTERNAL_CONFIG.NOTION_DATABASE_ID ? "✅ 설정됨" : "❌ 설정되지 않음"
);

console.log(
  "  - EXTERNAL_CONFIG.NOTION_ACCESS_TOKEN:",
  EXTERNAL_CONFIG.NOTION_ACCESS_TOKEN ? "✅ 설정됨" : "❌ 설정되지 않음"
);

if (!process.env.NOTION_ACCESS_TOKEN) {
  console.error("❌ NOTION_ACCESS_TOKEN이 설정되지 않았습니다!");
  console.error("   .env.local 파일에 NOTION_ACCESS_TOKEN을 추가해주세요.");
  process.exit(1);
}

export const notion = new Client({
  auth: NOTION_ACCESS_TOKEN,
});

export const n2m = new NotionToMarkdown({
  notionClient: notion,
  config: {
    parseChildPages: false,
  },
});
