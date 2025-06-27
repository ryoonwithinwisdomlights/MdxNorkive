import { BLOG } from "@/blog.config";
import { getGlobalData } from "./notion/typescript/getNotionData";
// import { getGlobalData } from "@/lib/data/notion/getNotionData";

export default async function loadGlobalNotionData(from: string = "index") {
  const props = await getGlobalData({
    pageId: BLOG.NOTION_DATABASE_ID as string,
    from: "main",
  });

  props.posts = props.posts?.slice(0, BLOG.RECORDS_PER_PAGE);
  // console.log("  console.log(props.allPages)::", props.allPages);
  delete props.allPages;

  props.allPosts = props.posts;

  return props;
}
