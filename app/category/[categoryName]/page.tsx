import { getCategoryAndTagById } from "@/lib/db/controller";
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
  const { categoryName } = await params;
  const { pagenum } = await searchParams;
  const decodedName = decodeURIComponent(categoryName);

  console.log("categoryName:", categoryName);
  console.log("decodedName:", decodedName);
  if (!categoryName) {
    <ErrorComponent />;
  }
  const result = await getCategoryAndTagById({
    decodedName: decodedName,
    pageProperty: "category",
    pagenum: pagenum !== undefined ? pagenum : 1,
  });

  return (
    <NoRecordTypePageWrapper>
      <AllRecordsList
        pagenum={pagenum !== undefined ? pagenum : 1}
        pageCount={result.pageCount!}
        allPages={result.allPages}
      />
    </NoRecordTypePageWrapper>
  );
}
