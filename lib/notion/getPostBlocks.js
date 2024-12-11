import { BLOG } from "@/blog.config";
import { NotionAPI } from "notion-client";
import { getDataFromCache, setDataToCache } from "@/lib/cache/cache_manager";
import { deepClone, delay } from "../utils/utils";

/**
 * Get article content
 * @param {*} id
 * @param {*} from
 * @param {*} slice
 * @returns
 */
export async function getPage(id, from, slice) {
  const cacheKey = "page_block_" + id;
  let pageBlock = await getDataFromCache(cacheKey);
  if (pageBlock) {
    return filterPostBlocks(id, pageBlock, slice);
  }

  pageBlock = await getPageWithRetry(id, from);

  if (pageBlock) {
    await setDataToCache(cacheKey, pageBlock);
    return filterPostBlocks(id, pageBlock, slice);
  }
  return pageBlock;
}

/**
 * Get article content
 * @param {*} id
 * @param {*} from
 * @param {*} slice
 * @returns
 */
export async function getPostBlocks(id, from, slice) {
  const cacheKey = "page_block_" + id;
  let pageBlock = await getDataFromCache(cacheKey);
  if (pageBlock) {
    console.log("[cache]:", `from:${from}`, cacheKey);
    return filterPostBlocks(id, pageBlock, slice);
  }

  const start = new Date().getTime();
  pageBlock = await getPageWithRetry(id, from);
  const end = new Date().getTime();
  console.log("[API time consuming]", `${end - start}ms`);

  if (pageBlock) {
    await setDataToCache(cacheKey, pageBlock);
    return filterPostBlocks(id, pageBlock, slice);
  }
  return pageBlock;
}

/**
 * Call the interface and try again if it fails.
 * @param {*} id
 * @param {*} retryAttempts
 */
export async function getPageWithRetry(id, from, retryAttempts = 3) {
  if (retryAttempts && retryAttempts > 0) {
    console.log(
      "[Request API]",
      `from:${from}`,
      `id:${id}`,
      retryAttempts < 3 ? `Number of retries remaining:${retryAttempts}` : ""
    );
    try {
      const authToken = BLOG.NOTION_ACCESS_TOKEN || null;
      const api = new NotionAPI({
        authToken,
        userTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      });
      const pageData = await api.getPage(id);
      console.info("[Response Success]:", `from:${from}`);
      // console.info('[Response Success]:pageData', pageData)
      return pageData;
    } catch (e) {
      console.warn("[Abnormal response]:", e);
      await delay(1000);
      const cacheKey = "page_block_" + id;
      const pageBlock = await getDataFromCache(cacheKey);
      if (pageBlock) {
        console.log("[Retry caching]", `from:${from}`, `id:${id}`);
        return pageBlock;
      }
      return await getPageWithRetry(id, from, retryAttempts - 1);
    }
  } else {
    console.error("[Request failed]:", `from:${from}`, `id:${id}`);
    return null;
  }
}

/**
 * Remove unnecessary fields from the obtained blockMap
 * And perform special processing on page content, such as file URL formatting
 * @param {*} id Page ID
 * @param {*} pageBlock page elements
 * @param {*} slice interception quantity
 * @returns
 */
function filterPostBlocks(id, pageBlock, slice) {
  const clonePageBlock = deepClone(pageBlock);
  let count = 0;

  // Loop through each block of the document
  for (const i in clonePageBlock?.block) {
    const b = clonePageBlock?.block[i];
    if (slice && slice > 0 && count > slice) {
      delete clonePageBlock?.block[i];
      continue;
    }
    // Removed when BlockId equals PageId
    if (b?.value?.id === id) {
      // This block contains sensitive information
      delete b?.value?.properties;
      continue;
    }

    count++;
    // Process language name mappings such as c++, c#, assembly, etc.
    if (b?.value?.type === "code") {
      if (b?.value?.properties?.language?.[0][0] === "C++") {
        b.value.properties.language[0][0] = "cpp";
      }
      if (b?.value?.properties?.language?.[0][0] === "C#") {
        b.value.properties.language[0][0] = "csharp";
      }
      if (b?.value?.properties?.language?.[0][0] === "Assembly") {
        b.value.properties.language[0][0] = "asm6502";
      }
    }

    // If it is a file or embedded PDF, it needs to be re-encrypted and signed.
    if (
      (b?.value?.type === "file" ||
        b?.value?.type === "pdf" ||
        b?.value?.type === "video") &&
      b?.value?.properties?.source?.[0][0]
    ) {
      const oldUrl = b?.value?.properties?.source?.[0][0];
      const newUrl = `https://notion.so/signed/${encodeURIComponent(
        oldUrl
      )}?table=block&id=${b?.value?.id}`;
      b.value.properties.source[0][0] = newUrl;
    }

    delete b?.role;
    delete b?.value?.version;
    delete b?.value?.created_by_table;
    delete b?.value?.created_by_id;
    delete b?.value?.last_edited_by_table;
    delete b?.value?.last_edited_by_id;
    delete b?.value?.space_id;
  }

  // Remove unused fields
  if (id === BLOG.NOTION_PAGE_ID) {
    return clonePageBlock;
  }
  return clonePageBlock;
}

/**
 * Capture blocks in batches based on []ids
 * When obtaining the database article list, blocks exceeding a certain number will be discarded, so blocks are captured in batches based on pageId.
 * @param {*} ids
 * @param {*} batchSize
 * @returns
 */
export const fetchInBatches = async (ids, batchSize = 100) => {
  // If ids is not an array, convert it to an array
  if (!Array.isArray(ids)) {
    ids = [ids];
  }

  const authToken = BLOG.NOTION_ACCESS_TOKEN || null;
  const api = new NotionAPI({
    authToken,
    userTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  let fetchedBlocks = {};
  for (let i = 0; i < ids.length; i += batchSize) {
    const batch = ids.slice(i, i + batchSize);
    console.log("[API-->>Request] Fetching missing blocks", batch, ids.length);
    const start = new Date().getTime();
    const pageChunk = await api.getBlocks(batch);
    const end = new Date().getTime();
    console.log(
      `[API<<--response] takes time:${
        end - start
      }ms Fetching missing blocks count:${ids.length} `
    );

    console.log("[API<<--response]");
    fetchedBlocks = Object.assign(
      {},
      fetchedBlocks,
      pageChunk?.recordMap?.block
    );
  }
  return fetchedBlocks;
};
