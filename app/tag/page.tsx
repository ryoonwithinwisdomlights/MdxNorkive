import TagList from "@/modules/blog/tag/TagList";
import NoRecordTypePageWrapper from "@/modules/layout/templates/NoRecordTypePageWrapper";

export default async function Page() {
  return (
    <NoRecordTypePageWrapper>
      <TagList />
    </NoRecordTypePageWrapper>
  );
}
