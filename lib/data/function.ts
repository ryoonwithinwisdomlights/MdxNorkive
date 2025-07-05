import { BLOG } from "@/blog.config";
import {
  ARCHIVE_PROPERTIES_STATUS_MAP,
  ARCHIVE_PROPERTIES_TYPE_MAP,
  AVAILABLE_PAGE_TYPES,
  EXCLUDED_PAGE_TYPES,
  GENERAL_TYPE_MENU,
  INCLUDED_MENU_TYPES,
  PAGE_TYPE_MENU,
} from "@/constants/menu.constants";
import { getOldsiteConfig } from "@/lib/utils/get-config-value";
import {
  convertUrlStartWithOneSlash,
  deepClone,
  formatDate,
  getLastSegmentFromUrl,
  isStartWithHttp,
} from "@/lib/utils/utils";
import {
  BlockEntriesItem,
  CategoryItem,
  CollectionQueryResultView,
  FlterBlockType,
  LeftSideBarNavItem,
  NavItem,
  BaseArchivePageBlock,
  OldNavItem,
  RecommendPage,
  TagItem,
} from "@/types";
import { SiteInfoModel } from "@/types/siteconfig.model";
import md5 from "js-md5";
import { CollectionPropertySchemaMap } from "notion-types";
import { defaultMapImageUrl, getPageTableOfContents } from "notion-utils";
import {
  compressImage,
  extractLangPrefix,
  mapImgUrl,
  setPageGroupedByDate,
  setPageSortedByDate,
} from "./utils";

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
  const allrecords = getAllPagesWithoutMenu({ arr: allPages });
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
  allArchivedPageList,
}: {
  allArchivedPageList: BaseArchivePageBlock[];
}) {
  const menuPages = allArchivedPageList.filter(
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
export function getLatestRecords({ allPages, from, latestpageCount }) {
  const allrecords = getAllPagesWithoutMenu({ arr: allPages });
  const latestRecords = [...allrecords].sort((a, b) => {
    const dateA = new Date(a?.lastEditedDate || a?.publishDate);
    const dateB = new Date(b?.lastEditedDate || b?.publishDate);
    return dateB.getTime() - dateA.getTime();
  });

  return latestRecords.slice(0, latestpageCount);
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
}): SiteInfoModel {
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
 * Get a reduced list of archives for navigation
 * Used in the gitbook theme, only the title, classification, label and classification information
of the archives are retained, and the summary, password, date and other data are reduced.
 * The conditions for navigation page must be records
 * @param {*} param0
 */
export function getRecordListForLeftSideBar({ allPages }) {
  const allNavPages = getAllPagesWithoutMenu({ arr: allPages });
  // return allNavPages.map((item) => generateLeftSideBarItem(item));
  return allNavPages.map((item) => item);
}

export function getFilteredArrayByProperty(arr, propertyName, index) {
  const copy = arr.slice();

  const newArr = copy.filter((item) => {
    return item && item[propertyName] && item[propertyName].includes(index);
  });
  return newArr;
}

export const isAbleRecordPage = (page) => {
  return AVAILABLE_PAGE_TYPES.includes(page?.type);
};
export const isNotMenuPage = (page) => EXCLUDED_PAGE_TYPES.includes(page.type);
export const isPublished = (page) => page.status === "Published";
export const isTypeMatch = (page, type) => {
  if (type) {
    return page.type === type;
  } else {
    return true;
  }
};

export function getPageWithOutMenu(page, type) {
  return isAbleRecordPage(page) && isPublished(page) && isTypeMatch(page, type);
}

export function getAllPagesWithoutMenu({
  arr,
  type,
}: {
  arr: any[];
  type?: string;
}) {
  return getCopiedArrayWithFunction({
    arr: arr,
    func: (arr) => {
      return arr.filter((item) => getPageWithOutMenu(item, type));
    },
  });
}
export function getCopiedArrayWithFunction({
  arr,
  func,
}: {
  arr: any[];
  func: Function;
}) {
  const copy = arr.slice();
  const newArr = func(copy);

  return newArr;
}

export const generateEmptyRecordData = () => {
  return {
    id: "21f1eb5c-0337-80ba-b3df-c71cca861aab",
    date: [],
    type: "Record",
    category: "TIL",
    people: [],
    sub_type: [],
    tags: [],
    title: "[TIL] www",
    status: "Published",
    comment: "",
    publishDate: 1750982400000,
    publishDay: "Jun 27, 2025",
    lastEditedDate: "2025-06-28T18:37:36.409Z",
    lastEditedDay: "Jun 29, 2025",
    fullWidth: false,
    pageIcon: "👩‍💻",
    pageCover:
      "https://images.unsplash.com/photo-1593062096033-9a26b09da705?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&t=21f1eb5c-0337-80ba-b3df-c71cca861aab",
    pageCoverThumbnail:
      "https://images.unsplash.com/photo-1593062096033-9a26b09da705?ixlib=rb-4.0.3&q=50&fm=webp&crop=entropy&cs=srgb&t=21f1eb5c-0337-80ba-b3df-c71cca861aab&width=800&fmt=webp",
    tagItems: [],
    slug: "archive/21f1eb5c-0337-80ba-b3df-c71cca861aab",
    password: "",
  };
};

// Return when there is no data
export const generateEmptyGloabalData = (pageId) => {
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
    pageCount: 1,
    pageIds: [],
    latestRecords: [],
  };
  return empty;
};

export function generateMenuItem(data: BaseArchivePageBlock) {
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

export function generateLeftSideBarItem(data: BaseArchivePageBlock) {
  const item: LeftSideBarNavItem = {
    id: data.id,
    title: data.title || "",
    pageCoverThumbnail: data.pageCoverThumbnail || "",
    category: data.category || "",
    tags: data.tags || null,
    summary: data.summary || null,
    slug: data.slug,
    pageIcon: data.pageIcon || "",
    date: data.date,
    lastEditedDate: formatDate(data.lastEditedDate, BLOG.LANG),
    type: data.type,
  };
  return item;
}

export function processingAllPagesWithTypeAndSort(
  arr,
  counterObj,
  type,
  dateSort
) {
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
 * Get the list of recommended Archives associated with the Archive, currently filtered based on tag relevance
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

// export function getAllRecords(allRecords, pageId): RecordPagingData {
//   const record = allRecords.find((item) => item.id === pageId);
//   return record;
// }

export function setAllPagesGetSortedGroupedByDate(dateSort, props) {
  let result = props.allArchivedPageList;
  if (dateSort === true) {
    const pageSortedByDate = setPageSortedByDate(props.allArchivedPageList);
    const pageGroupedByDate = setPageGroupedByDate(pageSortedByDate);
    result = pageGroupedByDate;
  }
  return result;
}

/**
 * Mapping user-defined headers
 */
export function mapProperties(
  properties: Partial<BaseArchivePageBlock> & { [key: string]: any }
) {
  if (properties?.type && ARCHIVE_PROPERTIES_TYPE_MAP[properties.type]) {
    properties.type = ARCHIVE_PROPERTIES_TYPE_MAP[properties.type];
  }

  if (properties?.status && ARCHIVE_PROPERTIES_STATUS_MAP[properties.status]) {
    properties.status = ARCHIVE_PROPERTIES_STATUS_MAP[properties.status];
  }
}

/**
 * Filter and process page data
 * The filtering process will use the configuration in NOTION_CONFIG
 */
export function adjustPageProperties(properties, NOTION_CONFIG) {
  // handle URL
  // 1. Convert the slug according to the URL_PREFIX configured by the user
  // 2. Add an href field to the achive to store the final adjusted path
  if (properties.type === "Record") {
    if (
      getOldsiteConfig({
        key: BLOG.RECORD_URL_PREFIX as string,
        defaultVal: "",
        extendConfig: NOTION_CONFIG,
      })
    ) {
      properties.slug = generateCustomizeUrlWithType({
        pageProperties: properties,
        type: "",
        extendConfig: NOTION_CONFIG,
      });
    }
    properties.href = properties.slug ?? properties.id;
  } else if (PAGE_TYPE_MENU.includes(properties.type)) {
    properties.slug = `/intro/${properties.id}`;
  } else if (GENERAL_TYPE_MENU.includes(properties.type)) {
    // The menu path is empty and used as an expandable menu.
    properties.href = properties.slug ?? "#";
    properties.name = properties.title ?? "";
  }

  // Anything starting with http or https is considered an external link
  if (isStartWithHttp(properties?.href)) {
    properties.href = properties?.slug;
    properties.target = "_blank";
  } else {
    properties.target = "_self";
    // Pseudo-static path splicing on the right side.html

    if (
      getOldsiteConfig({
        key: "PSEUDO_STATIC",
        defaultVal: false,
        extendConfig: NOTION_CONFIG,
      })
    ) {
      if (
        !properties?.href?.endsWith(".html") &&
        properties?.href !== "" &&
        properties?.href !== "#" &&
        properties?.href !== "/"
      ) {
        properties.href += ".html";
      }
    }

    // Convert the path to an absolute path: Splice the left side of the url /
    properties.href = convertUrlStartWithOneSlash(properties?.href);
  }

  // If the jump link is multi-lingual, it will open in a new window
  if ((BLOG.NOTION_DATABASE_ID as string).indexOf(",") > 0) {
    const siteIds = (BLOG.NOTION_DATABASE_ID as string).split(",");
    for (let index = 0; index < siteIds.length; index++) {
      const siteId = siteIds[index];
      const prefix = extractLangPrefix(siteId);
      if (getLastSegmentFromUrl(properties.href) === prefix) {
        properties.target = "_blank";
      }
    }
  }

  // Password field md5
  properties.password = properties.password
    ? md5(properties.slug + properties.password)
    : "";
}

/**
 * Get custom URL
 * URLs can be generated based on variables
 * support: %year%/%month%/%day%/%slug%
 * @param {*} pageProperties
 * @returns
 */
export function generateCustomizeUrlWithType({
  pageProperties,
  type,
  extendConfig,
}: {
  pageProperties: Partial<BaseArchivePageBlock> & { [key: string]: any };
  type: string;
  extendConfig?: {};
}) {
  let fullPrefix = "";
  const allSlugPatterns = BLOG.RECORD_URL_PREFIX.split("/");

  allSlugPatterns.forEach((pattern, idx) => {
    if (pattern === "%year%" && pageProperties?.publishDay) {
      const formatPostCreatedDate = new Date(pageProperties?.publishDay);
      fullPrefix += formatPostCreatedDate.getUTCFullYear();
    } else if (pattern === "%month%" && pageProperties?.publishDay) {
      const formatPostCreatedDate = new Date(pageProperties?.publishDay);
      fullPrefix += String(formatPostCreatedDate.getUTCMonth() + 1).padStart(
        2,
        "0"
      );
    } else if (pattern === "%day%" && pageProperties?.publishDay) {
      const formatPostCreatedDate = new Date(pageProperties?.publishDay);
      fullPrefix += String(formatPostCreatedDate.getUTCDate()).padStart(2, "0");
    } else if (pattern === "%slug%") {
      fullPrefix += pageProperties.slug ?? pageProperties.id;
    } else if (!pattern.includes("%")) {
      fullPrefix += pattern;
    } else {
      return;
    }
    if (idx !== allSlugPatterns.length - 1) {
      fullPrefix += "/";
    }
  });
  if (fullPrefix.startsWith("/")) {
    fullPrefix = fullPrefix.substring(1); // head removed('/')
  }
  if (fullPrefix.endsWith("/")) {
    fullPrefix = fullPrefix.substring(0, fullPrefix.length - 1); // Remove the tail "/"
  }

  let res;

  if (type === "Record") {
    res = `${BLOG.RECORD_URL_PREFIX.toLowerCase()}/${pageProperties.id}`;
  } else if (type == "Project" || "Engineering") {
    res = `${type.toLowerCase()}/${pageProperties.id}`;
  } else {
    res = `${fullPrefix.toLowerCase()}/${type.toLowerCase()}/${
      pageProperties.id
    }`;
  }

  return res;
}

export const handleRecordsUrl = (isAblePage, properties) => {
  if (isAblePage) {
    const customedUrl = generateCustomizeUrlWithType({
      pageProperties: properties,
      type: properties.type,
    });

    properties.slug = BLOG.RECORD_URL_PREFIX
      ? customedUrl
      : (properties.slug ?? properties.id);
  } else if (PAGE_TYPE_MENU.includes(properties.type)) {
    properties.slug = `/intro/${properties.id}`;
  } else if (GENERAL_TYPE_MENU.includes(properties.type)) {
    // The menu path is empty and used as an expandable menu.
    properties.to = properties.slug ?? "#";
    properties.name = properties.title ?? "";
  }

  // Enable pseudo-static path
  if (JSON.parse(BLOG.PSEUDO_STATIC as string)) {
    if (
      !properties?.slug?.endsWith(".html") &&
      !properties?.slug?.startsWith("http")
    ) {
      properties.slug += ".html";
    }
  }
  properties.password = properties.password
    ? md5(properties.slug + properties.password)
    : "";
  // return properties;
};

/**
 *
 * Special processing of the obtained page BLOCK
 * 1. Delete redundant fields
 * 2. For example, format files, videos, audios, and URLs
 * 3. Compatibility with code blocks and other elements
 * @param {*} id Page ID
 * @param {*} pageBlock page elements
 * @param {*} slice interception quantity
 * @returns
 */
export function filterPostBlocks(id, pageBlock) {
  const newPageBlock = deepClone(pageBlock);
  const newKeys = Object.keys(newPageBlock.block); //   entries<T>(o: { [s: string]: BlockType; } | ArrayLike<T>): [string, T][];
  const blockEntries: BlockEntriesItem[] = Object.entries(newPageBlock?.block);

  const languageMap = new Map([
    ["C++", "cpp"],
    ["C#", "csharp"],
    ["Assembly", "asm6502"],
  ]);

  const handleSyncBlock = (
    blockId: string,
    b: FlterBlockType,
    index: number
  ) => {
    if (!b.value?.children) return;
    b.value.children.forEach((childBlock, childIndex) => {
      const newBlockId = `${blockId}_child_${childIndex}`;
      newPageBlock.block[newBlockId] = childBlock;
      newKeys.splice(index + childIndex + 1, 0, newBlockId);
    });
    delete newPageBlock.block[blockId];
  };

  const mapCodeLanguage = (b: FlterBlockType) => {
    if (!b.value?.properties) return;
    const lang = b.value.properties?.language?.[0]?.[0];
    if (lang && languageMap.has(lang)) {
      // b.value.properties.language[0][0] = languageMap.get(lang);
      if (b.value?.properties?.language?.[0]?.[0]) {
        b.value.properties.language[0][0] = languageMap.get(lang)!;
      }
    }
  };

  //Loop through each block of the document
  if (blockEntries) {
    blockEntries.forEach(([blockId, block]: BlockEntriesItem, index) => {
      const b = block;
      if (b?.value) {
        // Remove when BlockId is equal to PageId
        if (b?.value?.id === id) {
          //This block contains sensitive information
          delete b?.value?.properties;
          return;
        }

        // sync_block => 하위 블록으로 교체
        if (
          b?.value?.type === "sync_block" &&
          Array.isArray(b.value.children)
        ) {
          handleSyncBlock(blockId, b, index);
          return;
        }
        // 코드블록 언어 이름 매핑
        if (b?.value?.type === "code") {
          mapCodeLanguage(b);
        }

        // 파일/미디어 링크 변환
        if (
          ["file", "pdf", "video", "audio"].includes(b?.value?.type) &&
          b.value.properties?.source?.[0]?.[0]?.includes("amazonaws.com")
        ) {
          const oldUrl = b.value.properties.source[0][0];
          b.value.properties.source[0][0] = `https://notion.so/signed/${encodeURIComponent(oldUrl)}?table=block&id=${b.value.id}`;
        }
      }
    });
  }

  return newPageBlock;
}

export function setPageTableOfContentsByRecord(props) {
  if (props?.page?.blockMap?.block) {
    console.log();
    props.page.content = Object.keys(props?.page.blockMap.block).filter(
      (key) =>
        props?.page.blockMap.block[key]?.value?.parent_id === props?.page.id
    );
    props.page.tableOfContents = getPageTableOfContents(
      props?.page,
      props?.page.blockMap
    );
  } else {
    props.page.tableOfContents = [];
  }
}
