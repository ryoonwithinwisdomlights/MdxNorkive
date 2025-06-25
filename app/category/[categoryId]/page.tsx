import AllRecordsPostListPage from "@/modules/blog/records/AllRecordsPostListPage";
import { TotalPageParams } from "@/types";
import { getCategoryAndTagByPageId } from "@/lib/data/notion/getNotionData";
import ErrorComponent from "@/modules/shared/ErrorComponent";

export async function generateStaticParams() {
  const records = [
    { categoryId: "tailwindcss" },
    { categoryId: "another-category" },
  ];
  return records.map((record) => ({
    categoryId: record.categoryId,
  }));
}

export default async function Page({ params, searchParams }: TotalPageParams) {
  const { categoryId } = await params;
  const { pagenum } = await searchParams;
  const decodedCategoryId = decodeURIComponent(categoryId);

  if (!categoryId) {
    <ErrorComponent />;
  }
  const props = await getCategoryAndTagByPageId(
    decodedCategoryId,
    "category",
    pagenum
  );

  return (
    <AllRecordsPostListPage
      pagenum={pagenum !== undefined ? pagenum : 1}
      postCount={props.postCount}
      posts={props.posts}
    />
  );
}
