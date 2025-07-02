/* eslint-disable no-unused-vars */
import { BLOG } from "@/blog.config";
import { NorkiveRecordData, PageBlockDataProps } from "@/types";

import { Collection, CollectionPropertySchemaMap } from "notion-types";
import { idToUuid } from "notion-utils";
import {
  setAllRecordsWithSort,
  generateEmptyGloabalData,
  getAllCategoriesOrTags,
  getAllPageIds,
  getCategoryOptions,
  getCustomMenu,
  getPageArrayWithOutMenu,
  getLatestRecords,
  getOldNav,
  getRecordListForLeftSideBar,
  getSiteInfo,
  getTagOptions,
  isDatabase,
  isNotMenuPage,
  getRecord,
} from "@/lib/data/service/notion-service";
import {
  filterPostBlocks,
  getPageWithRetry,
  getRecordBlockMap,
} from "@/lib/data/service/getPostBlocks";
import {
  applyDataBaseProcessing,
  setPageTableOfContentsByRecord,
} from "@/lib/data/service/utils";
import { getPageProperties } from "@/lib/data/service/getPageProperties";

import { getDataFromCache, setDataToCache } from "@/lib/cache/cache_manager";
import { getDataForRightSlidingDrawer } from "../pages/page-action";
import { isObjectNotEmpty } from "@/lib/utils/utils";

const NOTION_DB_ID = BLOG.NOTION_DATABASE_ID as string;

export default async function initGlobalNotionData(from: string = "main") {
  const props = await getGlobalData({
    pageId: BLOG.NOTION_DATABASE_ID as string,
    from: from,
  });

  // props.allArchive = props.records?.slice(0, BLOG.RECORD_PER_PAGE);
  return props;
}

export async function getGlobalData({
  pageId,
  from,
  type,
}: PageBlockDataProps) {
  // const db = await getDataBaseInfoByNotionAPI({ pageId, from, type });
  const db = await getAllRecordDataWithCache({ pageId, from, type });
  const props = applyDataBaseProcessing(db);
  const allPages = getPageArrayWithOutMenu({ arr: props.allPages, type: type });
  props.records = allPages;
  props.allArchiveRecords = props.allPages;
  return props;
}

/**
 *
 * @param pageId
 * @param from request source
 * @returns {Promise<JSX.Element|*|*[]>}
 */
export async function getOneRecordDataWithCache({
  pageId,
  from,
  type,
}: PageBlockDataProps) {
  const cacheKey = "page_block_" + pageId;
  let data = await getDataFromCache(cacheKey);
  if (data && data.pageIds?.length > 0) {
    console.debug("[API_Request]", `from:${from}`, `record-page-id:${pageId}`);
    return data;
  } else {
    data = await getOneRecordPageData({ pageId, type });

    if (data) {
      await setDataToCache(cacheKey, data);
    }
  }

  return data;
}

/**
 * Get the collection data of the specified notation
 * @param pageId
 * @param from request source
 * @returns {Promise<JSX.Element|*|*[]>}
 */
export async function getAllRecordDataWithCache({ pageId, from, type }) {
  // Try to get it from cache
  const cacheKey = "page_block_" + pageId;
  let data = await getDataFromCache(cacheKey);
  if (data && data.pageIds?.length > 0) {
    console.debug("[API_Request]", `from:${from}`, `root-page-id:${pageId}`);
    return data;
  } else {
    // Read from interface
    data = await getDataBaseInfoByNotionAPI({ pageId, from });
    // cache
    if (data) {
      await setDataToCache(cacheKey, data);
    }
  }

  // Return the data to the front end for processing
  return data;
}

//type으로 전체 가져온다음
//id로 sort.
/**
 * @returns {Promise<JSX.Element|null|*>}
 */
export async function getOneRecordPageData({
  pageId,
  type,
}: PageBlockDataProps) {
  console.debug("[API_Request]", `record-page-id:${pageId}`);
  //전체 글로벌데이터.
  const allRecordsPageMap = await getRecordBlockMap({ pageId: NOTION_DB_ID });

  if (!allRecordsPageMap) {
    console.error("can`t get Notion Data ; Which id is: ", NOTION_DB_ID);
    return {};
  }

  const block = allRecordsPageMap.block || {};
  const uuidedRootPageId = idToUuid(NOTION_DB_ID);

  const rawMetadata = block[uuidedRootPageId]?.value;

  const isntDB = isDatabase(rawMetadata, uuidedRootPageId);
  if (!isntDB) {
    return null;
  }
  const collection =
    (
      Object.values(allRecordsPageMap.collection || {})[0] as {
        value: Collection;
      }
    )?.value || {};
  const collectionId = rawMetadata?.collection_id;
  const collectionQuery = allRecordsPageMap.collection_query;
  const collectionView = allRecordsPageMap.collection_view;
  const viewIds = rawMetadata?.view_ids;
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
      allRecordsPageMap
    );
  }

  const allRecordsPagePropetis = (
    await Promise.all(
      allpageIds.map(async (id) => {
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
  ).filter((item): item is NorkiveRecordData => item !== null);

  const dateSort = BLOG.RECORD_SORT_BY === "date" ? true : false;
  // achive count
  const allRecordCounter = { count: 0 };

  // 특정타입인 전체 레코드
  const allRecords = setAllRecordsWithSort(
    allRecordsPagePropetis,
    allRecordCounter,
    type,
    dateSort
  );

  return {
    allRecords,
  };
}

/**
 * Call NotionAPI to obtain All Page data
 * @returns {Promise<JSX.Element|null|*>}
 */
async function getDataBaseInfoByNotionAPI({
  pageId = NOTION_DB_ID,
  type,
  from = "main_page",
}: PageBlockDataProps) {
  //return type ExtendedRecordMap.
  const pageRecordMap = await getRecordBlockMap({ pageId: pageId, from: from });

  if (!pageRecordMap) {
    console.error("can`t get Notion Data ; Which id is: ", pageId);
    return {};
  }

  const block = pageRecordMap.block || {};
  const uuidedRootPageId = idToUuid(pageId);

  const rawMetadata = block[uuidedRootPageId]?.value;

  const isntDB = isDatabase(rawMetadata, uuidedRootPageId);
  if (!isntDB) {
    return generateEmptyGloabalData(uuidedRootPageId);
  }
  const collection =
    (Object.values(pageRecordMap.collection || {})[0] as { value: Collection })
      ?.value || {};
  const collectionId = rawMetadata?.collection_id;
  const collectionQuery = pageRecordMap.collection_query;
  const collectionView = pageRecordMap.collection_view;

  const viewIds = rawMetadata?.view_ids;

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

  // 메인 데이터베이스에서 캡처할 수 있는 최대 블록 수는 1000개입니다. 넘치는 블록은 여기에서 통합된 방식으로 캡처됩니다.
  // const blockIdsNeedFetch = []
  // for (let i = 0; i < pageIds.length; i++) {
  //   const id = pageIds[i]
  //   const value = block[id]?.value
  //   if (!value) {
  //     blockIdsNeedFetch.push(id)
  //   }
  // }
  // const fetchedBlocks = await fetchInBatches(blockIdsNeedFetch)
  // block = Object.assign({}, block, fetchedBlocks)

  const allArchiveRecordsData = (
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
  ).filter((item): item is NorkiveRecordData => item !== null);

  //   // 사이트 구성은 먼저 구성 테이블을 읽고, 그렇지 않으면 blog.config.js 파일을 읽습니다.
  // const NOTION_CONFIG = (await getConfigMapFromConfigPage(collectionData)) || {}

  // // 각 데이터 필드를 처리합니다
  // collectionData.forEach(function (element) {
  //   adjustPageProperties(element, NOTION_CONFIG)
  // })

  const dateSort = BLOG.RECORD_SORT_BY === "date" ? true : false;
  // achive count
  const allRecordCounter = { count: 0 };

  // Find all Archives and Record
  const allPages = setAllRecordsWithSort(
    allArchiveRecordsData,
    allRecordCounter,
    type,
    dateSort
  );

  const notice = await getNoticePage(allArchiveRecordsData);

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
    allPages: (allArchiveRecordsData as NorkiveRecordData[]).filter(
      (record) => record?.type === "Page" && record.status === "Published"
    ),
  });
  // new menu
  const customMenu = await getCustomMenu({ allArchiveRecordsData });
  const latestRecords = getLatestRecords({
    allPages,
    from,
    latestRecordCount: 6,
  });

  const allNavPagesForLeftSideBar = getRecordListForLeftSideBar({ allPages });
  const recordCount = allRecordCounter.count;
  return {
    notice,
    siteInfo,
    allPages,
    allNavPagesForLeftSideBar,
    block,
    schema,
    tagOptions,
    categoryOptions,
    rawMetadata,
    oldNav,
    customMenu,
    recordCount,
    pageIds,
    latestRecords,
    // rightSlidingDrawerInfo,
  };
}

export async function getNoticePage(data) {
  const notice = data.filter((page) => {
    return (
      page &&
      page?.type &&
      page?.type === "Notice" &&
      page.status === "Published"
    );
  })?.[0];

  if (!notice) {
    return null;
  }

  notice.blockMap = await getRecordBlockMap({
    pageId: notice.id,
    from: "data-notice",
  });
  return notice;
}

/**
 * Get archive content
 * @param {*} id
 * @param {*} from
 * @param {*} slice
 * @returns
 */
export async function getPureRecordMap({
  id,
  from,
}: {
  id: string;
  from?: string;
}) {
  const cacheKey = "page_block_" + id;
  let pageBlock = await getDataFromCache(cacheKey);
  if (pageBlock) {
    return filterPostBlocks(id, pageBlock);
  }

  pageBlock = await getPageWithRetry({ pageId: id, from });

  if (pageBlock) {
    await setDataToCache(cacheKey, pageBlock);
    return filterPostBlocks(id, pageBlock);
  }
  return pageBlock;
}
