"use server";

import { revalidatePath } from "next/cache";
import { BLOG } from "@/blog.config";
import SingleRecords from "@/components/records/SingleRecords";
import { generatingPageByTypeAndId } from "@/lib/notion/getNotionData";

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
//see the details https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration
// export const dynamicParams = true; // or false, to 404 on unknown paths

export async function generateStaticParams() {
  const records = [{ recordId: "1481eb5c-0337-8087-a304-f2af3275be11" }];

  return records.map((record) => ({
    recordId: record.recordId,
  }));
}

// `generateStaticParams`가 반환한 `params`를 사용하여 이 페이지의 여러 버전이 정적으로 생성됩니다.
export default async function Page({
  params,
}: {
  params: Promise<{ recordId: string }>;
}) {
  const { recordId } = await params;

  const props = await generatingPageByTypeAndId(recordId, "Record");

  return (
    <div className="w-full h-full">
      <SingleRecords props={props} />
    </div>
  );
}
