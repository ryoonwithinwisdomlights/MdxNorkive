import { BLOG } from "@/blog.config";
import { idToUuid } from "notion-utils";
import { MapPageUrlFn } from "react-notion-x";
import formatDate from "@/lib/utils/formatDate";
import { getPage } from "./getPostBlocks";

/**
 * Get content based on page ID
 * @param {*} pageId
 * @returns
 */
export async function getPost(pageId) {
  const blockMap = await getPage(pageId, "slug");
  if (!blockMap) {
    return null;
  }
  // console.log("blockMap?.block?", blockMap?.block);
  const postInfo = blockMap?.block?.[pageId].value;
  console.log("postInf::", postInfo);
  return {
    id: pageId,
    type: postInfo,
    category: "",
    tags: [],
    title: postInfo?.properties?.title?.[0],
    status: "Published",
    createdTime: formatDate(
      new Date(postInfo.created_time).toString(),
      BLOG.LANG
    ),
    lastEditedDay: formatDate(
      new Date(postInfo?.last_edited_time).toString(),
      BLOG.LANG
    ),
    fullWidth: postInfo?.fullWidth || false,
    page_cover: getPageCover(postInfo) || BLOG.HOME_BANNER_IMAGE,
    date: {
      start_date: formatDate(
        new Date(postInfo?.last_edited_time).toString(),
        BLOG.LANG
      ),
    },
    blockMap,
  };
}

function getPageCover(postInfo) {
  const pageCover = postInfo.format?.page_cover;
  if (pageCover) {
    if (pageCover.startsWith("/")) return BLOG.NOTION_HOST + pageCover;
    if (pageCover.startsWith("http")) return MapImageUrlFn(pageCover, postInfo);
  }
}
