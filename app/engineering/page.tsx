import { getAllPageDataListByType } from "@/lib/data/business-action";
import BasicRecordPage from "@/modules/blog/records/BasicRecordPage";
import GeneralRecordTypePageWrapper from "@/modules/layout/templates/GeneralRecordTypePageWrapper";
import RightSlidingDrawer from "@/modules/layout/components/RightSlidingDrawer";

export default async function Page() {
  const props: any = await getAllPageDataListByType({
    from: "engineering-page",
    type: "Engineering",
    dateSort: false,
  });

  const engineeringList: [] = props.archivedPages;

  return (
    <GeneralRecordTypePageWrapper>
      <BasicRecordPage type="Engineering" recordList={engineeringList} />
      <RightSlidingDrawer props={props} />
    </GeneralRecordTypePageWrapper>
  );
}
