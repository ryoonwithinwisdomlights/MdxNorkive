import { getRecordPageListDataByType } from "@/lib/data/actions/pages/page-action";
import BasicRecordPage from "@/modules/blog/records/BasicRecordPage";
import GeneralPageLayout from "@/modules/layout/templates/GeneralLayout";
import RightSlidingDrawer from "@/modules/layout/templates/RightSlidingDrawer";

export default async function Page() {
  const props: any = await getRecordPageListDataByType({
    from: "index",
    type: "Project",
    dateSort: false,
  });
  const devProjectList: [] = props.archiveRecords;
  return (
    <GeneralPageLayout>
      <BasicRecordPage type="Project" recordList={devProjectList} />
      <RightSlidingDrawer props={props} />
    </GeneralPageLayout>
  );
}
