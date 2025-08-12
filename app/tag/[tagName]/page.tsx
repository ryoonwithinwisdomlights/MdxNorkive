import { TotalPageParams } from "@/types";

import ErrorComponent from "@/modules/shared/ErrorComponent";
import GeneralRecordTypePageWrapper from "@/modules/layout/templates/home-page-layout";
import NoRecordFound from "@/modules/shared/NoRecordFound";

export async function generateStaticParams() {
  const records = [{ tagId: "기술로그" }, { tagId: "another-Tags" }];
  return records.map((record) => ({
    tagId: record.tagId,
  }));
}

export default async function Page({ params, searchParams }: TotalPageParams) {
  const { tagName } = await params;
  const { pagenum } = await searchParams;
  const decodedName = decodeURIComponent(tagName);
  if (!tagName) {
    <ErrorComponent />;
  }
  //   const result = await getCategoryAndTagPageById({
  //     decodedName: decodedName,
  //     pageProperty: "tags",
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
