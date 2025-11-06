import { TotalPageParams } from "@/types";

import ErrorComponent from "@/modules/shared/ErrorComponent";
import GeneralDocTypePageWrapper from "@/modules/layout/templates/home-page-layout";
import NoDocFound from "@/modules/shared/NoDocFound";

export async function generateStaticParams() {
  const docs = [{ tagId: "기술로그" }, { tagId: "another-Tags" }];
  return docs.map((doc) => ({
    tagId: doc.tagId,
  }));
}

export default async function Page({ params, searchParams }: TotalPageParams) {
  const { tagName } = await params;
  // const { pagenum } = await searchParams;
  // const decodedName = decodeURIComponent(tagName);
  if (!tagName) {
    <ErrorComponent />;
  }
  //   const result = await getCategoryAndTagPageById({
  //     decodedName: decodedName,
  //     pageProperty: "tags",
  //     pagenum: pagenum !== undefined ? pagenum : 1,
  //   });
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
