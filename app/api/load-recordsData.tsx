import { formatDateFmt } from "@/lib/formatDate";
import { getGlobalData } from "@/lib/notion/getNotionData";

export async function getStaticPropsForRecords({
  from = "index",
}: {
  from: string;
}) {
  // console.log("getStaticPropsForRecords-from", from);
  const props = await getGlobalData({ from: `${from}-index` });
  // Handle pagination
  props.posts = props.allPages?.filter(
    (page) =>
      page.type !== "CONFIG" &&
      page.type !== "Menu" &&
      page.type !== "SubMenu" &&
      page.type !== "Notice" &&
      page.type !== "Page" &&
      page.status === "Published"
  );
  delete props.allPages;

  const postsSortByDate = Object.create(props.posts);

  postsSortByDate.sort((a, b) => {
    return b?.publishDate - a?.publishDate;
  });

  const archivePosts = {};

  postsSortByDate.forEach((post) => {
    const date = formatDateFmt(post.publishDate, "yyyy-MM");
    if (date !== "2012-12" && date !== "2013-12" && date !== "2015-07") {
      if (archivePosts[date]) {
        archivePosts[date].push(post);
      } else {
        archivePosts[date] = [post];
      }
    }
  });

  props.archivePosts = archivePosts;
  delete props.allPages;

  return { props };
}

export async function getStaticPropsForRecordsByDir({
  from = "archive",
}: {
  from: string;
}) {
  // console.log("getStaticPropsForRecords-from", from);
  const props = await getGlobalData({ from: `${from}-index` });
  // Handle pagination
  props.posts = props.allPages?.filter(
    (page) =>
      page.type !== "CONFIG" &&
      page.type !== "Menu" &&
      page.type !== "SubMenu" &&
      page.type !== "Notice" &&
      page.type !== "Page" &&
      page.status === "Published"
  );
  delete props.allPages;

  const postsSortByDate = Object.create(props.posts);

  postsSortByDate.sort((a, b) => {
    return b?.publishDate - a?.publishDate;
  });

  const archivePosts = {};

  postsSortByDate.forEach((post) => {
    const date = formatDateFmt(post.publishDate, "yyyy-MM");
    if (date !== "2012-12" && date !== "2013-12" && date !== "2015-07") {
      if (archivePosts[date]) {
        archivePosts[date].push(post);
      } else {
        archivePosts[date] = [post];
      }
    }
  });

  props.archivePosts = archivePosts;
  delete props.allPages;

  return { props };
}
