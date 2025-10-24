import GeneralRecordTypePageWrapper from "@/modules/layout/templates/home-page-layout";
import ErrorComponent from "@/modules/shared/ErrorComponent";

import NoRecordFound from "@/modules/shared/NoRecordFound";
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

export default async function Page({ params }: TotalPageParams) {
  const { categoryName } = await params;
  // const { pagenum } = await searchParams;
  // const decodedName = decodeURIComponent(categoryName);
  if (!categoryName) {
    <ErrorComponent />;
  }

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
