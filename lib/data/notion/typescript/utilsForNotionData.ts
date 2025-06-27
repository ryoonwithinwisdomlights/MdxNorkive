import { BLOG } from "@/blog.config";
import { deepClone } from "@/lib/utils/utils";
import {
  CategoryItem,
  CollectionData,
  LeftSideBarNavItem,
  NavItem,
  TagItem,
} from "@/types";
import { GetSiteInfo } from "@/types/getnotion.func.model";
import { CollectionPropertySchemaMap } from "notion-types";
import { defaultMapImageUrl } from "notion-utils";
import { compressImage, mapImgUrl } from "./mapImage";
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

export function getOldNav({ allPages }) {
  const oldNav: NavItem[] = [];
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
  collectionData,
}: {
  collectionData: CollectionData[];
}) {
  const menuPages = collectionData.filter(
    (post) =>
      post.status === "Published" &&
      (post?.type === "Menu" || post?.type === "SubMenu")
  );
  const menus: NavItem[] = [];
  if (menuPages && menuPages.length > 0) {
    menuPages.forEach((e) => {
      const menuItem = generateMenu(e);
      if (e.type === "Menu") {
        menus.push(menuItem);
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

export function generateMenu(data: CollectionData) {
  const tempMenuItem: NavItem = {
    icon: data.icon,
    name: data.title,
    show: true,
    slug: data.slug,
    type: data.type,
    title: data.title,
    subMenus: [],
  };
  return tempMenuItem;
}

/**
 * Get the latest articles and sort them in descending order
 * according to the last modified time
 * @param {*}} param0
 * @returns
 */
export function getLatestPosts({ allPages, from, latestPostCount }) {
  const allPosts = allPages?.filter(
    (page) =>
      page.type !== "CONFIG" &&
      page.type !== "Menu" &&
      page.type !== "SubMenu" &&
      page.type !== "SubMenuPage" &&
      page.type !== "Notice" &&
      page.type !== "Page" &&
      page.status === "Published"
  );
  const latestPosts = [...allPosts].sort((a, b) => {
    const dateA = new Date(a?.lastEditedDate || a?.publishDate);
    const dateB = new Date(b?.lastEditedDate || b?.publishDate);
    return dateB.getTime() - dateA.getTime();
  });

  return latestPosts.slice(0, latestPostCount);
}

/**
 * Site Information
 * @param notionPageData
 * @param from
 * @returns {Promise<{title,description,pageCover,icon}>}
 */
export function getSiteInfo({ collection, block }: GetSiteInfo) {
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

  // Compress all category user avatars
  let icon = compressImage(
    collection?.icon
      ? mapImgUrl(collection?.icon, collection, "collection")
      : defaultIcon
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

export function generateLeftSideBarNavItem(data: CollectionData) {
  const tempMenuItem: LeftSideBarNavItem = {
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
  return tempMenuItem;
}

/**
 * Get a reduced list of articles for navigation
 * Used in the gitbook theme, only the title, classification, label and classification information
of the article are retained, and the summary, password, date and other data are reduced.
 * The conditions for navigation page must be Posts
 * @param {*} param0
 */
export function getNavPagesForLeftSideBar({ allPages }) {
  const allNavPages = excludingMenuPages({ arr: allPages });
  return allNavPages.map((item) => generateLeftSideBarNavItem(item));
}

export function dbDeepClone(data) {
  const db = deepClone(data);

  delete db.block;
  delete db.schema;
  delete db.rawMetadata;
  delete db.pageIds;
  delete db.viewIds;
  delete db.collection;
  delete db.collectionQuery;
  delete db.collectionId;
  delete db.collectionView;
  // Sensitive data not returned
  return db;
}

export function excludingMenuPages({
  arr,
  type,
}: {
  arr: any[];
  type?: string;
}) {
  const copy = arr.slice();
  const newArr = copy.filter((page) => {
    const excludedTypes = [
      "CONFIG",
      "Menu",
      "SubMenu",
      "SubMenuPage",
      "Notice",
      "Page",
    ];
    const isExcluded = excludedTypes.includes(page.type);
    const isPublished = page.status === "Published";
    const isTypeMatch = type ? page.type === type : true;

    return !isExcluded && isPublished && isTypeMatch;
  });
  return newArr;
}
export function getFilteredArrayWithPropertyAndIndex(arr, propertyName, index) {
  const copy = arr.slice();
  const newArr = copy.filter((item) => {
    return item && item[propertyName] && item[propertyName].includes(index);
  });
  return newArr;
}

// function createEmptyCollectionData(id: string): CollectionData {
//   return {
//     id,
//     title: "",
//     type: "",
//     status: "",
//     slug: "",
//     date: undefined,
//   };
// }
// Return when there is no data
export const EmptyData = (pageId) => {
  const empty = {
    notice: null,
    siteInfo: getSiteInfo({}),
    allPages: [
      {
        id: 1,
        title: `Unable to get Notion data，Please check Notion_ID： \n current ${pageId}`,
        summary: " ",
        status: "Published",
        type: "Post",
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
    postCount: 1,
    pageIds: [],
    latestPosts: [],
  };
  return empty;
};
