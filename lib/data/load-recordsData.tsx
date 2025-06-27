import { BLOG } from "@/blog.config";
import { getGlobalData } from "@/lib/data/notion/typescript/getNotionData";
import { formatDateFmt } from "@/lib/utils/formatDate";

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

function getArchiveRecords(dateSort, props) {
  let result = props.posts;
  if (dateSort === true) {
    const postsSortByDate = getSortedPostObj(props.posts);
    const archiveRecords = getPostsGroupByDate(postsSortByDate);
    result = archiveRecords;
  }
  return result;
}

function getSortedPostObj(obj) {
  const postsSortByDate = Object.create(obj);

  postsSortByDate.sort((a, b) => {
    return b?.publishDate - a?.publishDate;
  });
  return postsSortByDate;
}

function getPostsGroupByDate(array) {
  const allPosts = {};

  array.forEach((post) => {
    const date = formatDateFmt(post.publishDate, "yyyy-MM");
    if (allPosts[date]) {
      allPosts[date].push(post);
    } else {
      allPosts[date] = [post];
    }
  });
  return allPosts;
}
