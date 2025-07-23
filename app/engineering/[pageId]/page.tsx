"use server";
// import { getPost } from "@/lib/notion/api/original/getPosts";
import ErrorComponent from "@/modules/common/components/shared/ErrorComponent";
import GeneralRecordTypePageWrapper from "@/modules/layout/templates/GeneralRecordTypePageWrapper";

// export async function generateStaticParams() {
//   const records = [
//     { pageId: "1341eb5c-0337-81be-960b-c573287179cc" },
//     { pageId: "another-record-id" },
//   ];

//   return records.map((record) => ({
//     pageId: record.pageId,
//   }));
// }

export default async function Page({ params }) {
  const { pageId } = await params;

  if (!pageId) {
    return <ErrorComponent />;
  }

  //const result = await fetchArticlePageContent(pageId);
  const result = null;
  if (!result) {
    return <div>Invalid Page Id</div>;
  }

  console.log("result::", result);

  return (
    <GeneralRecordTypePageWrapper>
      {/* <TransferedMd result={result} /> */}
      <div>No result</div>
    </GeneralRecordTypePageWrapper>
  );
}
