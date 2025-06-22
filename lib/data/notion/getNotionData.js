/* eslint-disable no-unused-vars */
import { BLOG } from "@/blog.config";
import ErrorComponent from "@/modules/shared/ErrorComponent";
import { getDataFromCache, setDataToCache } from "@/lib/cache/cache_manager";
import { getPage, getPostBlocks } from "./getPostBlocks";
import { idToUuid } from "notion-utils";
import { deepClone, getRecommendPost } from "@/lib/utils/utils";
import { getPageProperties } from "./getPageProperties";
import { getAllCategories } from "./getAllCategories";
import { getAllPageIds } from "./getAllPageIds";
import { getAllTags } from "./getAllTags";
import {
  getTagOptions,
  getCategoryOptions,
  getLatestPosts,
  getSiteInfo,
  getNavPagesForGitBook,
  getNavPages,
  EmptyData,
  getCustomNav,
  getCustomMenu,
  getPageCover,
} from "@/lib/data/notion/utilsForNotionData";
import formatDate from "@/lib/utils/formatDate";
/**
 * Get blog data
 * @param {*} pageId
 * @param {*} from
 * @param latestPostCount Capture the latest number of articles
 * @param categoryCount
 * @param tagsCount Number of intercepted tags
 * @param pageType Filtered article types, array format ['Page','Post']
 * @returns
 *
 */
export async function getCustomedGlobalData({
  pageId = BLOG.NOTION_PAGE_ID,
  from,
}) {
  // Get from notice
  const data = await getNotionPageData({ pageId, from });
  const db = deepClone(data);
  // Sensitive data not returned
  delete db.block;
  delete db.schema;
  delete db.rawMetadata;
  delete db.pageIds;
  delete db.viewIds;
  delete db.collection;
  delete db.collectionQuery;
  delete db.collectionId;
  delete db.collectionView;
  return db;
}

/**
 * Get blog data
 * @param {*} pageId
 * @param {*} from
 * @param latestPostCount Capture the latest number of articles
 * @param categoryCount
 * @param tagsCount Number of intercepted tags
 * @param pageType Filtered article types, array format ['Page','Post']
 * @returns
 *
 */
export async function getGlobalPageIdData({
  pageId = BLOG.NOTION_PAGE_ID,
  from,
}) {
  // Get from notice
  console.log(
    `[getGlobalPageIdData pageId]\n pageId:${pageId} \n -from:${from}`
  );

  const data = await getDataBasePageIdsByNotionAPI({ pageId, from });
  const db = deepClone(data);
  // Sensitive data not returned
  delete db.block;
  delete db.schema;
  delete db.rawMetadata;
  delete db.pageIds;
  delete db.viewIds;
  delete db.collection;
  delete db.collectionQuery;
  delete db.collectionId;
  delete db.collectionView;
  return db;
}

/**
 * Get blog data
 * @param {*} pageId
 * @param {*} from
 * @param latestPostCount Capture the latest number of articles
 * @param categoryCount
 * @param tagsCount Number of intercepted tags
 * @param pageType Filtered article types, array format ['Page','Post']
 * @returns
 *
 */
export async function getGlobalData({
  pageId = BLOG.NOTION_PAGE_ID,
  type = "Record",
  from,
}) {
  // Get from notice
  console.log(
    `[getGlobalData pageId]\n pageId:${pageId} \n -from:${from} \n -type:${type}`
  );
  const data = await getNotionPageData({ pageId, from, type });
  const db = deepClone(data);
  // Sensitive data not returned
  delete db.block;
  delete db.schema;
  delete db.rawMetadata;
  delete db.pageIds;
  delete db.viewIds;
  delete db.collection;
  delete db.collectionQuery;
  delete db.collectionId;
  delete db.collectionView;
  // console.log('db==', db)
  return db;
}

/**
 *
Get the collection data of the specified notification
 * @param pageId
 * @param from request source
 * @returns {Promise<JSX.Element|*|*[]>}
 */
export async function getNotionPageData({ type = "Record", pageId, from }) {
  // Try to get from Cache
  // console.log("getNotionPageData: pageId:", pageId);
  const cacheKey = "page_block_" + pageId;
  let data = await getDataFromCache(cacheKey);
  if (data && data.pageIds?.length > 0) {
    return data;
  }
  data = await getDataBaseInfoByNotionAPI({ pageId, from, type });
  // cache
  if (data) {
    await setDataToCache(cacheKey, data);
  }

  return data;
}

/**
 * Get content based on page ID
 * @param {*} pageId
 * @returns
 */
export async function getPost(pageId) {
  const blockMap = await getPage(pageId, "slug");
  if (!blockMap) {
    return null;
  }
  // console.log("blockMap?.block?", blockMap?.block);
  const postInfo = blockMap?.block?.[pageId].value;
  // console.log("postInf::", postInfo);
  return {
    id: pageId,
    type: postInfo,
    category: "",
    tags: [],
    title: postInfo?.properties?.title?.[0],
    status: "Published",
    createdTime: formatDate(
      new Date(postInfo.created_time).toString(),
      BLOG.LANG
    ),
    lastEditedDay: formatDate(
      new Date(postInfo?.last_edited_time).toString(),
      BLOG.LANG
    ),
    fullWidth: postInfo?.fullWidth || false,
    page_cover: getPageCover(postInfo) || BLOG.HOME_BANNER_IMAGE,
    date: {
      start_date: formatDate(
        new Date(postInfo?.last_edited_time).toString(),
        BLOG.LANG
      ),
    },
    blockMap,
  };
}

/**
 * Get announcements
 */
export async function getNotice(post) {
  if (!post) {
    return null;
  }

  post.blockMap = await getPostBlocks(post.id, "data-notice");
  return post;
}

/**
 * Call NotionAPI to obtain Page data
 * @returns {Promise<JSX.Element|null|*>}
 */
export async function getDataBaseInfoByNotionAPI({
  pageId,
  from,
  type = "Record",
}) {
  const pageRecordMap = await getPostBlocks(pageId, from);
  if (!pageRecordMap) {
    console.error("can`t get Notion Data ; Which id is: ", pageId);
    return {};
  }
  console.log("pageRecordMap::::", pageRecordMap);
  pageId = idToUuid(pageId);
  const block = pageRecordMap.block || {};

  const rawMetadata = block[pageId]?.value;

  if (
    rawMetadata?.type !== "collection_view_page" &&
    rawMetadata?.type !== "collection_view"
  ) {
    console.error(`pageId "${pageId}" is not a database`);
    return EmptyData(pageId);
  }
  const collection = Object.values(pageRecordMap.collection)[0]?.value || {};
  const siteInfo = getSiteInfo({ collection, block });
  const collectionId = rawMetadata?.collection_id;
  const collectionQuery = pageRecordMap.collection_query;
  const collectionView = pageRecordMap.collection_view;
  const signedUrls = pageRecordMap.signed_urls;
  const previewImages = pageRecordMap.preview_images;
  const schema = collection?.schema;

  const viewIds = rawMetadata?.view_ids;
  const collectionData = [];
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
  for (let i = 0; i < pageIds.length; i++) {
    const id = pageIds[i];
    const value = block[id]?.value;
    if (!value) {
      continue;
    }
    const properties =
      (await getPageProperties(
        id,
        block,
        schema,
        null,
        getTagOptions(schema)
      )) || null;
    if (properties) {
      collectionData.push(properties);
    }
  }

  // article count
  let postCount = 0;

  // Find all Posts and Pages
  const allPages = collectionData.filter((post) => {
    if (type === "Record") {
      if (post?.type === "Record" && post.status === "Published") {
        postCount++;
      }
    } else if (type === "Devproject") {
      if (post?.type === "Devproject" && post.status === "Published") {
        postCount++;
      }
    } else if (type === "Engineering") {
      if (post?.type === "Engineering" && post.status === "Published") {
        postCount++;
      }
    } else if (type === "GuestBook") {
      if (post?.type === "GuestBook" && post.status === "Published") {
        postCount++;
      }
    } else if (type === "Page") {
      if (post?.type === "GuestBook" && post.status === "Published") {
        postCount++;
      }
    } else {
      postCount++;
    }
    return (
      post &&
      post?.slug &&
      !post?.slug?.startsWith("http") &&
      (post?.status === "Invisible" || post?.status === "Published")
    );
  });

  // Sort by date
  if (BLOG.RECORDS_SORT_BY === "date") {
    allPages.sort((a, b) => {
      return b?.publishDate - a?.publishDate;
    });
  }

  const notice = await getNotice(
    collectionData.filter((post) => {
      return (
        post &&
        post?.type &&
        post?.type === "Notice" &&
        post.status === "Published"
      );
    })?.[0]
  );

  const categoryOptions = getAllCategories({
    allPages,
    categoryOptions: getCategoryOptions(schema),
  });

  // getsSubTypeOptions
  const tagOptions = getAllTags({
    allPages,
    tagOptions: getTagOptions(schema),
  });

  // old menu
  const customNav = getCustomNav({
    allPages: collectionData.filter(
      (post) => post?.type === "Page" && post.status === "Published"
    ),
  });
  // new menu
  const customMenu = await getCustomMenu({ collectionData });
  const latestPosts = getLatestPosts({ allPages, from, latestPostCount: 6 });
  const allNavPages = getNavPages({ allPages });
  const allNavPagesForGitBook = getNavPagesForGitBook({ allPages });
  return {
    notice,
    siteInfo,
    allPages,
    allNavPages,
    allNavPagesForGitBook,
    collection,
    collectionQuery,
    collectionId,
    collectionView,
    viewIds,
    block,
    schema,
    tagOptions,
    categoryOptions,
    rawMetadata,
    customNav,
    customMenu,
    postCount,
    pageIds,
    latestPosts,
    signedUrls,
    previewImages,
  };
}

/**
 *
 * 2024.12.23 added for app router's [id] page.
 * @param {*} paramId
 * @param {*} type
 * @returns
 */
export async function getPageProps(paramId, type) {
  const props = await getGlobalData({
    type: type,
    pageId: BLOG.NOTION_PAGE_ID,
    from: type,
  });

  // Find article in list
  props.post = props?.allPages?.find((item) => {
    return item.id === paramId;
  });
  return props;
}

export async function generatingPageByTypeAndId(paramId, recordType) {
  const props = await getPageProps(paramId, recordType);

  if (!paramId) {
    return <ErrorComponent />;
  }

  // Unable to retrieve article
  if (!props?.post) {
    props.post = null;
    return <div>Invalid record ID</div>;
  }

  // Article content loading
  if (!props?.posts?.blockMap) {
    props.post.blockMap = await getPostBlocks(props.post.id, recordType);
  }

  if (recordType !== "SubMenuPage") {
    // Recommended related article processing
    const allPosts = props?.allPages?.filter(
      (page) =>
        page.type !== "CONFIG" &&
        page.type !== "Menu" &&
        page.type !== "SubMenu" &&
        page.type !== "SubMenuPage" &&
        page.type !== "Notice" &&
        page.type !== "Page" &&
        page.status === "Published" &&
        page.type === recordType
    );

    if (allPosts && allPosts.length > 0) {
      const index = allPosts.indexOf(props.post);
      props.prev = allPosts.slice(index - 1, index)[0] ?? allPosts.slice(-1)[0];
      props.next = allPosts.slice(index + 1, index + 2)[0] ?? allPosts[0];
      props.recommendPosts = getRecommendPost(
        props.post,
        allPosts,
        Number(BLOG.RECORD_RECOMMEND_COUNT)
      );
    } else {
      props.prev = null;
      props.next = null;
      props.recommendPosts = [];
    }
  }

  return props;
}

export async function generatingCategoryAndTagPageByTypeAndId(
  propertyId,
  decodedPropertyId,
  pageProperty,
  pagenum
) {
  if (!propertyId) {
    return <div>Invalid {pageProperty}</div>;
  }

  const props = await getGlobalData({
    type: `${pageProperty}-props`,
    pageId: BLOG.NOTION_PAGE_ID,
    from: `${pageProperty}-props`,
  });

  props.posts = props.allPages
    ?.filter(
      (page) =>
        page.type !== "CONFIG" &&
        page.type !== "Menu" &&
        page.type !== "SubMenu" &&
        page.type !== "SubMenuPage" &&
        page.type !== "Notice" &&
        page.type !== "Page" &&
        page.status === "Published"
    )
    .filter((post) => {
      if (pageProperty === "category") {
        return (
          post && post.category && post.category.includes(decodedPropertyId)
        );
      } else {
        return post && post.tags && post.tags.includes(decodedPropertyId);
      }
    });

  // Process article page count
  props.postCount = props.posts.length;
  const POSTS_PER_PAGE = BLOG.RECORDS_PER_PAGE;

  // Handle pagination

  props.posts =
    pagenum !== undefined
      ? props.posts.slice(
          POSTS_PER_PAGE * (pagenum - 1),
          POSTS_PER_PAGE * pagenum
        )
      : props.posts?.slice(0, POSTS_PER_PAGE);

  delete props.allPages;

  return props;
}
