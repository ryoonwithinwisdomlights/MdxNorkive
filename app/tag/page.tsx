import TagList from "@/modules/blog/tag/TagList";
import GeneralPageLayout from "@/modules/layout/templates/GeneralLayout";
import RightSlidingDrawer from "@/modules/layout/templates/RightSlidingDrawer";

export default async function Page() {
  return (
    <GeneralPageLayout>
      <TagList />
      <RightSlidingDrawer props={null} />
    </GeneralPageLayout>
  );
}
