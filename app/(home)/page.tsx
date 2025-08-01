"use client";
import RightSlidingDrawer from "@/modules/layout/components/RightSlidingDrawer";
import GeneralRecordTypePageWrapper from "@/modules/layout/templates/GeneralRecordTypePageWrapper";

import ArchiveIntro from "@/modules/blog/records/ArchiveIntro";
import LeftSidebar from "@/modules/layout/components/menu/LeftSidebar";

export default function Page() {
  return (
    <GeneralRecordTypePageWrapper>
      <LeftSidebar />
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
