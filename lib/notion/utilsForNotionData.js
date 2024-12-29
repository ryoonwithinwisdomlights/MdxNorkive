import { compressImage, mapImgUrl } from "@/lib/notion/mapImage";
import { BLOG } from "@/blog.config";

export function getPageCover(postInfo) {
  const pageCover = postInfo.format?.page_cover;
  if (pageCover) {
    if (pageCover.startsWith("/")) return BLOG.NOTION_HOST + pageCover;
    if (pageCover.startsWith("http")) return MapImageUrlFn(pageCover, postInfo);
  }
}

/**
 * Get label options
 * @param schema
 * @returns {undefined}
 */
export function getTagOptions(schema) {
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
export function getCategoryOptions(schema) {
  if (!schema) return {};
  const categorySchema = Object.values(schema).find(
    (e) => e.name === BLOG.NOTION_PROPERTY_NAME.category
  );
  return categorySchema?.options || [];
}

export function getCustomNav({ allPages }) {
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

export function getCustomMenu({ collectionData, NOTION_CONFIG }) {
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

  const latestPosts = Object.create(allPosts).sort((a, b) => {
    const dateA = new Date(a?.lastEditedDate || a?.publishDate);
    const dateB = new Date(b?.lastEditedDate || b?.publishDate);
    return dateB - dateA;
  });
  return latestPosts.slice(0, latestPostCount);
}

/**
 * Site Information
 * @param notionPageData
 * @param from
 * @returns {Promise<{title,description,pageCover,icon}>}
 */
export function getSiteInfo({ collection, block, NOTION_CONFIG }) {
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

  // Compress all category user avatars
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
 * Used in the gitbook theme, only the title, classification, label and classification information
of the article are retained, and the summary, password, date and other data are reduced.
 * The conditions for navigation page must be Posts
 * @param {*} param0
 */
export function getNavPagesForGitBook({ allPages }) {
  const allNavPages = allPages?.filter((post) => {
    return (
      post &&
      post?.slug &&
      !post?.slug?.startsWith("http") &&
      post?.type !== "CONFIG" &&
      post?.type !== "Menu" &&
      post?.type !== "SubMenu" &&
      post?.type !== "SubMenuPage" &&
      post?.type !== "Notice" &&
      post?.type !== "Page" &&
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
    pageIcon: item.pageIcon || "",
    lastEditedDate: item.lastEditedDate,
    type: item.type | "",
  }));
}

/**
   * Get a reduced list of articles for navigation
   * Used in the gitbook theme, only the title, classification, label and classification information
  of the article are retained, and the summary, password, date and other data are reduced.
   * The conditions for navigation page must be Posts
   * @param {*} param0
   */
export function getNavPages({ allPages }) {
  const allNavPages = allPages?.filter((post) => {
    return (
      post &&
      post?.slug &&
      !post?.slug?.startsWith("http") &&
      post?.type !== "CONFIG" &&
      post?.type !== "Menu" &&
      post?.type !== "SubMenu" &&
      post?.type !== "SubMenuPage" &&
      post?.type !== "Notice" &&
      post?.type !== "Page" &&
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
    pageIcon: item.pageIcon || "",
    lastEditedDate: item.lastEditedDate,
    type: item.type | "",
  }));
}

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
    customNav: [],
    customMenu: [],
    postCount: 1,
    pageIds: [],
    latestPosts: [],
  };
  return empty;
};
