import { getAllRecordPageListByType } from "@/lib/db/controller";
import BasicRecordPage from "@/modules/blog/records/BasicRecordPage";
import GeneralRecordTypePageWrapper from "@/modules/layout/templates/GeneralRecordTypePageWrapper";
import RightSlidingDrawer from "@/modules/layout/components/RightSlidingDrawer";

export default async function Page() {
  const props: any = await getAllRecordPageListByType({
    from: "engineering-list-page",
    type: "Engineering",
    dateSort: false,
  });

  const engineeringList: [] = props.allPages;

  return (
    <GeneralRecordTypePageWrapper>
      <BasicRecordPage type="Engineering" recordList={engineeringList} />
      <RightSlidingDrawer props={props} />
    </GeneralRecordTypePageWrapper>
  );
}
