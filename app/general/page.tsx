import { getAllRecordPageListByType } from "@/lib/db/controller";
import BasicRecordPage from "@/modules/blog/records/BasicRecordPage";
import GeneralRecordTypePageWrapper from "@/modules/layout/templates/GeneralRecordTypePageWrapper";
import RightSlidingDrawer from "@/modules/layout/components/RightSlidingDrawer";
import GeneralRecordPage from "@/modules/blog/records/GeneralRecordPage";

export default async function Page() {
  const props: any = await getAllRecordPageListByType({
    from: "general-page",
    type: "General",
    dateSort: true,
  });

  const { allPages } = props;

  return (
    <GeneralRecordTypePageWrapper>
      <GeneralRecordPage allPages={allPages} />
      <RightSlidingDrawer props={props} />
    </GeneralRecordTypePageWrapper>
  );
}
