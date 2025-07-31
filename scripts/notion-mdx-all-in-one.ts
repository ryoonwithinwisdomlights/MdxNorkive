import { Client } from "@notionhq/client";
import {
  DatabaseObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import "dotenv/config";
import fs from "fs/promises";
import matter from "gray-matter";
import { NotionToMarkdown } from "notion-to-md";
import path from "path";
import {
  convertUnsafeTags,
  enhanceContent,
  generateUserFriendlySlug,
} from "@/lib/utils/mdx-utils";

export type FrontMatter = {
  title: string;
  slug: string;
  summary: string;
  pageCover: string | null;
  notionId: string;
  password: string;
  type: string;
  sub_type: string;
  category: string;
  tags: string[];
  date: string;
  last_edited_time: string;
  lastEditedDate: string | Date;
  draft: boolean;
  description: string;
  icon: string;
  full: boolean;
  lastModified: string;
  readingTime: number;
  wordCount: number;
  status: string;
  author: string;
  version: string;
};
type QueryDatabaseResponseArray = Array<
  PageObjectResponse | DatabaseObjectResponse
>;

// === ✅ 환경변수 및 설정 ===
const NOTION_TOKEN = process.env.NOTION_ACCESS_TOKEN!;
const DATABASE_ID = process.env.NOTION_DATABASE_ID!;
const BASE_OUTPUT_DIR = path.join(process.cwd(), "content");
const notion = new Client({ auth: NOTION_TOKEN });
const n2m = new NotionToMarkdown({ notionClient: notion });

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
        if (fm.notionId && fm.last_edited_time) {
          map.set(fm.notionId, fm.last_edited_time);
        }
      }
    }
  }
  return map;
}
async function main() {
  // content 디렉토리가 없으면 생성
  try {
    await fs.access(BASE_OUTPUT_DIR);
    console.log(`📁 'content' 디렉토리가 이미 존재합니다: ${BASE_OUTPUT_DIR}`);
  } catch (error) {
    console.log(`📁 'content' 디렉토리를 생성합니다: ${BASE_OUTPUT_DIR}`);
    await fs.mkdir(BASE_OUTPUT_DIR, { recursive: true });
  }

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

  console.log(`📊 총 ${posts.results.length}개의 게시물을 처리합니다.`);
  // 2. Notion DB에서 endDate 비교 후, 변경된 페이지만 변환
  const existingEndDates = await getExistingEndDates();
  for (const page of posts.results as QueryDatabaseResponseArray) {
    try {
      const id = page.id.replace(/-/g, "");
      const props = page.properties as any;
      const last_edited_time = page.last_edited_time;
      let pageCover: string | null = null;
      if (page.cover) {
        if (page.cover.type === "external") {
          pageCover = page.cover.external.url;
        } else if (page.cover.type === "file") {
          pageCover = page.cover.file.url;
        }
      }
      const title = props.title?.title?.[0]?.plain_text?.trim() || "Untitled";
      const type = props.type?.select?.name;
      const sub_type = props.sub_type?.select?.name || "";
      // 사용자 친화적 슬러그 생성
      const slug = generateUserFriendlySlug(sub_type, title, slugSet);

      if (existingEndDates.get(id) !== last_edited_time) {
        const mdBlocks = await n2m.pageToMarkdown(page.id);
        const { parent: content } = n2m.toMarkdownString(mdBlocks);
        if (!content || content.trim() === "") {
          console.warn(`❌ 마크다운 콘텐츠 없음: ${page.id}`);
          continue;
        }
        // Seed Design 스타일의 콘텐츠 개선
        let enhancedContent = enhanceContent(content, title, type);
        // 안전 변환 적용
        enhancedContent = convertUnsafeTags(enhancedContent);
        // 메타데이터 생성
        const description =
          props.description?.rich_text?.[0]?.plain_text?.trim() || "";
        const icon = props.icon?.emoji || "";
        const full = props.full?.checkbox || false;
        const category = props.category?.select?.name ?? "";
        const tags = props.tags?.multi_select?.map((t: any) => t.name) ?? [];
        const date = props.date?.date?.start || new Date().toISOString();
        const lastEditedDate = last_edited_time
          ? new Date(last_edited_time)
          : date;
        const summary = props.summary?.rich_text?.[0]?.plain_text?.trim() || "";
        const password =
          props.password?.rich_text?.[0]?.plain_text?.trim() || "";
        const frontMatter = matter.stringify(enhancedContent, {
          title,
          slug,
          summary,
          pageCover,
          notionId: id,
          password,
          type,
          sub_type,
          category,
          tags,
          date: date.slice(0, 10),
          last_edited_time,
          lastEditedDate,
          draft: false,
          description,
          icon,
          full,
          lastModified: new Date().toISOString().slice(0, 10),
          readingTime: Math.ceil((title.length + description.length) / 200),
          wordCount: title.length + description.length,
          status: "published",
          author: "ryoon",
          version: "1.0.0",
        } as FrontMatter);
        const dir = path.join(BASE_OUTPUT_DIR, type.toLowerCase());
        await fs.mkdir(dir, { recursive: true });
        const filePath = path.join(dir, `${slug}.mdx`);
        await fs.writeFile(filePath, frontMatter, "utf-8");
        console.log(`✅ Notion → MDX 변환+안전화 완료: ${slug} → ${type}`);
      } else {
        console.log(`🎉 이미 최신 버전: ${slug} → ${type}`);
      }
    } catch (err) {
      console.error(`🔥 Notion → MDX 변환 실패: ${page.id}`);
      console.error(err);
      continue;
    }
  }
  console.log("\n🎉 Notion → MDX 변환 및 안전화 통합 완료!");
}

main();
