/* eslint-disable no-unused-vars */
import { BLOG } from "@/blog.config";
import { BaseArchivePageBlock, PageBlockDataProps } from "@/types";

import { getPageProperties, getRecordBlockMapWithRetry } from "@/lib/data/data";
import {
  generateEmptyGloabalData,
  getAllCategoriesOrTags,
  getAllPageIds,
  getAllPagesWithoutMenu,
  getCategoryOptions,
  getCustomMenu,
  getLatestRecords,
  getOldNav,
  getRecordListForLeftSideBar,
  getSiteInfo,
  getTagOptions,
  processingAllPagesWithTypeAndSort,
} from "@/lib/data/function";
import { isDatabase, setDataBaseProcessing } from "@/lib/data/utils";
import { Collection, CollectionPropertySchemaMap } from "notion-types";
import { idToUuid } from "notion-utils";

const NOTION_DB_ID = BLOG.NOTION_DATABASE_ID as string;

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
  const props = setDataBaseProcessing(db);

  const allPages = getAllPagesWithoutMenu({
    arr: props.allPages,
    type: type,
  });
  props.allPages = allPages;
  props.allArchivedPageList = allPages;
  return props;
}

/**
 * Get the collection data of the specified notation
 * @param pageId
 * @param from request source
 * @returns {Promise<JSX.Element|*|*[]>}
 */
export async function getAllRecordDataWithCache({ pageId, from, type }) {
  const data = await getDataBaseInfoByNotionAPI({ pageId, from });
  return data;
}

/**
 * @returns {Promise<JSX.Element|null|*>}
 */
export async function getOneRecordPageData({
  pageId,
  type,
  from,
}: PageBlockDataProps) {
  console.debug(
    "[getOneRecordPageData][API_Request]",
    `record-page-id:${pageId}, type:${type}`
  );
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
  // achive count
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

  const block = pageRecordMap.block || {};
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

  //   // 사이트 구성은 먼저 구성 테이블을 읽고, 그렇지 않으면 blog.config.js 파일을 읽습니다.
  // const NOTION_CONFIG = (await getConfigMapFromConfigPage(collectionData)) || {}

  // // 각 데이터 필드를 처리합니다
  // collectionData.forEach(function (element) {
  //   adjustPageProperties(element, NOTION_CONFIG)
  // })

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

  const notice = await getNoticePage(allArchivedPageList);

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
  const customMenu = await getCustomMenu({ allArchivedPageList });
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

  notice.blockMap = await getRecordBlockMapWithRetry({
    pageId: notice.id,
    from: "data-notice",
  });
  return notice;
}
