"use server";

import { BLOG } from "@/blog.config";
import {
  getPageDataByTypeAndId,
  getRecordPageDataById,
} from "@/lib/data/service";
import SingleRecords from "@/modules/blog/records/SingleRecords";
import ErrorComponent from "@/modules/common/components/shared/ErrorComponent";
import RightSlidingDrawer from "@/modules/layout/components/RightSlidingDrawer";
import GeneralRecordTypePageWrapper from "@/modules/layout/templates/GeneralRecordTypePageWrapper";
import { Metadata } from "next";

//
export async function generateStaticParams() {
  const records = [{ recordId: "1481eb5c-0337-8087-a304-f2af3275be11" }];

  return records.map((record) => ({
    recordId: record.recordId,
  }));
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const { recordId } = await params;
  const props = await getRecordPageDataById({
    pageId: recordId,
    from: "Record",
  });
  const recordTitle = props?.record ? props.record : "";
  return {
    title: recordTitle,
    description: BLOG.DESCRIPTION as string,
  };
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
  const result = await getPageDataByTypeAndId({
    pageId: recordId,
    from: "archive",
    type: "Record",
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
