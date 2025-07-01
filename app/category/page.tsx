import CategoryList from "@/modules/blog/category/CategoryList";
import NoRecordTypeLayout from "@/modules/layout/templates/NoRecordTypeLayout";

export default async function Page() {
  return (
    <NoRecordTypeLayout>
      <CategoryList />
    </NoRecordTypeLayout>
  );
}
