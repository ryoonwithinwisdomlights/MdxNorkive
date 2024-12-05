import { BLOG } from "@/blog.config";
import { formatDateFmt } from "@/lib/formatDate";
import { getGlobalData } from "@/lib/notion/getNotionData";

export async function getStaticNotionRecordsSortByDirType({
  from = "archive",
  type = "Post",
}: {
  from: string;
  type: string;
}) {
  // console.log("getStaticPropsForRecords-from", from);
  const props = await getGlobalData({
    from: `${from}-index-props`,
    type: type,
  });
  console.log("type-from:", type);
  // console.log("getStaticPropsForRecords-from", props);
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

  const recordPosts = {};

  postsSortByDate.forEach((post) => {
    const date = formatDateFmt(post.publishDate, "yyyy-MM");
    if (date !== "2012-12" && date !== "2013-12" && date !== "2015-07") {
      if (recordPosts[date]) {
        recordPosts[date].push(post);
      } else {
        recordPosts[date] = [post];
      }
    }
  });

  props.recordPosts = recordPosts;
  delete props.allPages;

  return { props };
}

export async function getStaticNotionRecordsSortByDirTypeWithoutDateTitle({
  from = "archive",
  type = "Post",
}: {
  from: string;
  type: string;
}) {
  // console.log("getStaticPropsForRecords-from", from);
  const props = await getGlobalData({
    from: `${from}-index-props`,
    type: type,
  });
  console.log("type-from:", type);
  // console.log("getStaticPropsForRecords-from", props);
  // Handle pagination
  props.posts = props.allPages?.filter((page) => {
    // if (page.type === 'Sideproject') {
    //   //   console.log(page)
    // }

    return page.type === "Sideproject" && page.status === "Published";
  });
  // const recordPosts = {};

  props.recordPosts = props.posts;
  delete props.allPages;

  return { props };
}

export async function getStaticNotionRecordsArticle({
  from = "slug-paths",
  type = "Post",
}: {
  from: string;
  type: string;
}) {
  if (!BLOG.isProd) {
    return {
      paths: [],
      fallback: true,
    };
  }

  // console.log("getStaticPropsForRecords-from", from);
  const props = await getGlobalData({
    from: `${from}-index-props`,
    type: type,
  });
  console.log("type-from:", type);
  // console.log("getStaticPropsForRecords-from", props);
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

  const recordPosts = {};

  postsSortByDate.forEach((post) => {
    const date = formatDateFmt(post.publishDate, "yyyy-MM");
    if (date !== "2012-12" && date !== "2013-12" && date !== "2015-07") {
      if (recordPosts[date]) {
        recordPosts[date].push(post);
      } else {
        recordPosts[date] = [post];
      }
    }
  });

  props.recordPosts = recordPosts;
  delete props.allPages;

  return { props };
}
