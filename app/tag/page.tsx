import TagList from "@/modules/blog/tag/TagList";
import NoRecordTypeLayout from "@/modules/layout/templates/NoRecordTypeLayout";

export default async function Page() {
  return (
    <NoRecordTypeLayout>
      <TagList />
    </NoRecordTypeLayout>
  );
}
