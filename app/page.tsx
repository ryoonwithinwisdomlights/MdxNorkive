import { getRecordPageListDataByType } from "@/lib/data/actions/pages/page-action";
import BlogIntro from "@/modules/blog/records/BlogIntro";
import GeneralPageLayout from "@/modules/layout/templates/GeneralLayout";
import RightSlidingDrawer from "@/modules/layout/templates/RightSlidingDrawer";

export default async function Page() {
  const props: any = await getRecordPageListDataByType({
    from: "index",
  });

  const { archiveRecords } = props;

  return (
    <GeneralPageLayout>
      <BlogIntro archiveRecords={archiveRecords} />
      <RightSlidingDrawer props={props} />
    </GeneralPageLayout>
  );
}
