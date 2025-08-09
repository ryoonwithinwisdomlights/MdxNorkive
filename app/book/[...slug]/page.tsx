import CustomedMDXPage from "@/modules/page/CustomedMDXPage";
import { bookSource } from "@/lib/source";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = "force-static";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;

  return (
    <CustomedMDXPage resource={"book"} className=" p-4  " slug={params.slug} />
  );
}

export async function generateStaticParams() {
  return bookSource.getPages().map((page) => {
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
  const page = bookSource.getPage(params.slug);
  if (!page) notFound();
  return {
    title: page.data.title,
    description: page.data.description,
  } satisfies Metadata;
}
