import ErrorComponent from "@/modules/common/components/shared/ErrorComponent";
import NoRecordTypePageWrapper from "@/modules/layout/templates/NoRecordTypePageWrapper";
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
  if (!categoryName) {
    <ErrorComponent />;
  }
  //   const result = await getCategoryAndTagPageById({
  //     decodedName: decodedName,
  //     pageProperty: "category",
  //     pagenum: pagenum !== undefined ? pagenum : 1,
  //   });

  return (
    <NoRecordTypePageWrapper>
      {/* <AllRecordsList
        pagenum={pagenum !== undefined ? pagenum : 1}
        pageCount={result.pageCount!}
        allPages={result.allPages}
      /> */}
      <div>No result</div>
    </NoRecordTypePageWrapper>
  );
}
