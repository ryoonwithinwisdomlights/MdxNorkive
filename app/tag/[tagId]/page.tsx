import AllRecordsPostListPage from "@/modules/blog/records/AllRecordsPostListPage";
import { TotalPageParams } from "@/types";
import { getCategoryAndTagByPageId } from "@/lib/data/notion/typescript/getNotionData";

import ErrorComponent from "@/modules/shared/ErrorComponent";
export async function generateStaticParams() {
  const records = [{ tagId: "techLog" }, { tagId: "another-Tags" }];
  return records.map((record) => ({
    tagId: record.tagId,
  }));
}

export default async function Page({ params, searchParams }: TotalPageParams) {
  const { tagId } = await params;
  const { pagenum } = await searchParams;
  const decodedTagId = decodeURIComponent(tagId);
  if (!tagId) {
    <ErrorComponent />;
  }
  const props = await getCategoryAndTagByPageId(
    decodedTagId,
    "category",
    pagenum
  );
  return (
    <AllRecordsPostListPage
      pagenum={pagenum !== undefined ? pagenum : 1}
      postCount={props.postCount}
      posts={props.posts}
    />
  );
}
