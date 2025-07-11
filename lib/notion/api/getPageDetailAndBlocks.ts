// lib/notion/getPageDetailAndBlocks.ts

import { Client } from "@notionhq/client";
import { NotionConverter } from "notion-to-md";
import { BLOG } from "@/blog.config";
import { BaseArchivePageBlock } from "@/types/record.model";
import {
  BlockObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
export const notion = new Client({ auth: BLOG.NOTION_ACCESS_TOKEN });
const n2m = new NotionConverter(notion);
async function convertPage(pageId: string) {
  try {
    // Create a NotionConverter instance
    // const n2m = new NotionConverter(notion);

    // Convert the page
    const result = await n2m.convert(pageId);

    // Access the Markdown content
    console.log("--- Markdown Output ---");
    console.log(result.content);

    // The result object also contains block data, page properties, etc.
    console.log("--- Conversion Result Object ---");
    console.log(result);
    return result;
  } catch (error) {
    console.error("Conversion failed:", error);
  }
}

export async function getPageDetailAndBlocks(pageId: string): Promise<{
  page: BaseArchivePageBlock;
  blocks: BlockObjectResponse[];
}> {
  // 1. 페이지 메타데이터 조회
  const page = (await notion.pages.retrieve({
    page_id: pageId,
  })) as PageObjectResponse;
  const convertedPage = await convertPage(pageId);
  console.log("convertedPage:", convertedPage);
  const props = page.properties as any;
  console.log("props:", props);
  // 2. 블록(children) 가져오기
  const blocks = await notion.blocks.children.list({
    block_id: pageId,
    page_size: 100, // 필요 시 페이징 처리 가능
  });

  // 3. BaseArchivePageBlock 형태로 변환
  const pageData: BaseArchivePageBlock = {
    id: page.id,
    title: props.title?.title[0]?.plain_text ?? "",
    slug: props.slug?.rich_text[0]?.plain_text ?? "",
    category: props.category?.select?.name ?? "",
    tags: props.tags?.multi_select?.map((t) => t.name) ?? [],
    status: props.status?.select?.name ?? "",
    publishDate: new Date(
      props?.date?.start_date || page.created_time
    ).getTime(),
    publishDay: props?.date?.start_date || "",
    type: props.type?.select?.name ?? "Record",
    favorite: props.favorite?.checkbox ?? false,
    summary: props.summary?.rich_text[0]?.plain_text ?? "",
    // pageIcon: page.icon?.emoji ?? null,
    // pageCover: page.cover?.external?.url ?? null,
  };

  return {
    page: pageData,
    blocks: blocks.results as BlockObjectResponse[],
  };
}
