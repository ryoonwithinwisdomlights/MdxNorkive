/* eslint-disable no-unused-vars */

import { getDataFromCache, setDataToCache } from "@/lib/cache/cache_manager";
import { filterRecordBlocks } from "@/lib/db/function";
import { delay } from "@/lib/utils/utils";
import { PageBlockDataProps } from "@/types";
import { ExtendedRecordMap } from "notion-types";
import { notion_api } from "@/lib/db/notion/notion-api";

export async function getRecordBlockMapWithRetry({
  pageId,
  from,
  retryAttempts,
}: PageBlockDataProps) {
  console.log("getSingleRecordPageByPageId:3");
  console.log("getRecordBlockMapWithRetry pageId:", pageId);
  const pageBlock = retryAttempts
    ? await getRecordPageWithRetry({ pageId: pageId, from, retryAttempts })
    : await getRecordPage({ pageId: pageId, from });

  if (pageBlock) {
    return filterRecordBlocks(pageId, pageBlock);
  }

  return pageBlock;
}

export const tryGetNotionCachedData = async (cacheKey, pageId, from) => {
  console.log("getSingleRecordPageByPageId:5");
  const cached = await getDataFromCache(cacheKey);
  if (cached) {
    console.log(`[Cache hit] ${from} - ${pageId}`);
    return cached;
  }
  return false;
};

export const tryFetchNotionRemoteData = async ({
  from,
  pageId,
  retryAttempts,
  cacheKey,
}: {
  from?: string;
  pageId: string;
  retryAttempts?: number;
  cacheKey: string;
}): Promise<ExtendedRecordMap> => {
  console.log("getSingleRecordPageByPageId:6");
  console.log(
    `[Cache miss] ${from} - fetching from Notion`,
    `id: ${pageId}`,
    `retries left: ${retryAttempts}`
  );
  const start = Date.now();
  const pageData = await notion_api.getPage(pageId);
  await setDataToCache(cacheKey, pageData);
  const end = Date.now();
  console.log(`[Notion fetch done] ${from} - id: ${pageId} ${end - start}ms`);
  return pageData;
};

/**
 *  Call the interface and try again if it fails.
 * @param {*} pageId
 * @param {*} retryAttempts
 */
export async function getRecordPageWithRetry({
  pageId,
  from,
  retryAttempts,
}: {
  pageId: string;
  from?: string;
  retryAttempts: number;
}): Promise<ExtendedRecordMap | null> {
  console.log("getSingleRecordPageByPageId:4");
  const cacheKey = `page_block_${pageId}`;

  const cached = await tryGetNotionCachedData(cacheKey, pageId, from);
  if (cached) {
    return cached;
  } else {
    console.log(`[Cache failed] ${from} - ${pageId}`);
    if (retryAttempts && retryAttempts > 0) {
      try {
        return await tryFetchNotionRemoteData({
          from: from,
          pageId: pageId,
          retryAttempts: retryAttempts,
          cacheKey: cacheKey,
        });
      } finally {
        console.log("getSingleRecordPageByPageId:7");
        console.warn("[Fetch failed]", `from: ${from}`, `id: ${pageId}`);

        if (retryAttempts <= 1) {
          console.error(
            "[All retries failed]",
            `from: ${from}`,
            `id: ${pageId}`
          );
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
    } else {
      console.error("[Request failed]:", `from:${from}`, `id:${pageId}`);
      return null;
    }
  }
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
  console.log("getSingleRecordPageByPageId:4");
  const cacheKey = `page_block_${pageId}`;

  // 1. 캐시에서 먼저 시도
  const cached = await tryGetNotionCachedData(cacheKey, pageId, from);
  if (cached) {
    return cached;
  } else {
    // 2. 캐시 miss → Notion API fetch
    try {
      return await tryFetchNotionRemoteData({
        from: from,
        pageId: pageId,
        cacheKey: cacheKey,
      });
    } catch (err) {
      console.error(`[Notion fetch failed] ${from} - ${err}`);
      return null;
    }
  }
}
