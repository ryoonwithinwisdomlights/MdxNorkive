import CategoryList from "@/modules/blog/category/CategoryList";
import GeneralPageLayout from "@/modules/layout/templates/GeneralLayout";
import RightSlidingDrawer from "@/modules/layout/templates/RightSlidingDrawer";

export default async function Page() {
  return (
    <GeneralPageLayout>
      <CategoryList />
      <RightSlidingDrawer props={null} />
    </GeneralPageLayout>
  );
}
