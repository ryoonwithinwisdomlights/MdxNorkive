import AllRecordsList from "@/modules/blog/records/AllRecordsList";
import { TotalPageParams } from "@/types";

import ErrorComponent from "@/modules/shared/ErrorComponent";
import { getCategoryAndTagById } from "@/lib/data/actions/pages/page-action";
import GeneralPageLayout from "@/modules/layout/templates/GeneralLayout";
import RightSlidingDrawer from "@/modules/layout/templates/RightSlidingDrawer";
export async function generateStaticParams() {
  const records = [{ tagId: "기술로그" }, { tagId: "another-Tags" }];
  return records.map((record) => ({
    tagId: record.tagId,
  }));
}

export default async function Page({ params, searchParams }: TotalPageParams) {
  const { tagId } = await params;
  const { pagenum } = await searchParams;
  const decodedTagId = decodeURIComponent(tagId);
  if (!tagId) {
    <ErrorComponent />;
  }
  const props = await getCategoryAndTagById(decodedTagId, "tags", pagenum);
  return (
    <GeneralPageLayout>
      <AllRecordsList
        pagenum={pagenum !== undefined ? pagenum : 1}
        recordCount={props.recordCount}
        records={props.records}
      />
      <RightSlidingDrawer props={null} />
    </GeneralPageLayout>
  );
}
