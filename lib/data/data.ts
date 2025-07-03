/* eslint-disable no-unused-vars */
import { BLOG } from "@/blog.config";
import { AVAILABLE_PAGE_TYPES } from "@/constants/menu.constants";
import { NorkiveRecordData } from "@/types";
import {
  BlockMap,
  CollectionPropertySchemaMap,
  Decoration,
  SelectOption,
  User,
} from "notion-types";

import { NotionAPI } from "notion-client";
import { getDateValue, getTextContent } from "notion-utils";
import { getDataFromCache, setDataToCache } from "@/lib/cache/cache_manager";
import { mapImgUrl } from "@/lib/data/utils";
import { delay, formatDate } from "@/lib/utils/utils";
import { PageBlockDataProps } from "@/types";
import { ExtendedRecordMap } from "notion-types";
import { filterPostBlocks, handleRecordsUrl, mapProperties } from "./function";
const NOTION_DB_ID = BLOG.NOTION_DATABASE_ID as string;

export async function getPageProperties(
  id: string,
  pageId: string,
  block: BlockMap,
  schema: CollectionPropertySchemaMap,
  authToken: string | null,
  tagOptions: SelectOption[]
): Promise<NorkiveRecordData | null> {
  const rawProperties = Object.entries(block?.[id]?.value?.properties || []);
  const excludeProperties = ["date", "select", "multi_select", "person"];
  const value = block[id]?.value;
  const properties: Partial<NorkiveRecordData> & {
    id: string;
    [key: string]: any;
  } = { id };
  for (let i = 0; i < rawProperties.length; i++) {
    const [key, val] = rawProperties[i];
    properties.id = id;
    if (schema[key]?.type && !excludeProperties.includes(schema[key].type)) {
      properties[schema[key].name] = getTextContent(val as Decoration[]);
    } else {
      switch (schema[key]?.type) {
        case "date": {
          const dateProperty = getDateValue(val as Decoration[]);
          // delete dateProperty.type;
          properties[schema[key].name] = dateProperty;
          break;
        }
        case "select":
        case "multi_select": {
          const selects = getTextContent(val as Decoration[]);
          if (selects[0]?.length) {
            properties[schema[key].name] = selects.split(",");
          }
          break;
        }
        case "person": {
          const rawUsers = (val as Decoration[]).flat();
          const users: User[] = [];
          const api = new NotionAPI({});

          for (let i = 0; i < rawUsers.length; i++) {
            if (rawUsers[i][0][1]) {
              const userArr = rawUsers[i][0];
              const userList = await api.getUsers(userArr as string[]);
              const userResult: any[] = userList.results;
              const userValue: User = userResult[1].value;
              users.push(userValue);
            }
          }
          properties[schema[key].name] = users;
          break;
        }
        default:
          break;
      }
    }
  }

  // console.log("ddfdfdff:", value);
  // Mapping key: user-defined header name
  const fieldNames = BLOG.NOTION_PROPERTY_NAME;
  if (fieldNames) {
    Object.keys(fieldNames).forEach((key) => {
      if (fieldNames[key] && properties[fieldNames[key]]) {
        properties[key] = properties[fieldNames[key]];
      }
    });
  }

  // type\status\category It is a single-select drop-down box.
  // Take the first one in the array.
  properties.type = properties.type?.[0] || "";
  properties.status = properties.status?.[0] || "";
  properties.category = properties.category?.[0] || "";
  properties.comment = properties.comment?.[0] || "";

  // Mapping value: drop-down box options for user personalized type and status fields,
  //  mapped back to the English identifier of the code here
  mapProperties(properties);

  properties.publishDate = new Date(
    properties?.date?.start_date || value.created_time
  ).getTime();
  properties.publishDay = formatDate(properties.publishDate, BLOG.LANG);
  properties.lastEditedDate = new Date(value?.last_edited_time);
  properties.lastEditedDay = formatDate(
    new Date(value?.last_edited_time),
    BLOG.LANG
  );
  properties.fullWidth = value.format?.page_full_width ?? false;
  properties.pageIcon =
    mapImgUrl(block[id].value?.format?.page_icon, block[id].value) ?? "";
  properties.pageCover =
    mapImgUrl(block[id].value?.format?.page_cover, block[id].value) ?? "";
  properties.pageCoverThumbnail =
    mapImgUrl(
      block[id].value?.format?.page_cover,
      block[id].value,
      "block",
      "pageCoverThumbnail"
    ) ?? "";
  properties.content = value.content ?? [];
  properties.tagItems =
    properties?.tags?.map((tag) => {
      return {
        name: tag,
        color: tagOptions?.find((t) => t.value === tag)?.color || "gray",
      };
    }) || [];

  delete properties.content;
  const isAblePage = AVAILABLE_PAGE_TYPES.includes(properties.type);
  handleRecordsUrl(isAblePage, properties);
  if (id === pageId && pageId !== NOTION_DB_ID) {
    const blockMap = await getRecordBlockMapWithRetry({
      pageId: pageId,
    });
    properties.blockMap = blockMap;
  }
  return properties as NorkiveRecordData;
}

export async function getRecordBlockMapWithRetry({
  pageId,
  from,
  retryAttempts,
}: PageBlockDataProps) {
  const pageBlock = retryAttempts
    ? await getRecordPage({ pageId: pageId, from })
    : await getRecordPageWithRetry({ pageId });
  if (pageBlock) {
    return filterPostBlocks(pageId, pageBlock);
  }
  return pageBlock;
}

/**
 * 많은 페이지 블럭 일괄 로딩
 * 캐시를 우선하고, 실패하면 그냥 null 주고 끝내도 되는 보조성 fetch 작업에 적합
 * @param param0
 * @returns
 */
export async function getRecordPage({
  pageId,
  from,
}: {
  pageId: string;
  from?: string;
}): Promise<ExtendedRecordMap | null> {
  const cacheKey = `page_content_${pageId}`;

  // 1. 캐시에서 먼저 시도
  const cached = await getDataFromCache(cacheKey);
  if (cached) {
    console.log(`[Cache hit] ${from} - ${pageId}`);
    return cached;
  }

  // 2. 캐시 miss → Notion API fetch
  try {
    console.log(`[Cache miss] ${from} - fetching from Notion`);
    const notion = new NotionAPI({
      userTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });

    const start = Date.now();
    const data = await notion.getPage(pageId);
    const end = Date.now();
    console.log(`[Notion fetch done] ${from} - ${end - start}ms`);

    // 3. 캐시에 저장
    await setDataToCache(cacheKey, data);
    return data;
  } catch (err) {
    console.error(`[Notion fetch failed] ${from} - ${err}`);
    return null;
  }
}

/**
 *  Call the interface and try again if it fails.
 *  실패에도 끈질기게 데이터를 가져와야 하는 중요 fetch 작업에 사용.
    단일 포스트 fetch 중요한 단건 요청.
 * @param {*} pageId
 * @param {*} retryAttempts
 */
export async function getRecordPageWithRetry({
  pageId,
  from = "unknown",
  retryAttempts = 3,
}: {
  pageId: string;
  from?: string;
  retryAttempts?: number;
}) {
  const cacheKey = "page_block_" + pageId;
  const tryFetch = async (): Promise<ExtendedRecordMap> => {
    //tryFetch() 내부 함수로 API fetch 책임 분리
    console.log(
      "[Request API]",
      `from: ${from}`,
      `id: ${pageId}`,
      `retries left: ${retryAttempts}`
    );
    const notion = new NotionAPI({
      userTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });

    const start = Date.now();
    const pageData = await notion.getPage(pageId);
    const end = Date.now();
    console.log(
      "[API<<--response]",
      `duration: ${end - start}ms`,
      `from: ${from}`
    );
    return pageData;
  };

  try {
    return await tryFetch();
  } catch (error) {
    console.warn("[Fetch failed]", `from: ${from}`, `id: ${pageId}`, error);

    if (retryAttempts <= 1) {
      console.error("[All retries failed]", `from: ${from}`, `id: ${pageId}`);
      return null;
    }

    await delay(1000);

    const cached = await getDataFromCache(cacheKey);
    if (cached) {
      console.log("[Retry with cache]", `from: ${from}`, `id: ${pageId}`);
      return cached;
    }

    // 재귀 호출로 재시도
    return await getRecordPageWithRetry({
      pageId,
      from,
      retryAttempts: retryAttempts - 1,
    });
  }
}
