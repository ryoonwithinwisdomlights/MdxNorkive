import AllRecordsList from "@/modules/blog/records/AllRecordsList";
import { TotalPageParams } from "@/types";

import { getCategoryAndTagPageById } from "@/lib/notion/controller";
import ErrorComponent from "@/modules/common/components/shared/ErrorComponent";
import NoRecordTypePageWrapper from "@/modules/layout/templates/NoRecordTypePageWrapper";
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
  const result = await getCategoryAndTagPageById({
    decodedName: decodedName,
    pageProperty: "tags",
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
