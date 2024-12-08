import { BLOG } from "@/blog.config";
import { getPostBlocks } from "@/lib/notion/notion";
import { getGlobalData } from "@/lib/notion/getNotionData";

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
  if (BLOG.POST_LIST_STYLE === "scroll") {
    // The scrolling list returns all data to the front end by default
  } else if (BLOG.POST_LIST_STYLE === "page") {
    props.posts = props.posts?.slice(0, BLOG.POSTS_PER_PAGE);
  }

  // Preview article content
  if (BLOG.POST_LIST_PREVIEW === "true") {
    for (const i in props.posts) {
      const post = props.posts[i];
      if (post.password && post.password !== "") {
        continue;
      }
      post.blockMap = await getPostBlocks(
        post.id,
        "slug",
        BLOG.POST_PREVIEW_LINES
      );
    }
  }

  delete props.allPages;

  return props;
}
