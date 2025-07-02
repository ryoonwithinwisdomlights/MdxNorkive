import { getRecordPageListDataByType } from "@/lib/data/actions/pages/page-action";
import BasicRecordPage from "@/modules/blog/records/BasicRecordPage";
import GeneralRecordTypePageWrapper from "@/modules/layout/templates/GeneralRecordTypePageWrapper";
import RightSlidingDrawer from "@/modules/layout/components/RightSlidingDrawer";

export default async function Page() {
  const props: any = await getRecordPageListDataByType({
    from: "index",
    type: "Engineering",
    dateSort: false,
  });

  const engineeringList: [] = props.archiveRecords;

  return (
    <GeneralRecordTypePageWrapper>
      <BasicRecordPage type="Engineering" recordList={engineeringList} />
      <RightSlidingDrawer props={props} />
    </GeneralRecordTypePageWrapper>
  );
}
