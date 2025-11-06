import GeneralDocTypePageWrapper from "@/modules/layout/templates/home-page-layout";
import ErrorComponent from "@/modules/shared/ErrorComponent";

import NoDocFound from "@/modules/shared/NoDocFound";
import { TotalPageParams } from "@/types";

export async function generateStaticParams() {
  const docs = [
    { categoryId: "tailwindcss" },
    { categoryId: "another-category" },
  ];
  return docs.map((doc) => ({
    categoryId: doc.categoryId,
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
    <GeneralDocTypePageWrapper>
      {/* <AllDocsList
        pagenum={pagenum !== undefined ? pagenum : 1}
        pageCount={result.pageCount!}
        allPages={result.allPages}
      /> */}
      <NoDocFound />
    </GeneralDocTypePageWrapper>
  );
}
