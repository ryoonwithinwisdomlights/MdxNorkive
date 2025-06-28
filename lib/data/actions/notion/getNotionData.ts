/* eslint-disable no-unused-vars */
import { BLOG } from "@/blog.config";
import { NorkiveRecordData, PageBlockDataProps } from "@/types";

import { Collection, CollectionPropertySchemaMap } from "notion-types";
import { idToUuid } from "notion-utils";
import {
  allArchivesWithSort,
  generateEmpyRecordData,
  getAllCategoriesOrTags,
  getAllPageIds,
  getCategoryOptions,
  getCustomMenu,
  getExcludeMenuPages,
  getLatestPosts,
  getOldNav,
  getRecordListForLeftSideBar,
  getSiteInfo,
  getTagOptions,
  isDatabase,
} from "@/lib/data/service/notion-service";
import {
  filterPostBlocks,
  getPageWithRetry,
  getPostBlocks,
} from "@/lib/data/service/getPostBlocks";
import { dbDeepClone } from "@/lib/data/service/utils";
import { getPageProperties } from "@/lib/data/service/getPageProperties";

import { getDataFromCache, setDataToCache } from "@/lib/cache/cache_manager";

const NOTION_DB_ID = BLOG.NOTION_DATABASE_ID as string;

export default async function loadGlobalNotionData(from: string = "main") {
  const props = await getGlobalData({
    pageId: BLOG.NOTION_DATABASE_ID as string,
    from: from,
  });

  props.allArchive = props.posts?.slice(0, BLOG.archive_per_page);
  return props;
}

export async function getGlobalData({
  pageId,
  from,
  type,
}: PageBlockDataProps) {
  const db = await getAllNotionArchiveDB({ pageId, from, type });
  const props = dbDeepClone(db);
  const allPages = getExcludeMenuPages({ arr: props.allPages, type: type });
  props.posts = allPages;
  return props;
}

/**
 * Call NotionAPI to obtain All Page data
 * @returns {Promise<JSX.Element|null|*>}
 */
async function getAllNotionArchiveDB({
  pageId = NOTION_DB_ID,
  type,
  from = "main_page",
}: PageBlockDataProps) {
  //return type ExtendedRecordMap.
  const pageRecordMap = await getPostBlocks({ pageId: pageId, from: from });

  if (!pageRecordMap) {
    console.error("can`t get Notion Data ; Which id is: ", pageId);
    return {};
  }

  const block = pageRecordMap.block || {};
  const uuidedRootPageId = idToUuid(pageId);
  const rawMetadata = block[uuidedRootPageId]?.value;

  const isntDB = isDatabase(rawMetadata, uuidedRootPageId);
  if (!isntDB) {
    return generateEmpyRecordData(uuidedRootPageId);
  }
  const collectionId = rawMetadata?.collection_id;
  const viewIds = rawMetadata?.view_ids;

  const collection =
    (Object.values(pageRecordMap.collection || {})[0] as { value: Collection })
      ?.value || {};
  const schema: CollectionPropertySchemaMap = collection?.schema;
  const siteInfo = getSiteInfo({ collection, block });

  const collectionQuery = pageRecordMap.collection_query;
  const collectionView = pageRecordMap.collection_view;

  const pageIds = getAllPageIds(
    collectionQuery,
    collectionId,
    collectionView,
    viewIds
  );

  if (pageIds?.length === 0) {
    console.error(
      "The obtained article list is empty, please check the notification template",
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

  const allArchiveRecordData = (
    await Promise.all(
      pageIds.map(async (id) => {
        const value = block[id]?.value;
        if (!value) return null;

        const properties = await getPageProperties(
          id,
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

  const dateSort = BLOG.archive_sort_by === "date" ? true : false;
  // article count
  const postCounter = { count: 0 };

  // Find all Archives and Record
  const allPages = allArchivesWithSort(
    allArchiveRecordData,
    postCounter,
    type,
    dateSort
  );

  const notice = await getNoticePage(allArchiveRecordData);

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
    allPages: (allArchiveRecordData as NorkiveRecordData[]).filter(
      (post) => post?.type === "Page" && post.status === "Published"
    ),
  });
  // new menu
  const customMenu = await getCustomMenu({ allArchiveRecordData });
  const latestPosts = getLatestPosts({ allPages, from, latestPostCount: 6 });

  const allNavPagesForLeftSiedBar = getRecordListForLeftSideBar({ allPages });
  const postCount = postCounter.count;
  return {
    notice,
    siteInfo,
    allPages,
    allNavPagesForLeftSiedBar,
    block,
    schema,
    tagOptions,
    categoryOptions,
    rawMetadata,
    oldNav,
    customMenu,
    postCount,
    pageIds,
    latestPosts,
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

  notice.blockMap = await getPostBlocks({
    pageId: notice.id,
    from: "data-notice",
  });
  return notice;
}

/**
 * Get article content
 * @param {*} id
 * @param {*} from
 * @param {*} slice
 * @returns
 */
export async function getSinlgePost({
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

  pageBlock = await getPageWithRetry(id, from);

  if (pageBlock) {
    await setDataToCache(cacheKey, pageBlock);
    return filterPostBlocks(id, pageBlock);
  }
  return pageBlock;
}
