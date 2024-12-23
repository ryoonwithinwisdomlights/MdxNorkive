import AllRecordsPostListPage from "@/components/records/AllRecordsPostListPage";
import { TotalPageParams } from "@/lib/models";
import { generatingCategoryAndTagPageByTypeAndId } from "@/lib/notion/getNotionData";

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

  const props = await generatingCategoryAndTagPageByTypeAndId(
    categoryId,
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
