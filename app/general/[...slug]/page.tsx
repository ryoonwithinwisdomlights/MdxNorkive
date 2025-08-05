import CustomedMDXPage from "@/components/CustomedMDXPage";
import { recordSource } from "@/lib/source";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = "force-static";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  let slug = params.slug;
  if (slug) {
    slug = slug.map((s) => decodeURIComponent(s));
  }

  return (
    <CustomedMDXPage
      resource={"record"}
      className="bg-pink-200 p-10 md:p-0"
      slug={params.slug}
    />
  );
}

export async function generateStaticParams() {
  return recordSource.getPages().map((page) => ({
    slug: page.slugs,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = recordSource.getPage(params.slug);
  if (!page) notFound();
  return {
    title: page.data.title,
    description: page.data.description,
  } satisfies Metadata;
}
