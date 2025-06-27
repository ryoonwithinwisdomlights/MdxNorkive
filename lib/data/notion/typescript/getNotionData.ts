/* eslint-disable no-unused-vars */
import { BLOG } from "@/blog.config";
import { getRecommendPost } from "@/lib/utils/utils";
import { CollectionData } from "@/types";
import { GlobalData } from "@/types/getnotion.func.model";
import { Collection, CollectionPropertySchemaMap } from "notion-types";
import { formatDate, idToUuid } from "notion-utils";
import { getAllCategories } from "./getAllCategories";
import { getAllPageIds } from "./getAllPageIds";
import { getAllTags } from "./getAllTags";
import { getPageProperties } from "./getPageProperties";
import { getPostBlocks } from "./getPostBlocks";
import {
  dbDeepClone,
  EmptyData,
  excludingMenuPages,
  getCategoryOptions,
  getCustomMenu,
  getOldNav,
  getFilteredArrayWithPropertyAndIndex,
  getLatestPosts,
  getNavPagesForLeftSideBar,
  getPageCover,
  getSiteInfo,
  getTagOptions,
} from "./utilsForNotionData";

const NOTION_DB_ID = BLOG.NOTION_DATABASE_ID as string;
export async function getGlobalData({ pageId, from, type }: GlobalData) {
  const db = await getAllNotionDataBaseByNotionAPI({ pageId, from, type });
  const props = dbDeepClone(db);
  const allPages = excludingMenuPages({ arr: props.allPages, type: type });
  props.posts = allPages;
  return props;
}

function isDatabase(rawMetadata, uuidedRootPageId) {
  if (
    rawMetadata?.type !== "collection_view_page" &&
    rawMetadata?.type !== "collection_view"
  ) {
    console.error(`rootPageId -"${uuidedRootPageId}" is not a database`);
    return false;
  }
  return true;
}
/**
 * Call NotionAPI to obtain All Page data
 * @returns {Promise<JSX.Element|null|*>}
 */
export async function getAllNotionDataBaseByNotionAPI({
  pageId = NOTION_DB_ID,
  type,
  from = "main_page",
}: GlobalData) {
  //return type ExtendedRecordMap임.
  const pageRecordMap = await getPostBlocks({ pageId: pageId, from: from });

  if (!pageRecordMap) {
    console.error("can`t get Notion Data ; Which id is: ", pageId);
    return {};
  }
  // console.log("pageRecordMap::", pageRecordMap); // ExtendedRecordMap
  const block = pageRecordMap.block || {};
  const uuidedRootPageId = idToUuid(pageId);
  const rawMetadata = block[uuidedRootPageId]?.value;

  const isntDB = isDatabase(rawMetadata, uuidedRootPageId);
  if (!isntDB) {
    return EmptyData(uuidedRootPageId);
  }
  const collectionId = rawMetadata?.collection_id;
  const viewIds = rawMetadata?.view_ids;
  // if(pageRecordMap.collection)

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
  // console.log("pageIds:::", pageIds);
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

  const collectionData = (
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
  ).filter((item): item is CollectionData => item !== null);

  const dateSort = BLOG.RECORDS_SORT_BY === "date" ? true : false;
  // article count
  const postCounter = { count: 0 };
  // Find all Posts and Pages
  // console.log("collectionData:", typeof collectionData);
  const allPages = returnFilteredArr(
    collectionData,
    postCounter,
    type,
    dateSort
  );

  // console.log("allPages:", allPages);
  const notice = await getNoticePage(collectionData);

  const categoryOptions = getAllCategories({
    allPages,
    categoryOptions: getCategoryOptions(schema),
  });

  const tagOptions = getAllTags({
    allPages,
    tagOptions: getTagOptions(schema),
  });

  // old menu
  const oldNav = getOldNav({
    allPages: (collectionData as CollectionData[]).filter(
      (post) => post?.type === "Page" && post.status === "Published"
    ),
  });
  // new menu
  const customMenu = await getCustomMenu({ collectionData });
  const latestPosts = getLatestPosts({ allPages, from, latestPostCount: 6 });

  const allNavPagesForLeftSiedBar = getNavPagesForLeftSideBar({ allPages });
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
/**
 * Get content based on page ID
 * @param {*} pageId
 * @returns
 */
export async function getPost(pageId) {
  const blockMap = await getPostBlocks({ pageId: pageId, from: "slug" });
  if (!blockMap) {
    return null;
  }

  const postInfo = blockMap?.block?.[pageId].value;

  return {
    id: pageId,
    type: postInfo,
    category: "",
    tags: [],
    title: postInfo?.properties?.title?.[0],
    status: "Published",
    createdTime: formatDate(new Date(postInfo.created_time).toString()),
    lastEditedDay: formatDate(new Date(postInfo?.last_edited_time).toString()),
    fullWidth: postInfo?.fullWidth || false,
    page_cover: getPageCover(postInfo) || BLOG.HOME_BANNER_IMAGE,
    date: {
      start_date: formatDate(new Date(postInfo?.last_edited_time).toString()),
    },
    blockMap,
  };
}
async function getNoticePage(collectionData) {
  const post = collectionData.filter((post) => {
    return (
      post &&
      post?.type &&
      post?.type === "Notice" &&
      post.status === "Published"
    );
  })?.[0];

  if (!post) {
    return null;
  }

  post.blockMap = await getPostBlocks({ pageId: post.id, from: "data-notice" });
  return post;
}

function returnFilteredArr(arr, counterObj, type, dateSort) {
  /**
   * ✅ 참고: 깊은 복사(Deep Copy)까지 필요할까?

만약 post 안에 nested object (예: post.meta.tags 같은 구조)가 있고
그 내부까지 안전하게 보호해야 한다면,
lodash.cloneDeep이나 JSON.parse(JSON.stringify(post)) 같은 방법이 필요합니다
   */
  const typeMatchList = ["Record", "Devproject", "Engineering", "GuestBook"];
  const filteredArr = arr
    .slice() // Copy-on-Write: 원본 배열 복사
    .map((post) => ({ ...post })) // 내부 post 객체도 얕은 복사
    .filter((post) => {
      if (!post || !post.slug || post.slug.startsWith("http")) {
        return false;
      }

      const isVisible =
        post.status === "Invisible" || post.status === "Published";

      const isTypeMatched =
        type === "Page"
          ? post.type === "GuestBook" && post.status === "Published"
          : typeMatchList.includes(type)
            ? post.type === type && post.status === "Published"
            : true;

      if (isTypeMatched) {
        counterObj.count++;
      }

      return isVisible;
    });

  if (dateSort) {
    filteredArr.sort((a, b) => {
      return b?.publishDate - a?.publishDate;
    });
  }

  return filteredArr;
}

/**
 *
 * 2024.12.23 added for app router's [id] page.
 * @param {*} paramId
 * @param {*} type
 * @returns
 */
export async function getPageProps({ pageId, from, type }: GlobalData) {
  const props = await getGlobalData({
    type: type,
    pageId: NOTION_DB_ID,
    from: from,
  });
  // console.log("props:", props);
  // Find article in list
  props.post = props?.allPages?.find((item) => {
    return item.id === pageId;
  });
  return props;
}

export async function getPageByPageIdAndType(props, recordType) {
  // Article content loading
  if (!props?.posts?.blockMap) {
    props.post.blockMap = await getPostBlocks({
      pageId: props.post.id,
      from: recordType,
    });
  }

  if (recordType !== "SubMenuPage") {
    // Recommended related article processing
    const allPosts = excludingMenuPages({
      arr: props?.allPages,
      type: recordType,
    });

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

export async function getCategoryAndTagByPageId(
  decodedPropertyId,
  pageProperty,
  pagenum
) {
  const props = await getGlobalData({
    pageId: NOTION_DB_ID,
    from: `${pageProperty}-props`,
  });

  props.posts = getFilteredArrayWithPropertyAndIndex(
    props.posts,
    pageProperty,
    decodedPropertyId
  );
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
