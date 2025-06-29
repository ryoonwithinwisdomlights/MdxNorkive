import { BLOG } from "@/blog.config";
import { RecommendPage } from "@/types";

import {
  EXCLUDED_PAGE_TYPES,
  INCLUDED_MENU_TYPES,
} from "@/lib/constants/menu.constants";
import {
  CategoryItem,
  LeftSideBarNavItem,
  NavItem,
  NorkiveRecordData,
  OldNavItem,
  TagItem,
} from "@/types";
import { CollectionPropertySchemaMap } from "notion-types";
import { defaultMapImageUrl } from "notion-utils";
import {
  compressImage,
  getrecordsGroupByDate,
  getSortedPostObject,
  mapImgUrl,
} from "./utils";
import { generateCustomizeUrlWithType } from "./getPageProperties";

type CollectionQueryResultView = {
  blockIds?: string[];
  collection_group_results?: {
    blockIds?: string[];
  };
};

export function getPageCover(postInfo) {
  const pageCover = postInfo.format?.page_cover;
  if (pageCover) {
    if (pageCover.startsWith("/")) return BLOG.NOTION_HOST + pageCover;
    if (pageCover.startsWith("http"))
      return defaultMapImageUrl(pageCover, postInfo);
  }
}

/**
 * Get label options
 * @param schema
 * @returns {undefined}
 */
export function getTagOptions(schema: CollectionPropertySchemaMap) {
  if (!schema) return [];
  const tagSchema = Object.values(schema).find(
    (element) => element.name === BLOG.NOTION_PROPERTY_NAME.tags
  ) as TagItem | undefined;
  return tagSchema?.options || [];
}

/**
 * Get classification options
 * @param schema
 * @returns {{}|*|*[]}
 */
export function getCategoryOptions(schema: CollectionPropertySchemaMap) {
  if (!schema) return {};
  const categorySchema = Object.values(schema).find(
    (e) => e.name === BLOG.NOTION_PROPERTY_NAME.category
  ) as CategoryItem | undefined;
  return categorySchema?.options || [];
}

/**
 * Get the Categories or Tags of all Records
 * @param allrecords
 * @returns {Promise<{}|*[]>}
 */
export function getAllCategoriesOrTags({
  allPages,
  propertyOptions,
  propertyName,
  sliceCount = 0,
}) {
  const allrecords = getExcludeMenuPages({ arr: allPages });
  if (!allrecords || !Array.isArray(propertyOptions)) return [];

  // Step 1: 프로퍼티별 개수 집계
  const itemCounts = allrecords
    .flatMap((record) => record[propertyName] || [])
    .reduce((acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {});

  // Step 2: 옵션에 맞는 카테고리 리스트 생성
  const itemList = propertyOptions
    .filter((option) => itemCounts[option.value])
    .map((option) => ({
      id: option.id,
      name: option.value,
      color: option.color,
      count: itemCounts[option.value],
    }));

  // Step 3: slice 적용
  return sliceCount > 0 ? itemList.slice(0, sliceCount) : itemList;
}

export function getOldNav({ allPages }) {
  const oldNav: OldNavItem[] = [];
  if (allPages && allPages.length > 0) {
    allPages.forEach((p) => {
      p.to = p.slug;
      oldNav.push({
        icon: p.icon || null,
        name: p.title,
        href: p.href,
        target: p.target,
        show: true,
      });
    });
  }
  return oldNav;
}

export function getCustomMenu({
  allArchiveRecordsData,
}: {
  allArchiveRecordsData: NorkiveRecordData[];
}) {
  const menuPages = allArchiveRecordsData.filter(
    (record) =>
      record.status === "Published" &&
      INCLUDED_MENU_TYPES.includes(record?.type)
  );
  const menus: NavItem[] = [];
  if (menuPages && menuPages.length > 0) {
    menuPages.forEach((e) => {
      const menuItem = generateMenuItem(e);
      if (e.type === "Menu") {
        menus.push(menuItem);
      } else {
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
 * Get the latest records and sort them in descending order
 * according to the last modified time
 * @param {*}} param0
 * @returns
 */
export function getLatestRecords({ allPages, from, latestRecordCount }) {
  const allrecords = getExcludeMenuPages({ arr: allPages });
  const latestRecords = [...allrecords].sort((a, b) => {
    const dateA = new Date(a?.lastEditedDate || a?.publishDate);
    const dateB = new Date(b?.lastEditedDate || b?.publishDate);
    return dateB.getTime() - dateA.getTime();
  });

  return latestRecords.slice(0, latestRecordCount);
}

/**
 * Site Information
 * @param notionPageData
 * @param from
 * @returns {Promise<{title,description,pageCover,icon}>}
 */
export function getSiteInfo({
  collection,
  block,
}: {
  collection?: any;
  block?: any;
}) {
  const defaultTitle = BLOG.TITLE;
  const defaultDescription = BLOG.DESCRIPTION;
  const defaultPageCover = BLOG.HOME_BANNER_IMAGE;
  const defaultIcon = BLOG.AVATAR;
  const defaultLink = BLOG.LINK;
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
  // compressImage({
  //   image: src as string,
  //   width: getOldsiteConfig({
  //     key: "IMAGE_ZOOM_IN_WIDTH",
  //     defaultVal: 1200,
  //   }),
  // })
  const collectionIcon = mapImgUrl(collection?.icon, collection, "collection");

  // Compress all category user avatars
  let icon = compressImage(
    collectionIcon ? { image: collectionIcon } : { image: defaultIcon }
  );
  // Site URL
  const link = defaultLink;

  // Site icon cannot be emoji
  const emojiPattern = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
  if (!icon || emojiPattern.test(icon)) {
    icon = defaultIcon;
  }
  return { title, description, pageCover, icon, link };
}

/**
 * Get a reduced list of articles for navigation
 * Used in the gitbook theme, only the title, classification, label and classification information
of the article are retained, and the summary, password, date and other data are reduced.
 * The conditions for navigation page must be records
 * @param {*} param0
 */
export function getRecordListForLeftSideBar({ allPages }) {
  const allNavPages = getExcludeMenuPages({ arr: allPages });
  return allNavPages.map((item) => generateLeftSideBarItem(item));
}

export function getFilteredArrayByProperty(arr, propertyName, index) {
  const copy = arr.slice();

  const newArr = copy.filter((item) => {
    return item && item[propertyName] && item[propertyName].includes(index);
  });
  return newArr;
}

export function getExcludeMenuPages({
  arr,
  type,
}: {
  arr: any[];
  type?: string;
}) {
  const copy = arr.slice();
  const newArr = copy.filter((page) => {
    const isExcluded = EXCLUDED_PAGE_TYPES.includes(page.type);
    const isPublished = page.status === "Published";
    const isTypeMatch = type ? page.type === type : true;

    return !isExcluded && isPublished && isTypeMatch;
  });
  return newArr;
}

// Return when there is no data
export const generateEmpyRecordData = (pageId) => {
  const empty = {
    notice: null,
    siteInfo: getSiteInfo({}),
    allPages: [
      {
        id: 1,
        title: `Unable to get Notion data，Please check Notion_ID： \n current ${pageId}`,
        summary: " ",
        status: "Published",
        type: "Record",
        slug: "13a171332816461db29d50e9f575b00d",
        date: {
          start_date: "2024-11-24",
          lastEditedDay: "2024-12-10",
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
    oldNav: [],
    customMenu: [],
    recordCount: 1,
    pageIds: [],
    latestRecords: [],
  };
  return empty;
};

export function generateMenuItem(data: NorkiveRecordData) {
  const item: NavItem = {
    icon: data.icon,
    name: data.title,
    show: true,
    slug: data.slug,
    type: data.type,
    title: data.title,
    subMenus: [],
  };
  return item;
}

export function generateLeftSideBarItem(data: NorkiveRecordData) {
  const item: LeftSideBarNavItem = {
    id: data.id,
    title: data.title || "",
    pageCoverThumbnail: data.pageCoverThumbnail || "",
    category: data.category || "",
    tags: data.tags || null,
    summary: data.summary || null,
    slug: data.slug,
    pageIcon: data.pageIcon || "",
    lastEditedDate: data.lastEditedDate,
    type: data.type,
  };
  return item;
}

export function allArchivesWithSort(arr, counterObj, type, dateSort) {
  const filteredArr = arr
    .slice() // Copy-on-Write: 원본 배열 복사
    .map((page) => ({ ...page })) // 내부 post 객체도 얕은 복사
    .filter((page) => {
      if (!page || !page.slug || page.slug.startsWith("http")) {
        return false;
      }

      const isVisible =
        page.status === "Invisible" || page.status === "Published";

      const isTypeMatched = !EXCLUDED_PAGE_TYPES.includes(type)
        ? page.type === type && page.status === "Published"
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
 * Get the list of recommended articles associated with the article, currently filtered based on tag relevance
 * @param post
 * @param {*} allrecords
 * @param {*} count
 * @returns
 */
export function getRecommendPage(
  post: RecommendPage,
  allrecords: RecommendPage[],
  count: number = 6
): RecommendPage[] {
  let RecommendPages: RecommendPage[] = []; // 추천 게시물 배열
  const postIds: string[] = []; // 추천된 게시물 ID 배열
  const currentTags: string[] = post?.tags || []; // 현재 게시물의 태그
  for (let i = 0; i < allrecords.length; i++) {
    const p = allrecords[i];
    // 현재 게시물과 동일한 게시물이거나 타입이 'Post'가 아니면 건너뜀
    if (p.id === post.id || p.type.indexOf("Post") < 0) {
      continue;
    }

    for (let j = 0; j < currentTags.length; j++) {
      const t = currentTags[j];
      // 이미 추천된 게시물인지 확인getAllNotionPageData:
      if (postIds.indexOf(p.id) > -1) {
        continue;
      }
      // 태그가 일치하면 추천 게시물에 추가
      if (p.tags && p.tags.indexOf(t) > -1) {
        RecommendPages.push(p);
        postIds.push(p.id);
      }
    }
  }

  // 추천 게시물 개수를 제한
  if (RecommendPages.length > count) {
    RecommendPages = RecommendPages.slice(0, count);
  }
  return RecommendPages;
}

/**
 * Get articles from page 1 to the specified page number
 * @param pageIndex which page
 * @param list All articles
 * @param pageSize Number of articles per page
 * @returns {*}
 */
export const getListByPage = function (list, pageIndex, pageSize) {
  return list.slice(0, pageIndex * pageSize);
};

export function getAllPageIds(
  collectionQuery: { [collectionId: string]: { [viewId: string]: unknown } },
  collectionId: string,
  collectionView: unknown,
  viewIds: string[]
) {
  if (!collectionQuery && !collectionView) {
    return [];
  }
  // Sort by first view first
  let pageIds: string[] = [];
  try {
    if (viewIds && viewIds.length > 0) {
      const ids = (
        collectionQuery[collectionId]?.[viewIds[0]] as CollectionQueryResultView
      ).collection_group_results?.blockIds;
      if (ids) {
        for (const id of ids) {
          pageIds.push(id);
        }
      }
    }
  } catch (error) {}

  // Otherwise, according to the original sorting of the database
  if (
    pageIds.length === 0 &&
    collectionQuery &&
    Object.values(collectionQuery).length > 0
  ) {
    const pageSet = new Set<string>();
    Object.values(collectionQuery[collectionId] || {}).forEach((view) => {
      const v = view as CollectionQueryResultView; //타입 단언
      v?.blockIds?.forEach((id) => pageSet.add(id)); // group view
      v?.collection_group_results?.blockIds?.forEach((id) => pageSet.add(id)); // table view
    });
    pageIds = [...pageSet];
  }
  return pageIds;
}

export function getArchiveRecords(dateSort, props) {
  let result = props.records;
  if (dateSort === true) {
    const recordsSortByDate = getSortedPostObject(props.records);
    const archiveRecords = getrecordsGroupByDate(recordsSortByDate);
    result = archiveRecords;
  }
  return result;
}

export function isDatabase(rawMetadata, uuidedRootPageId) {
  if (
    rawMetadata?.type !== "collection_view_page" &&
    rawMetadata?.type !== "collection_view"
  ) {
    console.error(`rootPageId -"${uuidedRootPageId}" is not a database`);
    return false;
  }
  return true;
}
