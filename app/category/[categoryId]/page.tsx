import { BLOG } from "@/blog.config";
import AllRecordsPostListPage from "@/components/records/AllRecordsPostListPage";
import { getGlobalData } from "@/lib/notion/getNotionData";
import React from "react";

export async function generateStaticParams() {
  const records = [
    { categoryId: "tailwindcss" },
    { categoryId: "another-category" },
  ];
  return records.map((record) => ({
    categoryId: record.categoryId,
  }));
}

export default async function Page({ params, searchParams }) {
  const { categoryId } = await params;
  const { pagenum } = await searchParams;
  const decodedCategoryId = decodeURIComponent(categoryId);
  if (!categoryId) {
    return <div>Invalid category</div>;
  }

  const props = await getGlobalData({
    type: "category-props",
    pageId: BLOG.NOTION_PAGE_ID,
    from: "category-props",
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
      return post && post.category && post.category.includes(decodedCategoryId);
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
      : props.posts?.slice(0, POSTS_PER_PAGE);

  delete props.allPages;
  return (
    <AllRecordsPostListPage
      pagenum={pagenum !== undefined ? pagenum : 1}
      postCount={props.postCount}
      posts={props.posts}
    />
  );
}
