import { getRecordPageListDataByType } from "@/lib/data/actions/pages/page-action";
import BlogIntro from "@/modules/blog/records/BlogIntro";
import GeneralRecordTypePageLayout from "@/modules/layout/templates/GeneralRecordTypePageLayout";
import RightSlidingDrawer from "@/modules/layout/templates/RightSlidingDrawer";

export default async function Page() {
  const props: any = await getRecordPageListDataByType({
    from: "index",
  });

  const { archiveRecords } = props;

  return (
    <GeneralRecordTypePageLayout>
      <BlogIntro archiveRecords={archiveRecords} />
      <RightSlidingDrawer props={props} />
    </GeneralRecordTypePageLayout>
  );
}
