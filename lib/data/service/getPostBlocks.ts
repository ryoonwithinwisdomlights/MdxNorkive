import { BLOG } from "@/blog.config";
import { getDataFromCache, setDataToCache } from "@/lib/cache/cache_manager";
import { deepClone, delay } from "@/lib/utils/utils";
import { BlockMap, PageBlockDataProps } from "@/types";
import { NotionAPI } from "notion-client";

/**
 * Get article content
 * @param {*} id
 * @param {*} from
 * @param {*} slice
 * @returns
 */

/**
 * Get Archive content
 * @param {*} id
 * @param {*} from
 * @param {*} slice
 * @returns
 */
export async function getRecordBlockMap({
  pageId,
  from,
  slice,
}: PageBlockDataProps) {
  const pageBlock = await getPageWithRetry(pageId, from);
  if (pageBlock) {
    return filterPostBlocks(pageId, pageBlock);
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
      //Notion's API should not be called from client-side browsers due to CORS restrictions. notion-client is compatible with Node.js and Deno.

      const api = new NotionAPI({
        userTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      });
      const start = new Date().getTime();
      const pageData = await api.getPage(id);
      const end = new Date().getTime();
      console.log(
        "[API<<--response]",
        `time consuming:${end - start}ms - from:${from}`
      );

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
type BlockEntriesItem = [blockId: string, block: BlockType];
type BlockType = {
  role: string;
  value: {
    id: string;
    type: string;
    properties?: Record<string, any>;
    children?: BlockType[];
  };
};

// ExtendedRecordMap
/**
 *
 * Special processing of the obtained page BLOCK
 * 1. Delete redundant fields
 * 2. For example, format files, videos, audios, and URLs
 * 3. Compatibility with code blocks and other elements
 * @param {*} id Page ID
 * @param {*} pageBlock page elements
 * @param {*} slice interception quantity
 * @returns
 */
export function filterPostBlocks(id, pageBlock) {
  const newPageBlock = deepClone(pageBlock);
  const newKeys = Object.keys(newPageBlock.block); //   entries<T>(o: { [s: string]: BlockType; } | ArrayLike<T>): [string, T][];
  const blockEntries: BlockEntriesItem[] = Object.entries(newPageBlock?.block);

  const languageMap = new Map([
    ["C++", "cpp"],
    ["C#", "csharp"],
    ["Assembly", "asm6502"],
  ]);

  const handleSyncBlock = (blockId: string, b: BlockType, index: number) => {
    if (!b.value?.children) return;
    b.value.children.forEach((childBlock, childIndex) => {
      const newBlockId = `${blockId}_child_${childIndex}`;
      newPageBlock.block[newBlockId] = childBlock;
      newKeys.splice(index + childIndex + 1, 0, newBlockId);
    });
    delete newPageBlock.block[blockId];
  };

  const mapCodeLanguage = (b: BlockType) => {
    if (!b.value?.properties) return;
    const lang = b.value.properties?.language?.[0]?.[0];
    if (lang && languageMap.has(lang)) {
      // b.value.properties.language[0][0] = languageMap.get(lang);
      if (b.value?.properties?.language?.[0]?.[0]) {
        b.value.properties.language[0][0] = languageMap.get(lang)!;
      }
    }
  };

  //Loop through each block of the document
  if (blockEntries) {
    blockEntries.forEach(([blockId, block]: BlockEntriesItem, index) => {
      const b = block;
      if (b?.value) {
        // Remove when BlockId is equal to PageId
        if (b?.value?.id === id) {
          //This block contains sensitive information
          delete b?.value?.properties;
          return;
        }

        // sync_block => 하위 블록으로 교체
        if (
          b?.value?.type === "sync_block" &&
          Array.isArray(b.value.children)
        ) {
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
      }
    });
  }

  return newPageBlock;
}
