import GeneralRecordTypePageWrapper from "@/modules/layout/templates/home-page-layout";
import NoRecordFound from "@/modules/shared/NoRecordFound";

export default async function Page() {
  return (
    <GeneralRecordTypePageWrapper>
      {/* <CategoryPage /> */}
      <NoRecordFound />
    </GeneralRecordTypePageWrapper>
  );
}
