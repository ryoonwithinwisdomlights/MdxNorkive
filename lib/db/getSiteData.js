import { BLOG } from "@/blog.config";
import { getDataFromCache, setDataToCache } from "../../app/api/cache_manager";
import { getAllCategories } from "@/lib/notion/getAllCategories";
import getAllPageIds from "@/lib/notion/getAllPageIds";
import { getAllTags } from "@/lib/notion/getAllTags";
import { getConfigMapFromConfigPage } from "@/lib/notion/getNotionConfig";
import getPageProperties, {
  adjustPageProperties,
} from "@/lib/notion/getPageProperties";
import { fetchInBatches, getPage } from "@/lib/notion/getPostBlocks";
import { compressImage, mapImgUrl } from "@/lib/notion/mapImage";
import { deepClone } from "@/lib/utils";
import { idToUuid } from "notion-utils";
import { siteConfig } from "../config";
import {
  extractLangId,
  extractLangPrefix,
  getShortId,
} from "@/lib/utils/pageId";

export { getAllTags } from "@/lib/notion/getAllTags";
export { getPost } from "@/lib/notion/getNotionPost";
export { getPage as getPostBlocks } from "@/lib/notion/getPostBlocks";

/**
 * Notion을 기반으로 구현된 블로그 데이터를 얻습니다.
 * @param {*} pageId
 * @param {*} from
 * @param {*} locale 언어 zh|en|jp 등
 * @returns
 *
 */
export async function getGlobalData({
  pageId = BLOG.NOTION_PAGE_ID,
  from,
  locale,
}) {
  // 사이트 데이터를 가져옵니다. pageId가 쉼표로 구분된 경우 데이터를 일괄적으로 가져옵니다.
  const siteIds = pageId?.split(",") || [];
  let data = EmptyData(pageId);

  try {
    for (let index = 0; index < siteIds.length; index++) {
      const siteId = siteIds[index];
      const id = extractLangId(siteId);
      const prefix = extractLangPrefix(siteId);
      // 첫 번째 ID 사이트의 기본 언어
      if (index === 0 || locale === prefix) {
        data = await getNotionPageData({
          pageId: id,
          from,
        });
      }
    }
  } catch (error) {
    console.error("abnormal", error);
  }
  return handleDataBeforeReturn(deepClone(data));
}

/**
 * 
Get the collection data of the specified notification
 * @param pageId
 * @param from request source
 * @returns {Promise<JSX.Element|*|*[]>}
 */
export async function getNotionPageData({ pageId, from }) {
  // Try to get from cache
  const cacheKey = "page_block_" + pageId;
  let data = await getDataFromCache(cacheKey);
  if (data && data.pageIds?.length > 0) {
    console.debug("[API<<--缓存]", `from:${from}`, `root-page-id:${pageId}`);
    return data;
  } else {
    // Read from interface
    data = await getDataBaseInfoByNotionAPI({ pageId, from });
    // cache
    if (data) {
      await setDataToCache(cacheKey, data);
    }
  }

  // Data returned to the front end for processing
  return data;
}

/**
 * Data processing returned to the browser front end
 * Appropriate desensitization
 * Reduce volume
 *Other processing
 * @param {*} db
 */
function handleDataBeforeReturn(db) {
  // 清理多余数据
  delete db.block;
  delete db.schema;
  delete db.rawMetadata;
  delete db.pageIds;
  delete db.viewIds;
  delete db.collection;
  delete db.collectionQuery;
  delete db.collectionId;
  delete db.collectionView;

  // 清理多余的块
  if (db?.notice) {
    db.notice = cleanBlock(db?.notice);
    delete db.notice?.id;
  }

  db.tagOptions = cleanIds(db?.tagOptions);
  db.categoryOptions = cleanIds(db?.categoryOptions);
  db.customMenu = cleanIds(db?.customMenu);

  //   db.latestPosts = shortenIds(db?.latestPosts)
  db.allNavPages = shortenIds(db?.allNavPages);
  //   db.allPages = cleanBlocks(db?.allPages)

  db.allNavPages = cleanPages(db?.allNavPages, db.tagOptions);
  db.allPages = cleanPages(db.allPages, db.tagOptions);
  db.latestPosts = cleanPages(db.latestPosts, db.tagOptions);
  return db;
}

/**
 * Handle abnormal data in article list
 * @param {Array} allPages - All page data
 * @param {Array} tagOptions - Label options
 * @returns {Array} processed allPages
 */
function cleanPages(allPages, tagOptions) {
  // 校验参数是否为数组
  if (!Array.isArray(allPages) || !Array.isArray(tagOptions)) {
    console.warn("Invalid input: allPages and tagOptions should be arrays.");
    return allPages || []; // 返回空数组或原始值
  }

  // 提取 tagOptions 中所有合法的标签名
  const validTags = new Set(
    tagOptions
      .map((tag) => (typeof tag.name === "string" ? tag.name : null))
      .filter(Boolean) // 只保留合法的字符串
  );

  // 遍历所有的 pages
  allPages.forEach((page) => {
    // 确保 tagItems 是数组
    if (Array.isArray(page.tagItems)) {
      // 对每个 page 的 tagItems 进行过滤
      page.tagItems = page.tagItems.filter(
        (tagItem) =>
          validTags.has(tagItem?.name) && typeof tagItem.name === "string" // 校验 tagItem.name 是否是字符串
      );
    }
  });

  return allPages;
}

/**
 * Clean the ID of a set of data
 * @param {*} items
 * @returns
 */
function shortenIds(items) {
  if (items && Array.isArray(items)) {
    return deepClone(
      items.map((item) => {
        item.short_id = getShortId(item.id);
        delete item.id;
        return item;
      })
    );
  }
  return items;
}

/**
 * Clean the ID of a set of data
 * @param {*} items
 * @returns
 */
function cleanIds(items) {
  if (items && Array.isArray(items)) {
    return deepClone(
      items.map((item) => {
        delete item.id;
        return item;
      })
    );
  }
  return items;
}

/**
 * Clean block data
 */
function cleanBlock(item) {
  const post = deepClone(item);
  const pageBlock = post?.blockMap?.block;
  //   delete post?.id
  //   delete post?.blockMap?.collection

  if (pageBlock) {
    for (const i in pageBlock) {
      pageBlock[i] = cleanBlock(pageBlock[i]);
      delete pageBlock[i]?.role;
      delete pageBlock[i]?.value?.version;
      delete pageBlock[i]?.value?.created_by_table;
      delete pageBlock[i]?.value?.created_by_id;
      delete pageBlock[i]?.value?.last_edited_by_table;
      delete pageBlock[i]?.value?.last_edited_by_id;
      delete pageBlock[i]?.value?.space_id;
      delete pageBlock[i]?.value?.version;
      delete pageBlock[i]?.value?.format?.copied_from_pointer;
      delete pageBlock[i]?.value?.format?.block_locked_by;
      delete pageBlock[i]?.value?.parent_table;
      delete pageBlock[i]?.value?.copied_from_pointer;
      delete pageBlock[i]?.value?.copied_from;
      delete pageBlock[i]?.value?.created_by_table;
      delete pageBlock[i]?.value?.created_by_id;
      delete pageBlock[i]?.value?.last_edited_by_table;
      delete pageBlock[i]?.value?.last_edited_by_id;
      delete pageBlock[i]?.value?.permissions;
      delete pageBlock[i]?.value?.alive;
    }
  }
  return post;
}

/**
 * Get the latest articles and sort them in descending order according to the last modified time
 * @param {*}} param0
 * @returns
 */
function getLatestPosts({ allPages, from, latestPostCount }) {
  const allPosts = allPages?.filter(
    (page) => page.type === "Post" && page.status === "Published"
  );

  const latestPosts = Object.create(allPosts).sort((a, b) => {
    const dateA = new Date(a?.lastEditedDate || a?.publishDate);
    const dateB = new Date(b?.lastEditedDate || b?.publishDate);
    return dateB - dateA;
  });
  return latestPosts.slice(0, latestPostCount);
}

/**
 * Get user-defined single-page menu
 * The old version does not read the Menu menu, but reads type=Page to generate the menu.
 * @param notionPageData
 * @returns {Promise<[]|*[]>}
 */
function getCustomNav({ allPages }) {
  const customNav = [];
  if (allPages && allPages.length > 0) {
    allPages.forEach((p) => {
      p.to = p.slug;
      customNav.push({
        icon: p.icon || null,
        name: p.title,
        href: p.href,
        target: p.target,
        show: true,
      });
    });
  }
  return customNav;
}

/**
 * Get custom menu
 * @param {*} allPages
 * @returns
 */
function getCustomMenu({ collectionData, NOTION_CONFIG }) {
  const menuPages = collectionData.filter(
    (post) =>
      post.status === "Published" &&
      (post?.type === "Menu" || post?.type === "SubMenu")
  );
  const menus = [];
  if (menuPages && menuPages.length > 0) {
    menuPages.forEach((e) => {
      e.show = true;
      if (e.type === "Menu") {
        menus.push(e);
      } else if (e.type === "SubMenu") {
        const parentMenu = menus[menus.length - 1];
        if (parentMenu) {
          if (parentMenu.subMenus) {
            parentMenu.subMenus.push(e);
          } else {
            parentMenu.subMenus = [e];
          }
        }
      }
    });
  }
  return menus;
}

/**
 * Get label options
 * @param schema
 * @returns {undefined}
 */
function getTagOptions(schema) {
  if (!schema) return {};
  const tagSchema = Object.values(schema).find(
    (e) => e.name === BLOG.NOTION_PROPERTY_NAME.tags
  );
  return tagSchema?.options || [];
}

/**
 * Get classification options
 * @param schema
 * @returns {{}|*|*[]}
 */
function getCategoryOptions(schema) {
  if (!schema) return {};
  const categorySchema = Object.values(schema).find(
    (e) => e.name === BLOG.NOTION_PROPERTY_NAME.category
  );
  return categorySchema?.options || [];
}

/**
 * Site information
 * @param notionPageData
 * @param from
 * @returns {Promise<{title,description,pageCover,icon}>}
 */
function getSiteInfo({ collection, block, NOTION_CONFIG }) {
  const defaultTitle = NOTION_CONFIG?.TITLE || BLOG.TITLE;
  const defaultDescription = NOTION_CONFIG?.DESCRIPTION || BLOG.DESCRIPTION;
  const defaultPageCover =
    NOTION_CONFIG?.HOME_BANNER_IMAGE || BLOG.HOME_BANNER_IMAGE;
  const defaultIcon = NOTION_CONFIG?.AVATAR || BLOG.AVATAR;
  const defaultLink = NOTION_CONFIG?.LINK || BLOG.LINK;
  if (!collection && !block) {
    return {
      title: defaultTitle,
      description: defaultDescription,
      pageCover: defaultPageCover,
      icon: defaultIcon,
      link: defaultLink,
    };
  }

  const title = collection?.name?.[0][0] || defaultTitle;
  const description = collection?.description
    ? Object.assign(collection).description[0][0]
    : defaultDescription;

  const pageCover = collection?.cover
    ? mapImgUrl(collection?.cover, collection, "collection")
    : defaultPageCover;

  // Compress user avatar
  let icon = compressImage(
    collection?.icon
      ? mapImgUrl(collection?.icon, collection, "collection")
      : defaultIcon
  );
  // Site URL
  const link = NOTION_CONFIG?.LINK || defaultLink;

  // Site icon cannot be emoji
  const emojiPattern = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
  if (!icon || emojiPattern.test(icon)) {
    icon = defaultIcon;
  }
  return { title, description, pageCover, icon, link };
}

/**
* Get a reduced list of articles for navigation
 * Used in the gitbook theme, only the title, classification, label and classification information of the article are retained, and the summary, password, date and other data are reduced.
 * The conditions for navigation page must be Posts

 * @param {*} param0
 */
export function getNavPages({ allPages }) {
  const allNavPages = allPages?.filter((post) => {
    return (
      post &&
      post?.slug &&
      post?.type === "Post" &&
      post?.status === "Published"
    );
  });

  return allNavPages.map((item) => ({
    id: item.id,
    title: item.title || "",
    pageCoverThumbnail: item.pageCoverThumbnail || "",
    category: item.category || null,
    tags: item.tags || null,
    summary: item.summary || null,
    slug: item.slug,
    href: item.href,
    pageIcon: item.pageIcon || "",
    lastEditedDate: item.lastEditedDate,
    publishDate: item.publishDate,
    ext: item.ext || {},
  }));
}

/**
 * Get announcements
 */
async function getNotice(post) {
  if (!post) {
    return null;
  }

  post.blockMap = await getPage(post.id, "data-notice");
  return post;
}

// Return when there is no data
const EmptyData = (pageId) => {
  const empty = {
    notice: null,
    siteInfo: getSiteInfo({}),
    allPages: [
      {
        id: 1,
        title: `Unable to get Notion data, please check Notion_ID: \n Current ${pageId}`,
        summary:
          "Visit documentation for help→ https://tangly1024.com/records/vercel-deploy-notion-next",
        status: "Published",
        type: "Post",
        slug: "13a171332816461db29d50e9f575b00d",
        pageCoverThumbnail: BLOG.HOME_BANNER_IMAGE,
        date: {
          start_date: "2023-04-24",
          lastEditedDay: "2023-04-24",
          tagItems: [],
        },
      },
    ],
    allNavPages: [],
    collection: [],
    collectionQuery: {},
    collectionId: null,
    collectionView: {},
    viewIds: [],
    block: {},
    schema: {},
    tagOptions: [],
    categoryOptions: [],
    rawMetadata: {},
    customNav: [],
    customMenu: [],
    postCount: 1,
    pageIds: [],
    latestPosts: [],
  };
  return empty;
};

/**
 * Call NotionAPI to obtain Page data
 * @returns {Promise<JSX.Element|null|*>}
 */
async function getDataBaseInfoByNotionAPI({ pageId, from }) {
  console.log("[Fetching Data]", pageId, from);
  const pageRecordMap = await getPage(pageId, from);
  if (!pageRecordMap) {
    console.error("can`t get Notion Data ; Which id is: ", pageId);
    return {};
  }
  pageId = idToUuid(pageId);
  let block = pageRecordMap.block || {};
  const rawMetadata = block[pageId]?.value;
  // Check Type Page-Database和Inline-Database
  if (
    rawMetadata?.type !== "collection_view_page" &&
    rawMetadata?.type !== "collection_view"
  ) {
    console.error(`pageId "${pageId}" is not a database`);
    return EmptyData(pageId);
  }
  const collection = Object.values(pageRecordMap.collection)[0]?.value || {};
  const collectionId = rawMetadata?.collection_id;
  const collectionQuery = pageRecordMap.collection_query;
  const collectionView = pageRecordMap.collection_view;
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
      "获取到的文章列表为空，请检查notion模板",
      collectionQuery,
      collection,
      collectionView,
      viewIds,
      pageRecordMap
    );
  } else {
    // console.log('Effective number of pages', pageIds?.length)
  }

  // The main database can be captured up to 1000 blocks. The overflow blocks will be captured here.
  const blockIdsNeedFetch = [];
  for (let i = 0; i < pageIds.length; i++) {
    const id = pageIds[i];
    const value = block[id]?.value;
    if (!value) {
      blockIdsNeedFetch.push(id);
    }
  }
  const fetchedBlocks = await fetchInBatches(blockIdsNeedFetch);
  block = Object.assign({}, block, fetchedBlocks);

  // Get basic data for each article
  for (let i = 0; i < pageIds.length; i++) {
    const id = pageIds[i];
    const value = block[id]?.value || fetchedBlocks[id]?.value;
    const properties =
      (await getPageProperties(
        id,
        value,
        schema,
        null,
        getTagOptions(schema)
      )) || null;

    if (properties) {
      collectionData.push(properties);
    }
  }

  // Site configuration reads the configuration table first, otherwise reads the blog.config.js file.
  const NOTION_CONFIG =
    (await getConfigMapFromConfigPage(collectionData)) || {};

  // Process fields for each piece of data
  collectionData.forEach(function (element) {
    adjustPageProperties(element, NOTION_CONFIG);
  });

  // Site basic information
  const siteInfo = getSiteInfo({ collection, block, pageId });

  // article count
  let postCount = 0;

  // Find all Posts and Pages
  const allPages = collectionData.filter((post) => {
    if (post?.type === "Post" && post.status === "Published") {
      postCount++;
    }
    return (
      post &&
      post?.slug &&
      //   !post?.slug?.startsWith('http') &&
      (post?.status === "Invisible" || post?.status === "Published")
    );
  });

  // Sort by date
  if (
    siteConfig({
      key: "POSTS_SORT_BY",
      defaultVal: "",
      extendConfig: NOTION_CONFIG,
    }) === "date"
  ) {
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
  // All categories
  const categoryOptions = getAllCategories({
    allPages,
    categoryOptions: getCategoryOptions(schema),
  });
  // All tags
  const tagOptions = getAllTags({
    allPages,
    tagOptions: getTagOptions(schema),
    NOTION_CONFIG,
  });
  // old menu
  const customNav = getCustomNav({
    allPages: collectionData.filter(
      (post) => post?.type === "Page" && post.status === "Published"
    ),
  });
  // new menu
  const customMenu = await getCustomMenu({ collectionData, NOTION_CONFIG });
  const latestPosts = getLatestPosts({ allPages, from, latestPostCount: 6 });
  const allNavPages = getNavPages({ allPages });

  return {
    NOTION_CONFIG,
    notice,
    siteInfo,
    allPages,
    allNavPages,
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
  };
}
