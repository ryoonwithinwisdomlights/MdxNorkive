import {
  NotionDataBaseMetaDataAdapter,
  NotionPageListAdapter,
} from "@/app/api/adapter";
import { notion } from "@/app/api/clients";
import type {
  DataBaseMetaDataResponse,
  MenuItem,
  QueryDatabaseResponseArray,
  QueryPageResponse,
  RecordItem,
} from "@/app/api/types";
import { getSiteInfo } from "@/lib/utils/site";
import type {
  GetBlockResponse,
  ImageBlockObjectResponse,
  ListBlockChildrenResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { cache } from "react";
import "server-only";
import { NOTION_DATABASE_ID } from "./clients";

export const fetchMenuList = cache(async (): Promise<MenuItem[]> => {
  // console.log("🔍 fetchMenuList 시작");

  try {
    const queryResponse = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      filter: {
        and: [
          {
            property: "status",
            select: {
              equals: "Published",
            },
          },
          { property: "type", select: { equals: "Menu" } },
        ],
      },
    });

    const datalist = queryResponse.results as QueryDatabaseResponseArray;

    const convertedMenuItemList = await new NotionPageListAdapter(
      datalist
    ).convertToBasicMenuItemList();

    return convertedMenuItemList;
  } catch (error) {
    console.warn("Failed to fetch menu list from Notion API:", error);
    return [];
  }
});

export const fetchPageData = cache(async (pageId: string) => {
  try {
    const pageData = await notion.pages.retrieve({ page_id: pageId });
    return pageData;
  } catch (error) {
    console.warn(`Failed to fetch page data for pageId ${pageId}:`, error);
    throw error;
  }
});

export const fetchAllRecordList = cache(async (): Promise<RecordItem[]> => {
  try {
    const queryResponse = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      filter: {
        and: [
          {
            property: "status",
            select: {
              equals: "Published",
            },
          },
          {
            property: "type",
            select: {
              is_not_empty: true, // type이 null(비어있지 않음)
            },
          },
          {
            property: "type",
            select: {
              equals: "RECORD", // type이 Record
            },
          },
        ],
      },
      sorts: [
        {
          property: "date",
          direction: "descending",
        },
      ],
    });

    const convertedAllRecordList = new NotionPageListAdapter(
      queryResponse.results as Array<QueryPageResponse>
    ).convertToAllRecordList();

    convertedAllRecordList.map((item: RecordItem) => {
      const siteInfo = getSiteInfo({ recordItem: item });
      // console.log("siteInfo:", siteInfo);
      return {
        ...item,
        siteInfo,
      };
    });
    return convertedAllRecordList;
  } catch (error) {
    console.warn("Failed to fetch records from Notion API:", error);
    return [];
  }
});

/**
 * article tag 목록을 조회해오는 함수
 */
export const fetchRecordTagList = cache(async () => {
  try {
    const metaDataResponse = await notion.databases.retrieve({
      database_id: NOTION_DATABASE_ID,
    });

    return new NotionDataBaseMetaDataAdapter(
      metaDataResponse as unknown as DataBaseMetaDataResponse
    )
      .convertToTagList()
      .sort((tag1, tag2) => (tag1.name > tag2.name ? 1 : -1));
  } catch (error) {
    console.warn("Failed to fetch record tag list from Notion API:", error);
    return [];
  }
});

/**
 * 해당 아티클 페이지의 모든 block들을 불러오는 함수
 */
export const fetchAllBlocksInPage = cache(
  async (blockOrPageId: string): Promise<GetBlockResponse[]> => {
    try {
      let hasMore = true;
      let nextCursor: string | null = null;
      const blocks: GetBlockResponse[] = [];
      while (hasMore) {
        const result: ListBlockChildrenResponse =
          await notion.blocks.children.list({
            block_id: blockOrPageId,
            start_cursor: nextCursor ?? undefined,
          });

        blocks.push(...result.results);
        hasMore = result.has_more;
        nextCursor = result.next_cursor;

        if (hasMore) {
          console.log("load more blocks in page...");
        }
      }

      // nested block(ex - toggle block) 불러오기
      const childBlocks = await Promise.all(
        blocks
          .filter((block) => "has_children" in block && block.has_children)
          .map(async (block) => {
            const childBlocks = await fetchAllBlocksInPage(block.id);
            return childBlocks;
          })
      );

      return [...blocks, ...childBlocks.flat()];
    } catch (error) {
      console.warn(
        `Failed to fetch blocks for blockOrPageId ${blockOrPageId}:`,
        error
      );
      throw error;
    }
  }
);

/**
 * 해당 아티클 페이지의 모든 image block들을 불러오는 함수
 */
export const fetchAllImageBlocksInPage = cache(async (pageId: string) => {
  try {
    const allBlocks = await fetchAllBlocksInPage(pageId);
    return allBlocks.filter(
      (block) => "type" in block && block.type === "image"
    ) as ImageBlockObjectResponse[];
  } catch (error) {
    console.warn(`Failed to fetch image blocks for pageId ${pageId}:`, error);
    throw error;
  }
});
