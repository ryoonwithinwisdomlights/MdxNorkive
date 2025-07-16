// // lib/notion/getPageDetailAndBlocks.ts

// import { BLOG } from "@/blog.config";
// import { formatDate } from "@/lib/utils/utils";
// import { BaseArchivePageBlock2 } from "@/types/record.model";
// import { Client } from "@notionhq/client";
// import {
//   BlockObjectResponse,
//   PageObjectResponse,
// } from "@notionhq/client/build/src/api-endpoints";
// import { NotionConverter } from "notion-to-md";
// export const notion = new Client({ auth: BLOG.NOTION_ACCESS_TOKEN });
// const n2m = new NotionConverter(notion);

// export async function getPageDetailAndBlocks(pageId: string): Promise<{
//   page: BaseArchivePageBlock2;
// } | null> {
//   try {
//     // 1. 페이지 메타데이터 조회
//     const page = (await notion.pages.retrieve({
//       page_id: pageId,
//     })) as PageObjectResponse;
//     const convertedPage = await n2m.convert(pageId);
//     const contentString = convertedPage.content;
//     const props = page.properties as any;

//     // 2. 블록(children) 가져오기
//     const blocks = await notion.blocks.children.list({
//       block_id: pageId,
//       page_size: 100, // 필요 시 페이징 처리 가능
//     });

//     console.log("blocks::::", blocks);
//     // 3. BaseArchivePageBlock 형태로 변환
//     const pageData: BaseArchivePageBlock2 = {
//       id: page.id,
//       author: props.author?.people[0]?.name,
//       password: props.password?.rich_text[0]?.plain_text ?? "",
//       pageCover: page.cover?.type["external"]?.url ?? null,
//       date: props?.date,
//       title: props.title?.title[0]?.plain_text ?? "",
//       slug: props.slug?.rich_text[0]?.plain_text ?? "",
//       category: props.category?.select?.name ?? "",
//       tags: props.tags?.multi_select?.map((t) => t.name) ?? [],
//       status: props.status?.select?.name ?? "",
//       publishDate: new Date(
//         props?.date?.start_date || page.created_time
//       ).getTime(),
//       publishDay: props?.date?.start_date || "",
//       type: props.type?.select?.name ?? "Record",
//       sub_type: props.sub_type?.select?.name ?? "",
//       favorite: props.favorite?.checkbox ?? false,
//       content: contentString,
//       summary: props.summary?.rich_text[0]?.plain_text ?? "",
//       lastEditedDate: new Date(props?.last_edited_time),
//       lastEditedDay: formatDate(new Date(props?.last_edited_time), BLOG.LANG),
//       // pageIcon: page.icon?.emoji ?? null,
//       // pageCover: page.cover?.external?.url ?? null,
//     };

//     return {
//       page: pageData,
//     };
//   } catch (error) {
//     console.error("Error getting post:", error);
//     return null;
//   }
// }
