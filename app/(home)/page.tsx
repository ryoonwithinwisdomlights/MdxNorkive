"use client";
import BasicRecordPage from "@/modules/blog/records/BasicRecordPage";
import RightSlidingDrawer from "@/modules/layout/components/RightSlidingDrawer";
import GeneralRecordTypePageWrapper from "@/modules/layout/templates/GeneralRecordTypePageWrapper";

// // // export const revalidate = 600;
// // // 10분 지난 뒤 누군가 방문하면 백그라운드 regenerate
// // export default function Page() {
// //   const props = null;
// //   return (
// //     <GeneralRecordTypePageWrapper>
// //       <ArchiveIntro />
// //       {/* <RightSlidingDrawer props={props} /> */}
// //     </GeneralRecordTypePageWrapper>
// //   );
// // }
// import type { Metadata } from "next";
// import { redirect } from "next/navigation";
// export default async function HomePage() {
//   return redirect("/records");
// }
// export function generateMetadata() {
//   return {
//     title: "Norkive",
//     description: "yes",
//   } satisfies Metadata;
// }
import { generateParams, getPages } from "@/lib/source";
import ArchiveIntro from "@/modules/blog/records/ArchiveIntro";
import { notFound } from "next/navigation";

export default function Page() {
  // const pages = getPages();

  // if (!pages) notFound();
  // console.log("pages::", pages);

  return (
    <GeneralRecordTypePageWrapper>
      <ArchiveIntro />
      <RightSlidingDrawer />
    </GeneralRecordTypePageWrapper>
  );
}

// export async function generateStaticParams() {
//   return generateParams();
// }

// export async function generateMetadata(props: {
//   params: Promise<{ slug?: string[] }>;
// }) {
//   const params = await props.params;
//   if (params) {
//     const page = recordsource.getPage(params.slug);
//     if (!page) notFound();
//     return {
//       title: page.data.title,
//       description: page.data.description,
//     } satisfies Metadata;
//   }
// }
