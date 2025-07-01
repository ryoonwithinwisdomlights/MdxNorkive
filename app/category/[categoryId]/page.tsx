import AllRecordsList from "@/modules/blog/records/AllRecordsList";
import { TotalPageParams } from "@/types";
import ErrorComponent from "@/modules/shared/ErrorComponent";
import { getCategoryAndTagById } from "@/lib/data/actions/pages/page-action";
import GeneralPageLayout from "@/modules/layout/templates/GeneralLayout";
import RightSlidingDrawer from "@/modules/layout/templates/RightSlidingDrawer";

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
  const result = await getCategoryAndTagById(
    decodedCategoryId,
    "category",
    pagenum
  );

  return (
    <GeneralPageLayout>
      <AllRecordsList
        pagenum={pagenum !== undefined ? pagenum : 1}
        recordCount={result.recordCount}
        records={result.records}
      />
      <RightSlidingDrawer props={null} />
    </GeneralPageLayout>
  );
}
