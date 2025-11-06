import { submenuPageSource } from "@/lib/source";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { lazy } from "react";
import { DOCS_CONFIG } from "@/config/docs.config";
const CustomedMDXPage = lazy(() => import("@/modules/page/CustomedMDXPage"));
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
      resource={DOCS_CONFIG.DOCS_TYPE.SUBMENU_PAGES as string}
      className="p-4 md:p-0"
      slug={params.slug}
    />
  );
}

export async function generateStaticParams() {
  return submenuPageSource.getPages().map((page) => ({
    slug: page.slugs,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = submenuPageSource.getPage(params.slug);
  if (!page) notFound();
  return {
    title: page.data.title,
    description: page.data.description,
  } satisfies Metadata;
}
