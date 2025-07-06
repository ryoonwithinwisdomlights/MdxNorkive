import { getAllPageDataListByType } from "@/lib/notion/business-action";
import BasicRecordPage from "@/modules/blog/records/BasicRecordPage";
import GeneralRecordTypePageWrapper from "@/modules/layout/templates/GeneralRecordTypePageWrapper";
import RightSlidingDrawer from "@/modules/layout/components/RightSlidingDrawer";
import GeneralRecordPage from "@/modules/blog/records/GeneralRecordPage";

export default async function Page() {
  const props: any = await getAllPageDataListByType({
    from: "general-page",
    type: "General",
    dateSort: true,
  });

  const { archivedPages } = props;

  return (
    <GeneralRecordTypePageWrapper>
      <GeneralRecordPage archivedPages={archivedPages} />
      <RightSlidingDrawer props={props} />
    </GeneralRecordTypePageWrapper>
  );
}
