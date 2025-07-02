import { getRecordPageListDataByType } from "@/lib/data/actions/pages/page-action";
import BasicRecordPage from "@/modules/blog/records/BasicRecordPage";
import GeneralRecordTypePageLayout from "@/modules/layout/templates/GeneralRecordTypePageLayout";
import RightSlidingDrawer from "@/modules/layout/templates/RightSlidingDrawer";

export default async function Page() {
  const props: any = await getRecordPageListDataByType({
    from: "index",
    type: "Project",
    dateSort: false,
  });
  const projectList: [] = props.archiveRecords;
  return (
    <GeneralRecordTypePageLayout>
      <BasicRecordPage type="Project" recordList={projectList} />
      <RightSlidingDrawer props={props} />
    </GeneralRecordTypePageLayout>
  );
}
