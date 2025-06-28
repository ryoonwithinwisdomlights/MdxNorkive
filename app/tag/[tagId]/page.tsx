import AllRecordsList from "@/modules/blog/records/AllRecordsList";
import { TotalPageParams } from "@/types";

import ErrorComponent from "@/modules/shared/ErrorComponent";
import { getCategoryAndTagByPageId } from "@/lib/data/actions/pages/page-action";
export async function generateStaticParams() {
  const records = [{ tagId: "기술로그" }, { tagId: "another-Tags" }];
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
  const props = await getCategoryAndTagByPageId(decodedTagId, "tags", pagenum);
  return (
    <AllRecordsList
      pagenum={pagenum !== undefined ? pagenum : 1}
      postCount={props.postCount}
      posts={props.posts}
    />
  );
}
