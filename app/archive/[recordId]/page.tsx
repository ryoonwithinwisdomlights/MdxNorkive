"use server";

import { BLOG } from "@/blog.config";
import { getPageDataByTypeAndId } from "@/lib/data/business-action";
import SingleRecords from "@/modules/blog/records/SingleRecords";
import ErrorComponent from "@/modules/common/components/shared/ErrorComponent";
import RightSlidingDrawer from "@/modules/layout/components/RightSlidingDrawer";
import GeneralRecordTypePageWrapper from "@/modules/layout/templates/GeneralRecordTypePageWrapper";
import { Metadata } from "next";

//
export async function generateStaticParams() {
  const records = [{ pageId: "1481eb5c-0337-8087-a304-f2af3275be11" }];

  return records.map((record) => ({
    pageId: record.pageId,
  }));
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const { pageId } = await params;
  const props = await getPageDataByTypeAndId({
    pageId: pageId,
    from: "Record",
  });
  const title = props?.page?.title;
  const pageTitle = title ? title : "";
  return {
    title: pageTitle,
    description: BLOG.DESCRIPTION as string,
  };
}

// `generateStaticParams`가 반환한 `params`를 사용하여 이 페이지의 여러 버전이 정적으로 생성됩니다.
export default async function Page({
  params,
}: {
  params: Promise<{ pageId: string }>;
}) {
  const { pageId } = await params;

  if (!pageId) {
    return <ErrorComponent />;
  }
  const result = await getPageDataByTypeAndId({
    pageId: pageId,
    from: "archive",
    type: "Record",
  });
  if (!result) {
    return <div>Invalid Page Id</div>;
  }

  return (
    <GeneralRecordTypePageWrapper>
      <SingleRecords props={result} />
      <RightSlidingDrawer props={result} />
    </GeneralRecordTypePageWrapper>
  );
}
