import { getAllPageDataListByType } from "@/lib/notion/business-action";
import ArchiveIntro from "@/modules/blog/records/ArchiveIntro";
import GeneralRecordTypePageWrapper from "@/modules/layout/templates/GeneralRecordTypePageWrapper";
import RightSlidingDrawer from "@/modules/layout/components/RightSlidingDrawer";

export const revalidate = 600;
//// 10분 지난 뒤 누군가 방문하면 백그라운드 regenerate
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
