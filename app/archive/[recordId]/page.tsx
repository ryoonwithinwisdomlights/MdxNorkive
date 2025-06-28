"use server";

import {
  getPageByPageIdAndType,
  getPageProps,
} from "@/lib/data/actions/pages/page-action";
import SingleRecords from "@/modules/blog/records/SingleRecords";
import ErrorComponent from "@/modules/shared/ErrorComponent";

//메두사 참고하여 generateStaticParams/generateMetadata 개정. 아멘.
//
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

  if (!recordId) {
    return <ErrorComponent />;
  }
  const props = await getPageProps({
    pageId: recordId,
    type: "Record",
  });
  const page = await getPageByPageIdAndType(props, "Record");

  return (
    <div className="w-full h-full">
      <SingleRecords props={page} />
    </div>
  );
}
