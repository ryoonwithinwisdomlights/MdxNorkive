import { getRecordPageListDataByType } from "@/lib/data/actions/pages/page-action";
import ArchiveIntro from "@/modules/blog/records/ArchiveIntro";
import GeneralRecordTypePageWrapper from "@/modules/layout/templates/GeneralRecordTypePageWrapper";
import RightSlidingDrawer from "@/modules/layout/components/RightSlidingDrawer";

export default async function Page() {
  const props: any = await getRecordPageListDataByType({
    from: "index",
  });

  const { archiveRecords } = props;

  return (
    <GeneralRecordTypePageWrapper>
      <ArchiveIntro archiveRecords={archiveRecords} />
      <RightSlidingDrawer props={props} />
    </GeneralRecordTypePageWrapper>
  );
}
