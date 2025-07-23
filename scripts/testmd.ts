import "dotenv/config";
import { Client } from "@notionhq/client";
import {
  DatabaseObjectResponse,
  PageObjectResponse,
  PartialDatabaseObjectResponse,
  PartialPageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { NotionToMarkdown } from "notion-to-md";
import fs from "fs/promises";
import matter from "gray-matter";
import slugify from "slugify";
import path from "path";
import {
  convertUnsafeTags,
  enhanceContent,
  generateUserFriendlySlug,
} from "../lib/mdx-utils";
type QueryDatabaseResponseArray = Array<
  PageObjectResponse | DatabaseObjectResponse
>;
// === ✅ 환경변수 및 설정 ===
const NOTION_TOKEN = process.env.NOTION_TOKEN!;
const DATABASE_ID = process.env.NOTION_DATABASE_ID!;
const BASE_OUTPUT_DIR = path.join(process.cwd(), "content");
const notion = new Client({ auth: NOTION_TOKEN });
const n2m = new NotionToMarkdown({ notionClient: notion });
export const uuidToId = (uuid: string) => uuid.replaceAll("-", "");
// ✅ 슬러그 중복 방지용 Set
const slugSet = new Set<string>();
// 1. 기존 MDX 파일의 notionId → endDate 매핑
async function getExistingEndDates() {
  const map = new Map();
  const baseDir = BASE_OUTPUT_DIR;
  const typeDirs = await fs.readdir(baseDir);
  for (const typeDir of typeDirs) {
    const dirPath = path.join(baseDir, typeDir);
    const stat = await fs.stat(dirPath);
    if (!stat.isDirectory()) continue;
    const files = await fs.readdir(dirPath);
    for (const file of files) {
      if (file.endsWith(".mdx")) {
        const content = await fs.readFile(path.join(dirPath, file), "utf-8");
        const fm = matter(content).data;
        if (fm.notionId && fm.endDate) {
          map.set(fm.notionId, fm.endDate);
        }
      }
    }
  }
  return map;
}
async function main() {
  let posts;
  try {
    posts = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: "status",
        select: { equals: "Published" },
      },
      sorts: [
        {
          property: "date",
          direction: "descending",
        },
      ],
    });
  } catch (err) {
    console.error("❌ Notion DB 쿼리 실패:", err);
    process.exit(1);
  }
  const tempmap = new Map();
  console.log(`📊 총 ${posts.results.length}개의 게시물을 처리합니다.`);
  // 2. Notion DB에서 endDate 비교 후, 변경된 페이지만 변환

  for (const page of posts.results as QueryDatabaseResponseArray) {
    try {
      const id = page.id.replace(/-/g, "");
      const props = page.properties as any;
      const last_edited_time = props?.last_edited_time;
      const date = props.date?.date?.start || new Date().toISOString();
      const lastEditedDate = last_edited_time
        ? new Date(last_edited_time)
        : date;
      let pageCover: string | null = null;
      if (page.cover) {
        if (page.cover.type === "external") {
          pageCover = page.cover.external.url;
        } else if (page.cover.type === "file") {
          pageCover = page.cover.file.url;
        }
      }
      const password = props.password?.rich_text?.[0]?.plain_text?.trim() || "";

      if (id == "21f1eb5c033780bab3dfc71cca861aab") {
        // console.log("props", props);
        console.log("pageCover::", pageCover);
        console.log("date:", date.slice(0, 10));
        console.log("lastEditedDate:", lastEditedDate);
      }
      if (password !== "") {
        console.log("password::", password);
      }
      if (last_edited_time) {
        tempmap.set(id, last_edited_time);
      }

      //   const dd = existingEndDates.get(id);
      //   console.log("dd:", dd);
    } catch (err) {
      console.error(`🔥 Notion → MDX 변환 실패: ${page.id}`);
      console.error(err);
      continue;
    }
  }
  console.log("tempmap:", tempmap);
  console.log("\n🎉 Notion → MDX 변환 및 안전화 통합 완료!");
}

main();
