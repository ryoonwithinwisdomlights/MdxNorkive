import { getAllPageDataListByType } from "@/lib/data/business-action";
import ArchiveIntro from "@/modules/blog/records/ArchiveIntro";
import GeneralRecordTypePageWrapper from "@/modules/layout/templates/GeneralRecordTypePageWrapper";
import RightSlidingDrawer from "@/modules/layout/components/RightSlidingDrawer";

export default async function Page() {
  const props: any = await getAllPageDataListByType({
    from: "main-page",
  });

  const { archivedPages } = props;

  return (
    <GeneralRecordTypePageWrapper>
      <ArchiveIntro archivedPages={archivedPages} />
      <RightSlidingDrawer props={props} />
    </GeneralRecordTypePageWrapper>
  );
}
