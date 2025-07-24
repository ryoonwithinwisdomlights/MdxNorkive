import { recordsource } from "@/lib/source";
import { mdxComponents } from "@/components/mdx-components";
import { getMDXComponents } from "@/mdx-components";
import { MDXContent } from "@content-collections/mdx/react";
import { createRelativeLink } from "fumadocs-ui/mdx";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TempDoc from "@/components/TempDoc";

function getPath(slug: string[]) {
  return slug.join("/");
}

function styleToLevel(style: unknown) {
  if (typeof style !== "string") return;
  return Number.parseInt(style.split("h")[1]);
}

export const dynamic = "force-static";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  let slug = params.slug;
  if (slug) {
    slug = slug.map((s) => decodeURIComponent(s));
  }
  // console.log("slug", slug);
  // slug가 있으면 개별 페이지를 보여줌
  const page = recordsource.getPage(params.slug);
  if (!page) notFound();
  const { body, toc, lastEditedDate } = await page.data;

  // console.log("page::", page);
  return <TempDoc body={body} toc={toc} date={lastEditedDate} page={page} />;
}

export async function generateStaticParams() {
  return recordsource.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = recordsource.getPage(params.slug);
  if (!page) notFound();
  return {
    title: page.data.title,
    description: page.data.description,
  } satisfies Metadata;
}
