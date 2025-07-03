import { getCategoryAndTagById } from "@/lib/data/service";
import AllRecordsList from "@/modules/blog/records/AllRecordsList";
import NoRecordTypePageWrapper from "@/modules/layout/templates/NoRecordTypePageWrapper";
import ErrorComponent from "@/modules/common/components/shared/ErrorComponent";
import { TotalPageParams } from "@/types";

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
  console.log("result.recordCount:", result.recordCount);
  return (
    <NoRecordTypePageWrapper>
      <AllRecordsList
        pagenum={pagenum !== undefined ? pagenum : 1}
        recordCount={result.recordCount}
        records={result.records}
      />
    </NoRecordTypePageWrapper>
  );
}
