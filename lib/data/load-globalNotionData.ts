import { BLOG } from "@/blog.config";
import { getGlobalData } from "@/lib/data/notion/getNotionData";
import { getPostBlocks } from "@/lib/data/notion/getPostBlocks";
import { testGetPP } from "./notion/typescript/notion-api";

export default async function loadGlobalNotionData(from: string = "index") {
  const testee = await testGetPP(BLOG.NOTION_PAGE_ID as string);
  console.log("testee:", testee);
  const props = await getGlobalData({
    rootPageId: BLOG.NOTION_PAGE_ID,
    from: "main",
  });

  if (BLOG.RECORD_LIST_STYLE === "page") {
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
  delete props.allPages;
  props.allPosts = props.posts;

  return props;
}
