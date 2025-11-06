import GeneralDocTypePageWrapper from "@/modules/layout/templates/home-page-layout";
import NoDocFound from "@/modules/shared/NoDocFound";

export default async function Page() {
  return (
    <GeneralDocTypePageWrapper>
      {/* <CategoryPage /> */}
      <NoDocFound />
    </GeneralDocTypePageWrapper>
  );
}
