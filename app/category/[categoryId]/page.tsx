import { BLOG } from "@/blog.config";
import AllRecordsPostListPage from "@/components/records/AllRecordsPostListPage";
import { getGlobalData } from "@/lib/notion/getNotionData";
import React from "react";

export async function generateStaticParams() {
  // 예제 데이터 - 실제로는 API 호출 등을 통해 데이터를 가져올 수 있음
  const records = [
    { categoryId: "tailwindcss" },
    { categoryId: "another-category" },
  ];
  return records.map((record) => ({
    categoryId: record.categoryId,
  }));
}

export default async function Page({ params }) {
  const { categoryId } = await params;
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
  // Handle pagination
  if (BLOG.POST_LIST_STYLE === "scroll") {
    // Scroll list returns all data to the front end
  } else if (BLOG.POST_LIST_STYLE === "page") {
    props.posts = props.posts?.slice(0, BLOG.POSTS_PER_PAGE);
  }
  delete props.allPages;
  return (
    <AllRecordsPostListPage postCount={props.postCount} posts={props.posts} />
  );
}
