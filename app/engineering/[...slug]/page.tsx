import CustomedMDXPage from "@/modules/shared/CustomedMDXPage";
import { engineeringSource } from "@/lib/source";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
export const dynamic = "force-static";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  let slug = params.slug;
  // if (slug) {
  //   slug = slug.map((s) => decodeURIComponent(s));
  // }
  // console.log("slug:", slug);
  // console.log(" params.slug:", params.slug);
  // console.log("===================");
  return (
    <CustomedMDXPage
      resource={"engineering"}
      className=" p-4 md:p-0"
      slug={params.slug}
    />
  );
}

export async function generateStaticParams() {
  return engineeringSource.getPages().map((page) => {
    const modSlug = page.slugs.map((s) => decodeURIComponent(s));
    return {
      slug: modSlug,
    };
  });
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = engineeringSource.getPage(params.slug);
  if (!page) notFound();
  return {
    title: page.data.title,
    description: page.data.description,
  } satisfies Metadata;
}
