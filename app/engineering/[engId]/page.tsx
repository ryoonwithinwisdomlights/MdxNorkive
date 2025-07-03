import { BLOG } from "@/blog.config";
import {
  setPrevNextRecommendInRecordPage,
  getRecordPageDataById,
  getPageDataByTypeAndId,
} from "@/lib/data/service";

import SingleRecords from "@/modules/blog/records/SingleRecords";
import GeneralRecordTypePageWrapper from "@/modules/layout/templates/GeneralRecordTypePageWrapper";
import RightSlidingDrawer from "@/modules/layout/components/RightSlidingDrawer";
import ErrorComponent from "@/modules/common/components/shared/ErrorComponent";
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

  const result = await getPageDataByTypeAndId({
    pageId: engId,
    from: "Engineering",
    type: "Engineering",
  });

  if (!result) {
    return <div>Invalid record ID</div>;
  }

  return (
    <GeneralRecordTypePageWrapper>
      <SingleRecords props={result} />
      <RightSlidingDrawer props={result} />
    </GeneralRecordTypePageWrapper>
  );
}
