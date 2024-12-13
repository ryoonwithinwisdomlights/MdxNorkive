import { BLOG } from "@/blog.config";
import { getGlobalData } from "@/lib/notion/getNotionData";
import { formatDateFmt } from "@/lib/utils/formatDate";

export async function getStaticNotionRecordsSortByDirType({
  from = "records",
  type = "Record",
}: {
  from: string;
  type: string;
}) {
  const props = await getGlobalData({
    from: `${from}-index-props`,
    type: type,
  });

  // Handle pagination
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
  delete props.allPages;

  const postsSortByDate = Object.create(props.posts);

  postsSortByDate.sort((a, b) => {
    return b?.publishDate - a?.publishDate;
  });

  const archiveRecords = {};

  postsSortByDate.forEach((post) => {
    const date = formatDateFmt(post.publishDate, "yyyy-MM");
    if (date !== "2012-12" && date !== "2013-12" && date !== "2015-07") {
      if (archiveRecords[date]) {
        archiveRecords[date].push(post);
      } else {
        archiveRecords[date] = [post];
      }
    }
  });

  props.archiveRecords = archiveRecords;
  delete props.allPages;

  return { props };
}

export async function getStaticNotionRecordsSortByDirTypeWithoutDateTitle({
  from = "records",
  type = "Record",
}: {
  from: string;
  type: string;
}) {
  console.log("[get Static Notion Records]\n -from:", from, "\n -type:", type);
  const props = await getGlobalData({
    from: `${from}-index-props`,
    type: type,
  });
  // Handle pagination
  props.posts = props.allPages?.filter((page) => {
    return page.type === type && page.status === "Published";
  });

  props.archiveRecords = props.posts;
  delete props.allPages;

  return { props };
}

export async function getStaticNotionRecordsArticle({
  from = "slug-paths",
  type = "Record",
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

  const props = await getGlobalData({
    from: `${from}-index-props`,
    type: type,
  });
  console.log("type-from:", type);
  // Handle pagination
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
  delete props.allPages;

  const postsSortByDate = Object.create(props.posts);

  postsSortByDate.sort((a, b) => {
    return b?.publishDate - a?.publishDate;
  });

  const archiveRecords = {};

  postsSortByDate.forEach((post) => {
    const date = formatDateFmt(post.publishDate, "yyyy-MM");
    if (date !== "2012-12" && date !== "2013-12" && date !== "2015-07") {
      if (archiveRecords[date]) {
        archiveRecords[date].push(post);
      } else {
        archiveRecords[date] = [post];
      }
    }
  });

  props.archiveRecords = archiveRecords;
  delete props.allPages;

  return { props };
}
