import { BLOG } from "@/blog.config";
import { NotionAPI } from "notion-client";
import { getDataFromCache, setDataToCache } from "@/lib/cache/cache_manager";
import { deepClone, delay } from "@/lib/utils/utils";

//캐슁적용필요
/**
 * Get article content
 * @param {*} id
 * @param {*} from
 * @param {*} slice
 * @returns
 */
export async function getPostBlocks(id, from, slice) {
  const pageBlock = await getPageWithRetry(id, from);
  if (pageBlock) {
    return filterPostBlocks(id, pageBlock, slice);
  }
  return pageBlock;
}

/**
 * Call the interface and try again if it fails.
 * @param {*} id
 * @param {*} retryAttempts
 */
//notion.getPage
export async function getPageWithRetry(id, from, retryAttempts = 3) {
  if (retryAttempts && retryAttempts > 0) {
    console.log(
      "[Request API]",
      `from:${from}`,
      `id:${id}`,
      retryAttempts < 3 ? `Number of retries remaining:${retryAttempts}` : ""
    );
    try {
      const notion = new NotionAPI({
        userTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      });
      //Notion's API should not be called from client-side browsers due to CORS restrictions. notion-client is compatible with Node.js and Deno.
      const pageData = await notion.getPage(id);
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
  const newPageBlock = deepClone(pageBlock);
  /**
   *    [string, any][] [key,value][];
   *    [
          '21a1eb5c-0337-8147-9185-cba9e15d7b5a',
          { value: [Object], role: 'reader' }
        ]
   */
  const blockEntries = Object.entries(newPageBlock?.block || {});
  const newKeys = Object.keys(newPageBlock.block);
  const totalCount = { count: 0 };

  const languageMap = new Map([
    ["C++", "cpp"],
    ["C#", "csharp"],
    ["Assembly", "asm6502"],
  ]);

  const handleSyncBlock = (blockId, b, index) => {
    b.value.children.forEach((childBlock, childIndex) => {
      const newBlockId = `${blockId}_child_${childIndex}`;
      newPageBlock.block[newBlockId] = childBlock;
      newKeys.splice(index + childIndex + 1, 0, newBlockId);
    });
    delete newPageBlock.block[blockId];
  };

  const mapCodeLanguage = (b) => {
    const lang = b.value.properties?.language?.[0]?.[0];
    if (languageMap.has(lang)) {
      b.value.properties.language[0][0] = languageMap.get(lang);
    }
  };

  const limitedBlockEntries = blockEntries.filter(([blockId, block]) => {
    if (slice && slice > 0 && totalCount.count >= slice) {
      delete newPageBlock.block[blockId];
      return false;
    }
    totalCount.count++;
    return true;
  });

  limitedBlockEntries.forEach(([blockId, block], index) => {
    const b = block;

    // PageId 블록 내부 민감 정보 삭제
    if (b?.value?.id === id) {
      delete b?.value?.properties;
      return;
    }

    // sync_block => 하위 블록으로 교체
    if (b?.value?.type === "sync_block" && Array.isArray(b.value.children)) {
      handleSyncBlock(blockId, b, index);
      return;
    }
    // 코드블록 언어 이름 매핑
    if (b?.value?.type === "code") {
      mapCodeLanguage(b);
    }

    // 파일/미디어 링크 변환
    if (
      ["file", "pdf", "video", "audio"].includes(b?.value?.type) &&
      b.value.properties?.source?.[0]?.[0]?.includes("amazonaws.com")
    ) {
      const oldUrl = b.value.properties.source[0][0];
      b.value.properties.source[0][0] = `https://notion.so/signed/${encodeURIComponent(oldUrl)}?table=block&id=${b.value.id}`;
    }
  });

  return newPageBlock;
}
