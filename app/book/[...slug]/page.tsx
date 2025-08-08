import CustomedMDXPage from "@/modules/shared/CustomedMDXPage";
import { bookSource } from "@/lib/source";
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
