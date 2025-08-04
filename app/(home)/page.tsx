"use client";

import NorkiveIntro from "@/modules/blog/records/NorkiveIntro";

export default function Page() {
  return <NorkiveIntro />;
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
