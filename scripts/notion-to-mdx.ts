import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionToMarkdown } from "notion-to-md";
import fs from "fs/promises";
import * as matter from "gray-matter";
import slugify from "slugify";
import path from "path";
// === ✅ 환경변수 및 설정 ===
const NOTION_TOKEN = "ntn_F82436431911LZOHTHFoFi6aWfMNujAtcMgxZh1palK8EU";
const DATABASE_ID = "21a1eb5c03378057b4e5d3be1fd96dce";
const BASE_OUTPUT_DIR = path.join(process.cwd(), "content");
const notion = new Client({ auth: NOTION_TOKEN });
const n2m = new NotionToMarkdown({ notionClient: notion });

// ✅ 슬러그 중복 방지용 Set
const slugSet = new Set<string>();

function generateUniqueSlug(title: string) {
  const base = slugify(title, { lower: true, strict: true }).slice(0, 50);
  let slug = base;
  let count = 1;
  while (slugSet.has(slug)) {
    slug = `${base}-${count}`;
    count++;
  }
  slugSet.add(slug);
  return slug;
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

  for (const page of posts.results as PageObjectResponse[]) {
    try {
      const id = page.id.replace(/-/g, "");
      const props = page.properties as any;

      const title = props.title?.title?.[0]?.plain_text?.trim() || "Untitled";
      const type = props.type?.select?.name || "Record";
      const category = props.category?.select?.name ?? "";
      const tags = props.tags?.multi_select?.map((t) => t.name) ?? [];
      const sub_type = props.sub_type?.select?.name || null;
      const date = props.date?.date?.start || new Date().toISOString();
      const slug = generateUniqueSlug(title);

      const mdBlocks = await n2m.pageToMarkdown(page.id);
      const { parent: content } = n2m.toMarkdownString(mdBlocks);

      if (!content || content.trim() === "") {
        console.warn(`❌ 마크다운 콘텐츠 없음: ${page.id}`);
        continue;
      }

      const frontMatter = matter.stringify(content, {
        title,
        slug,
        notionId: id,
        type,
        sub_type,
        category,
        tags,
        date,
        draft: false,
      });

      const dir = path.join(BASE_OUTPUT_DIR, type.toLowerCase());
      await fs.mkdir(dir, { recursive: true });

      const filePath = path.join(dir, `${slug}.mdx`);
      await fs.writeFile(filePath, frontMatter, "utf-8");

      console.log(`✅ Notion → MDX 변환 완료: ${slug} → ${type}`);
    } catch (err) {
      console.error(`🔥 Notion → MDX 변환 실패: ${page.id}`);
      console.error(err);
      continue;
    }
  }
}

main();
