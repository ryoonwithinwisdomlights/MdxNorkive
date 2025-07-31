import CategoryList from "@/modules/blog/category/CategoryList";
import NoRecordTypePageWrapper from "@/modules/layout/templates/NoRecordTypePageWrapper";

export default async function Page() {
  return (
    <NoRecordTypePageWrapper>
      {/* <CategoryList /> */}
      <div>No result</div>
    </NoRecordTypePageWrapper>
  );
}
