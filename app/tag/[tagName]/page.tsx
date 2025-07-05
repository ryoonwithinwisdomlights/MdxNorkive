import AllRecordsList from "@/modules/blog/records/AllRecordsList";
import { TotalPageParams } from "@/types";

import { getCategoryAndTagById } from "@/lib/data/business-action";
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
  const decodedTagName = decodeURIComponent(tagName);
  if (!tagName) {
    <ErrorComponent />;
  }
  const props = await getCategoryAndTagById(decodedTagName, "tags", pagenum);
  return (
    <NoRecordTypePageWrapper>
      <AllRecordsList
        pagenum={pagenum !== undefined ? pagenum : 1}
        recordCount={props.recordCount}
        records={props.records}
      />
    </NoRecordTypePageWrapper>
  );
}
