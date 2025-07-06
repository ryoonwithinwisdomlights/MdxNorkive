/* eslint-disable no-unused-vars */
import { BLOG } from "@/blog.config";
import { BaseArchivePageBlock, PageBlockDataProps } from "@/types";
import {
  adjustPageProperties,
  generateEmptyGloabalData,
  getAllCategoriesOrTags,
  getAllPageIds,
  getAllPagesWithoutMenu,
  getCategoryOptions,
  getCustomMenu,
  getLatestRecords,
  getNoticePage,
  getOldNav,
  getRecordListForLeftSideBar,
  getSiteInfo,
  getTagOptions,
  processingAllPagesWithTypeAndSort,
} from "@/lib/notion/function";
import { isDatabase, setDataBaseProcessing } from "@/lib/notion/utils";
import { Collection, CollectionPropertySchemaMap } from "notion-types";
import { idToUuid } from "notion-utils";
import { getRecordBlockMapWithRetry } from "@/lib/notion/data/getPageWithRetry";
import { getPageProperties } from "./data/getPageProperties";
import { NOTION_DB_ID } from "@/lib/notion/data/db";
import { fetchInBatches } from "./data/getBatchedBlocks";

export async function getGlobalData({
  pageId,
  from,
  type,
}: PageBlockDataProps) {
  const db = await getDataBaseInfoByNotionAPI({ pageId, from, type });
  if (!db) {
    console.error("can`t get Notion Data ; Which id is: ", pageId);
    return {};
  }
  const result = setDataBaseProcessing(db);

  const allPages = getAllPagesWithoutMenu({
    arr: result.allPages,
    type: type,
  });
  // result.allPages = allPages;
  result.allPages = allPages;
  return result;
}

/**
 * @returns {Promise<JSX.Element|null|*>}
 */
export async function getOneRecordPageData({
  pageId,
  type,
  from,
}: PageBlockDataProps) {
  console.debug("[API_Request]", `page-id:${pageId}, type:${type}`);
  const uuidedRootPageId = idToUuid(NOTION_DB_ID);
  const allPageBlockMap = await getRecordBlockMapWithRetry({
    pageId: NOTION_DB_ID,
    retryAttempts: 3,
    from,
  });

  if (!allPageBlockMap) {
    console.error("can`t get Notion Data ; Which id is: ", NOTION_DB_ID);
    return null;
  }

  const entireBlocksObject = allPageBlockMap.block || {}; //전체 블록들의 집합
  const rootBlockObjectValue = entireBlocksObject[uuidedRootPageId]?.value; //Notion_DB id값에 해당하는 블록 밸류
  const isntDB = isDatabase(rootBlockObjectValue, uuidedRootPageId);
  if (!isntDB) {
    return null;
  }

  const collectionId = rootBlockObjectValue?.collection_id;
  const viewIds = rootBlockObjectValue?.view_ids;
  const collectionQuery = allPageBlockMap.collection_query;
  const collectionView = allPageBlockMap.collection_view;

  const collection =
    (
      Object.values(allPageBlockMap.collection || {})[0] as {
        value: Collection;
      }
    )?.value || {};
  const schema: CollectionPropertySchemaMap = collection?.schema;
  const allpageIds = getAllPageIds(
    collectionQuery,
    collectionId,
    collectionView,
    viewIds
  );

  if (allpageIds?.length === 0) {
    console.error(
      "The obtained achive list is empty, please check the notification template",
      collectionQuery,
      collection,
      collectionView,
      viewIds,
      allPageBlockMap
    );
  }

  const allPageBlockMapWithProperties: BaseArchivePageBlock[] = (
    await Promise.all(
      allpageIds.map(async (id) => {
        const value = entireBlocksObject[id]?.value;
        if (!value) return null;

        const properties = await getPageProperties(
          id,
          pageId,
          entireBlocksObject,
          schema,
          null,
          getTagOptions(schema)
        );
        return properties;
      })
    )
  ).filter((item): item is BaseArchivePageBlock => item !== null);

  const dateSort = BLOG.PAGE_SORT_BY === "date" ? true : false;

  const allpageCounter = { count: 0 };

  // 특정타입인 전체 레코드
  const allPages: BaseArchivePageBlock[] = processingAllPagesWithTypeAndSort(
    allPageBlockMapWithProperties,
    allpageCounter,
    type,
    dateSort
  );
  const page = allPages.find((item) => item.id === pageId);
  return {
    allPages: allPages,
    page: page,
  };
}

export async function getDataBaseInfoByNotionAPI({
  pageId = NOTION_DB_ID,
  type,
  from = "main_page",
}: PageBlockDataProps) {
  const uuidedRootPageId = idToUuid(pageId);
  console.debug(
    "[getDataBaseInfoByNotionAPI][API_Request]",
    `page-id:${pageId}, type:${type}`
  );
  const pageRecordMap = await getRecordBlockMapWithRetry({
    pageId: uuidedRootPageId,
    from: from,
    retryAttempts: 3,
  });

  if (!pageRecordMap) {
    console.error("can`t get Notion Data ; Which id is: ", uuidedRootPageId);
    return {};
  }

  let block = pageRecordMap.block || {};
  const parentBlockValue = block[uuidedRootPageId]?.value;

  const isntDB = isDatabase(parentBlockValue, uuidedRootPageId);
  if (!isntDB) {
    return generateEmptyGloabalData(uuidedRootPageId);
  }
  const collection =
    (Object.values(pageRecordMap.collection || {})[0] as { value: Collection })
      ?.value || {};
  const collectionId = parentBlockValue?.collection_id;
  const collectionQuery = pageRecordMap.collection_query;
  const collectionView = pageRecordMap.collection_view;

  const viewIds = parentBlockValue?.view_ids;

  const schema: CollectionPropertySchemaMap = collection?.schema;
  const siteInfo = getSiteInfo({ collection, block });

  const pageIds = getAllPageIds(
    collectionQuery,
    collectionId,
    collectionView,
    viewIds
  );

  if (pageIds?.length === 0) {
    console.error(
      "The obtained achive list is empty, please check the notification template",
      collectionQuery,
      collection,
      collectionView,
      viewIds,
      pageRecordMap
    );
  }

  // Crawl the main database and crawl up to 1000 blocks. The overflowed blocks will be crawled here all at once.
  const blockIdsNeedFetch: string[] = [];
  pageIds.forEach((item, index) => {
    const id = pageIds[index];
    const value = block[id]?.value;
    if (!value) {
      blockIdsNeedFetch.push(id);
    }
  });

  const fetchedBlocks = await fetchInBatches(blockIdsNeedFetch);
  block = Object.assign({}, block, fetchedBlocks);

  const allArchivedPageList = (
    await Promise.all(
      pageIds.map(async (id) => {
        const value = block[id]?.value;
        if (!value) return null;

        const properties = await getPageProperties(
          id,
          pageId,
          block,
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
  const customMenu = await getCustomMenu({ allPages });
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
    allPages,
    allPagesForLeftNavBar,
    block,
    schema,
    tagOptions,
    categoryOptions,
    parentBlockValue,
    oldNav,
    customMenu,
    pageCount,
    pageIds,
    latestRecords,
    // rightSlidingDrawerInfo,
  };
}
