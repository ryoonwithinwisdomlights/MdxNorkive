// app/record/[slug]/page.tsx
import { allRecords } from "content-collections";
import { notFound } from "next/navigation";
import { MDXContent } from "@content-collections/mdx/react"; // 핵심 렌더러
import ErrorComponent from "@/modules/common/components/shared/ErrorComponent";

export async function generateStaticParams() {
  return allRecords.map((entry) => ({
    slug: entry.slug,
  }));
}

export default async function RecordPage({ params }) {
  const { slug } = await params;
  console.log("slug::", slug);
  const decodedSlug = decodeURIComponent(slug); // 혹시 모르니 decode
  if (!slug) {
    return <ErrorComponent />;
  }
  // console.log("allRecords::", allRecords);
  const entry = allRecords.find((e) => {
    const normalizedSlug = e.slug.replace(/^record\//, "");
    return normalizedSlug === decodedSlug;
  });

  if (!entry) return notFound();

  return (
    <article className="prose dark:prose-invert mx-auto px-4">
      <h1 className="text-3xl font-bold mb-2">{entry.title}</h1>
      <p className="text-sm text-gray-500 mb-8">
        {entry.date.toLocaleDateString()}
      </p>
      <MDXContent code={entry.mdx} /> {/* MDX 렌더링 */}
    </article>
  );
}
