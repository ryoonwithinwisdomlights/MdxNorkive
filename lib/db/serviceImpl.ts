/* eslint-disable no-unused-vars */
import { BLOG } from "@/blog.config";
import { fetchInBatches } from "@/lib/db/notion/getBatchedBlocks";
import {
  getPageProperties,
  getSinglePageProperties,
} from "@/lib/db/notion/getPageProperties";
import { NOTION_DB_ID } from "@/lib/db/notion/notion-api";
import {
  getRecordBlockMapWithRetry,
  getRecordPageWithRetry,
} from "@/lib/db/notion/getPageWithRetry";
import {
  adjustPageProperties,
  generateEmptyGloabalData,
  getAllBlockIds,
  getAllCategoriesOrTags,
  getCategoryOptions,
  getCustomNav,
  getLatestRecords,
  getNoticePage,
  getOldNav,
  getRecordListForLeftSideBar,
  getSiteInfo,
  getTagOptions,
  processingAllPagesWithTypeAndSort,
} from "@/lib/db/function";
import { isDatabase } from "@/lib/db/utils";
import { BaseArchivePageBlock, PageBlockDataProps } from "@/types";
import { Collection, CollectionPropertySchemaMap } from "notion-types";
import { parsePageId } from "notion-utils";

export async function getGlobalRecordPageData({
  pageId = NOTION_DB_ID,
  type,
  from = "main_page",
}: PageBlockDataProps) {
  console.debug("[API_Request]", `page-id:${pageId}, type:${type}`);

  // const uuidedRootPageId = idToUuid(pageId);
  const parsedId = parsePageId(pageId)!;
  const pageRecordMap = await getRecordBlockMapWithRetry({
    pageId: parsedId,
    from: from,
    retryAttempts: 3,
  });

  if (!pageRecordMap) {
    console.error("can`t get Notion Data ; Which id is: ", parsedId);
    return {};
  }

  let entireBlocks = pageRecordMap.block || {};
  const parentBlockValue = entireBlocks[parsedId]?.value;

  const isntDB = isDatabase(parentBlockValue, parsedId);
  if (!isntDB) {
    return generateEmptyGloabalData(parsedId);
  }
  const collection =
    (Object.values(pageRecordMap.collection || {})[0] as { value: Collection })
      ?.value || {};
  const collectionId = parentBlockValue?.collection_id;
  const collectionQuery = pageRecordMap.collection_query;

  const viewIds = parentBlockValue?.view_ids;
  const schema: CollectionPropertySchemaMap = collection?.schema;
  const siteInfo = getSiteInfo({ collection, block: entireBlocks });
  const pageIds = getAllBlockIds(collectionQuery, collectionId, viewIds);

  if (pageIds?.length === 0) {
    console.error(
      "The obtained achive list is empty, please check the notification template",
      collectionQuery,
      collection,
      viewIds,
      pageRecordMap
    );
  }

  // Crawl the main database and crawl up to 1000 blocks.
  // The overflowed blocks will be crawled here all at once.
  const blockIdsNeedFetch: string[] = [];
  pageIds.forEach((item, index) => {
    const id = pageIds[index];
    const value = entireBlocks[id]?.value;
    if (!value) {
      blockIdsNeedFetch.push(id);
    }
  });

  const fetchedBlocks = await fetchInBatches(blockIdsNeedFetch);
  entireBlocks = Object.assign({}, entireBlocks, fetchedBlocks);

  const allArchivedPageList = (
    await Promise.all(
      pageIds.map(async (id) => {
        const value = entireBlocks || fetchedBlocks;
        // const value = entireBlocks[id]?.value;
        if (!value) return null;

        const properties = await getPageProperties(
          id,
          pageId,
          value,
          schema,
          null,
          getTagOptions(schema)
        );
        return properties;
      })
    )
  ).filter((item): item is BaseArchivePageBlock => item !== null);

  // // 각 데이터 필드를 처리합니다
  allArchivedPageList.forEach(function (element) {
    adjustPageProperties(element);
  });

  const dateSort = BLOG.PAGE_SORT_BY === "date" ? true : false;
  // achive count
  const allpageCounter = { count: 0 };

  // Find all Archives and Record
  const allPages = processingAllPagesWithTypeAndSort(
    allArchivedPageList,
    allpageCounter,
    type,
    dateSort
  );

  const notice = await getNoticePage(allPages);

  const categoryOptions = getAllCategoriesOrTags({
    allPages,
    propertyOptions: getCategoryOptions(schema),
    propertyName: "category",
  });

  const tagOptions = getAllCategoriesOrTags({
    allPages,
    propertyOptions: getTagOptions(schema),
    propertyName: "tags",
  });

  // old menu
  const oldNav = getOldNav({
    allPages: (allArchivedPageList as BaseArchivePageBlock[]).filter(
      (record) => record?.type === "Page" && record.status === "Published"
    ),
  });
  // new menu
  const customMenu = await getCustomNav({ allPages });
  const latestRecords = getLatestRecords({
    allPages,
    from,
    latestpageCount: 6,
  });

  const allPagesForLeftNavBar = getRecordListForLeftSideBar({ allPages });
  const pageCount = allpageCounter.count;
  return {
    notice,
    siteInfo,
    categoryOptions,
    tagOptions,
    oldNav,
    customMenu,
    latestRecords,
    allPagesForLeftNavBar,
    allPages,
    schema,
    pageCount,
  };
}

export async function getSingleRecordPageData({
  pageId: pageId,
  from: from,
  type: type,
}: PageBlockDataProps) {
  console.debug(
    "[API_Request]",
    `from:${from} page-id:${pageId}, type:${type}`
  );
  const parsedId = parsePageId(pageId)!;

  const recordMap = await getRecordPageWithRetry({
    pageId: parsedId,
    retryAttempts: 3,
    from,
  });

  const rawMetaData = { blockMap: recordMap };

  if (!recordMap) {
    console.error("can`t get Notion Data ; Which id is: ");
    return null;
  }
  const rootBlock = recordMap.block[parsedId];
  const collection =
    (
      Object.values(recordMap.collection || {})[0] as {
        value: Collection;
      }
    )?.value || {};

  const schema: CollectionPropertySchemaMap = collection?.schema;
  const result: BaseArchivePageBlock = await getSinglePageProperties(
    pageId,
    rootBlock,
    recordMap,
    schema,
    getTagOptions(schema)
  );

  const page = Object.assign({}, result, rawMetaData);

  return { page };
}
