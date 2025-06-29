import { BLOG } from "@/blog.config";
import {
  setPrevNextRecommendInRecordPage,
  getRecordPageDataById,
} from "@/lib/data/actions/pages/page-action";

import SingleRecords from "@/modules/blog/records/SingleRecords";
import ErrorComponent from "@/modules/shared/ErrorComponent";
import { Metadata } from "next";

export async function generateStaticParams() {
  const records = [
    { engId: "1341eb5c-0337-81be-960b-c573287179cc" },
    { engId: "another-record-id" },
  ];

  return records.map((record) => ({
    engId: record.engId,
  }));
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const { engId } = await params;
  const result = await getRecordPageDataById({
    pageId: engId,
    from: "Engineering",
  });
  const recordTitle = result?.record ? result.record : "";
  return {
    title: recordTitle,
    description: BLOG.DESCRIPTION as string,
  };
}

// `generateStaticParams`가 반환한 `params`를 사용하여 이 페이지의 여러 버전이 정적으로 생성됩니다.
export default async function Page({ params }) {
  const { engId } = await params;
  if (!engId) {
    return <ErrorComponent />;
  }
  const result = await getRecordPageDataById({
    pageId: engId,
    from: "Project",
  });

  if (!result?.record) {
    return <div>Invalid record ID</div>;
  }

  const page = await setPrevNextRecommendInRecordPage(result);

  return (
    <div className="w-full h-full">
      <SingleRecords props={page} />
    </div>
  );
}
