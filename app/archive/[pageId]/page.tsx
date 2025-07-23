// "use server";

// import { BLOG } from "@/blog.config";
// import { getARecordPageById } from "@/lib/notion/controller";

// import SingleRecords from "@/modules/blog/records/SingleRecords";
// import ErrorComponent from "@/modules/common/components/shared/ErrorComponent";
// import RightSlidingDrawer from "@/modules/layout/components/RightSlidingDrawer";
// import GeneralRecordTypePageWrapper from "@/modules/layout/templates/GeneralRecordTypePageWrapper";
// import { Metadata } from "next";
// import { notFound } from "next/navigation";

// export async function generateStaticParams() {
//   const records = [{ pageId: "1481eb5c-0337-8087-a304-f2af3275be11" }];

//   return records.map((record) => ({
//     pageId: record.pageId,
//   }));
// }

// export async function generateMetadata({ params }): Promise<Metadata> {
//   const { pageId } = params;
//   const props = await getARecordPageById({
//     pageId: pageId,
//     from: "archive-page-metadata",
//     type: "Record",
//   });
//   if (!props) {
//     notFound();
//   }

//   const title = props?.page?.title;
//   const pageTitle = title ? title : "";
//   return {
//     title: pageTitle,
//     description: BLOG.DESCRIPTION as string,
//   };
// }

// // `generateStaticParams`가 반환한 `params`를 사용하여 이 페이지의 여러 버전이 정적으로 생성됩니다.

// export default async function Page({
//   params,
// }: {
//   params: Promise<{ pageId: string }>;
// }) {
//   const { pageId } = await params;

//   if (!pageId) {
//     return <ErrorComponent />;
//   }
//   const result = await getARecordPageById({
//     pageId: pageId,
//     from: "archive-page",
//     type: "Record",
//   });
//   if (!result) {
//     return <div>Invalid Page Id</div>;
//   }

//   return (
//     <GeneralRecordTypePageWrapper>
//       <SingleRecords props={result} />
//       <RightSlidingDrawer props={result} />
//     </GeneralRecordTypePageWrapper>
//   );
// }
