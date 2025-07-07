import { getAllRecordPageListByType } from "@/lib/db/controller";
import BasicRecordPage from "@/modules/blog/records/BasicRecordPage";
import GeneralRecordTypePageWrapper from "@/modules/layout/templates/GeneralRecordTypePageWrapper";
import RightSlidingDrawer from "@/modules/layout/components/RightSlidingDrawer";

export default async function Page() {
  const props: any = await getAllRecordPageListByType({
    from: "project-list-page",
    type: "Project",
    dateSort: false,
  });
  const projectList: [] = props.allPages;
  return (
    <GeneralRecordTypePageWrapper>
      <BasicRecordPage type="Project" recordList={projectList} />
      <RightSlidingDrawer props={props} />
    </GeneralRecordTypePageWrapper>
  );
}
