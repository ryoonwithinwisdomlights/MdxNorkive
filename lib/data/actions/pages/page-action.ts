import { BLOG } from "@/blog.config";
import { PageBlockDataProps } from "@/types";
import { getGlobalData } from "@/lib/data/actions/notion/getNotionData";
import { getPostBlocks } from "@/lib/data/service/getPostBlocks";
import {
  getExcludeMenuPages,
  getFilteredArrayByProperty,
  getRecommendPage,
  getArchiveRecords,
} from "@/lib/data/service/notion-service";

/**
 *
 * 2024.12.23 added for app router's [id] page.
 * @param {*} paramId
 * @param {*} type
 * @returns
 */
export async function getPageProps({ pageId, from, type }: PageBlockDataProps) {
  const props = await getGlobalData({
    type: type,
    pageId: BLOG.NOTION_DATABASE_ID as string,
    from: from,
  });

  // Find article in list
  props.post = props?.allPages?.find((item) => {
    return item.id === pageId;
  });
  return props;
}

export async function getPageByPageIdAndType(props, recordType) {
  // Article content loading
  if (!props?.posts?.blockMap) {
    props.post.blockMap = await getPostBlocks({
      pageId: props.post.id,
      from: recordType,
    });
  }

  // if (recordType !== "SubMenuPage") {
  // Recommended related article processing
  const allRecords = getExcludeMenuPages({
    arr: props?.allPages,
    type: recordType,
  });

  if (allRecords && allRecords.length > 0) {
    const index = allRecords.indexOf(props.post);
    props.prev =
      allRecords.slice(index - 1, index)[0] ?? allRecords.slice(-1)[0];
    props.next = allRecords.slice(index + 1, index + 2)[0] ?? allRecords[0];
    props.recommendRecords = getRecommendPage(
      props.post,
      allRecords,
      Number(BLOG.archive_recommend_count)
    );
  } else {
    props.prev = null;
    props.next = null;
    props.recommendRecords = [];
  }
  // }

  return props;
}

export async function getCategoryAndTagByPageId(
  decodedPropertyId,
  pageProperty,
  pagenum
) {
  const props = await getGlobalData({
    pageId: BLOG.NOTION_DATABASE_ID as string,
    from: `${pageProperty}-props`,
  });

  props.posts = getFilteredArrayByProperty(
    props.posts,
    pageProperty,
    decodedPropertyId
  );
  // Process article page count
  props.postCount = props.posts.length;
  const POSTS_PER_PAGE = BLOG.archive_per_page;

  // Handle pagination

  props.posts =
    pagenum !== undefined
      ? props.posts.slice(
          POSTS_PER_PAGE * (pagenum - 1),
          POSTS_PER_PAGE * pagenum
        )
      : props.posts?.slice(0, POSTS_PER_PAGE);

  delete props.allPages;

  return props;
}

export async function getNotionRecordsByType({
  from = "records",
  type,
  dateSort = true,
}: {
  from: string;
  type?: string;
  dateSort?: boolean;
}) {
  const props = await getGlobalData({
    pageId: BLOG.NOTION_DATABASE_ID as string,
    type: type,
  });
  const archiveRecords = getArchiveRecords(dateSort, props);
  props.archiveRecords = archiveRecords;
  delete props.allPages;
  return { props };
}
