import { getPageId } from "@/app/api/route";
import { BLOG } from "@/blog.config";
import AllRecordsPostListPage from "@/components/records/AllRecordsPostListPage";
import { getGlobalData } from "@/lib/notion/getNotionData";

export async function generateStaticParams() {
  const records = [{ tagId: "기술로그" }, { tagId: "another-Tags" }];
  return records.map((record) => ({
    tagId: record.tagId,
  }));
}

// After
type Params = Promise<{ tagId: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page({ params, searchParams }) {
  const { tagId } = await params;
  const { pagenum } = await searchParams;

  const decodedTagId = decodeURIComponent(tagId);
  // console.log("decodedTagId:", decodedTagId);
  // console.log("tagId", tagId);
  // console.log("pagenum", pagenum);

  if (!tagId) {
    return <div>Invalid tag</div>;
  }

  const props = await getGlobalData({
    type: "tag-props",
    pageId: BLOG.NOTION_PAGE_ID,
    from: "tag-props",
  });

  props.posts = props.allPages
    ?.filter(
      (page) =>
        page.type !== "CONFIG" &&
        page.type !== "Menu" &&
        page.type !== "SubMenu" &&
        page.type !== "SubMenuPage" &&
        page.type !== "Notice" &&
        page.type !== "Page" &&
        page.status === "Published"
    )
    .filter((post) => {
      return post && post.tags && post.tags.includes(decodedTagId);
    });

  // Process article page count
  props.postCount = props.posts.length;
  const POSTS_PER_PAGE = BLOG.RECORDS_PER_PAGE;
  // Handle pagination

  props.posts =
    pagenum !== undefined
      ? props.posts.slice(
          POSTS_PER_PAGE * (pagenum - 1),
          POSTS_PER_PAGE * pagenum
        )
      : props.posts?.slice(0, BLOG.RECORDS_PER_PAGE);

  props.tag = tagId;
  props.pagenum = pagenum;
  delete props.allPages;

  return (
    <AllRecordsPostListPage
      pagenum={pagenum !== undefined ? pagenum : 1}
      postCount={props.postCount}
      posts={props.posts}
    />
  );
}
