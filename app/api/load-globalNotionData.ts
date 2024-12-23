import { BLOG } from "@/blog.config";
import { getPostBlocks } from "@/lib/notion/getPostBlocks";
import { getGlobalData, getGlobalPageIdData } from "@/lib/notion/getNotionData";

export default async function loadGlobalNotionData(from: string = "index") {
  const props = await getGlobalData({ from: from });

  props.posts = props.allPages?.filter(
    (page) =>
      page.type !== "CONFIG" &&
      page.type !== "Menu" &&
      page.type !== "SubMenu" &&
      page.type !== "SubMenuPage" &&
      page.type !== "Notice" &&
      page.type !== "Page" &&
      page.status === "Published"
  );

  // Handle pagination
  if (BLOG.RECORD_LIST_STYLE === "scroll") {
    // The scrolling list returns all data to the front end by default
  } else if (BLOG.RECORD_LIST_STYLE === "page") {
    props.posts = props.posts?.slice(0, BLOG.RECORDS_PER_PAGE);
  }

  // Preview article content
  if (BLOG.RECORD_LIST_PREVIEW === "true") {
    for (const i in props.posts) {
      const post = props.posts[i];
      if (post.password && post.password !== "") {
        continue;
      }
      post.blockMap = await getPostBlocks(
        post.id,
        "slug",
        BLOG.RECORD_PREVIEW_LINES
      );
    }
  }
  props.allPosts = props.posts;
  delete props.allPages;

  return props;
}

export async function loadGlobalNotionPageIdData(from: string = "index") {
  const props = await getGlobalPageIdData({ from: from });

  props.allPageIds = props.collectionData;
  // Preview article content
  if (BLOG.RECORD_LIST_PREVIEW === "true") {
    for (const i in props.posts) {
      const post = props.posts[i];
      post.blockMap = await getPostBlocks(
        post.id,
        "slug",
        BLOG.RECORD_PREVIEW_LINES
      );
    }
  }

  delete props.collectionData;

  return props;
}
