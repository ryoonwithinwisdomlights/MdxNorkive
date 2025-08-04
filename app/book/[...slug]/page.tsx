import CustomedMDXPage from "@/components/CustomedMDXPage";
import { bookSource } from "@/lib/source";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

// function getPath(slug: string[]) {
//   return slug.join("/");
// }

// function styleToLevel(style: unknown) {
//   if (typeof style !== "string") return;
//   return Number.parseInt(style.split("h")[1]);
// }

export const dynamic = "force-static";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  let slug = params.slug;
  if (slug) {
    slug = slug.map((s) => decodeURIComponent(s));
  }

  const page = bookSource.getPage(params.slug);
  if (!page) notFound();
  const { body, toc, lastEditedDate } = await page.data;

  return (
    <CustomedMDXPage
      className="pl-20 bg-pink-200"
      body={body}
      toc={toc}
      date={lastEditedDate}
      page={page}
    />
  );
}

export async function generateStaticParams() {
  return bookSource.getPages().map((page) => ({
    slug: page.slugs,
  }));
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
