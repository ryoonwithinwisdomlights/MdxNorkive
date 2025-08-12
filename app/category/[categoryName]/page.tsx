import ErrorComponent from "@/modules/shared/ErrorComponent";
import GeneralRecordTypePageWrapper from "@/modules/layout/templates/home-page-layout";

import { TotalPageParams } from "@/types";
import NoRecordFound from "@/modules/shared/NoRecordFound";

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
    <GeneralRecordTypePageWrapper>
      {/* <AllRecordsList
        pagenum={pagenum !== undefined ? pagenum : 1}
        pageCount={result.pageCount!}
        allPages={result.allPages}
      /> */}
      <NoRecordFound />
    </GeneralRecordTypePageWrapper>
  );
}
