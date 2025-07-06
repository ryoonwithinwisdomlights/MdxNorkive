/* eslint-disable no-unused-vars */
import { getTextContent, idToUuid } from "notion-utils";
import { notion_api } from "@/lib/notion/data/db";

export async function getAllPageIds2(
  databasePageId: string
): Promise<string[]> {
  const uuidedPageId = idToUuid(databasePageId);
  const recordMap = await notion_api.getPage(databasePageId);
  const blockMap = recordMap.block || {};
  const rootBlock = blockMap[uuidedPageId]?.value;

  if (!rootBlock) {
    console.error(`[getAllPageIds] No root block found for ${databasePageId}`);
    return [];
  }

  if (
    rootBlock.type !== "collection_view_page" &&
    rootBlock.type !== "collection_view"
  ) {
    console.error(`[getAllPageIds] Page ${databasePageId} is not a collection`);
    return [];
  }

  const collectionId = rootBlock.collection_id;
  const viewIds = rootBlock.view_ids;
  const collectionQuery = recordMap.collection_query;

  if (!collectionId || !viewIds || !collectionQuery?.[collectionId]) {
    console.error(
      `[getAllPageIds] Missing collection data for ${databasePageId}`
    );
    return [];
  }

  const pageSet = new Set<string>();

  pageSetOnlyPageType(blockMap, pageSet);
  return [...pageSet];
}

// 모든 block 중 type === 'page'인 애들만 대상
function pageSetOnlyPageType(blockMap, pageSet) {
  Object.entries(blockMap).forEach(([id, block]) => {
    const value = (block as any).value;
    if (value?.type !== "page") return;

    const properties = value.properties || {};
    const statusRaw = properties["status"] || properties["Status"];
    const status = getTextContent(statusRaw);

    if (status?.toLowerCase() === "published") {
      pageSet.add(id);
    }
  });
}
// 모든 block 대상
function pageSetAll(viewIds, collectionQuery, collectionId, pageSet) {
  // First attempt: preferred View's blockIds
  for (const viewId of viewIds) {
    const viewQuery = collectionQuery[collectionId]?.[viewId];
    if (!viewQuery) continue;

    const groupResults = (viewQuery as any)?.collection_group_results?.blockIds;
    const normalBlocks = (viewQuery as any)?.blockIds;

    if (groupResults?.length) {
      groupResults.forEach((id: string) => pageSet.add(id));
    }
    if (normalBlocks?.length) {
      normalBlocks.forEach((id: string) => pageSet.add(id));
    }
  }
}
