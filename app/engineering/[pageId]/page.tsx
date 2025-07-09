"use server";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BLOG } from "@/blog.config";
import { getARecordPageById } from "@/lib/notion/controller";
import SingleRecords from "@/modules/blog/records/SingleRecords";
import ErrorComponent from "@/modules/common/components/shared/ErrorComponent";
import RightSlidingDrawer from "@/modules/layout/components/RightSlidingDrawer";
import GeneralRecordTypePageWrapper from "@/modules/layout/templates/GeneralRecordTypePageWrapper";

export async function generateStaticParams() {
  const records = [
    { pageId: "1341eb5c-0337-81be-960b-c573287179cc" },
    { pageId: "another-record-id" },
  ];

  return records.map((record) => ({
    pageId: record.pageId,
  }));
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const { pageId } = await params;

  const props = await getARecordPageById({
    pageId: pageId,
    from: "Engineering-page-metadata",
    type: "Engineering",
  });
  if (!props) {
    notFound();
  }
  const title = props?.page?.title;
  const pageTitle = title ? title : "";
  return {
    title: pageTitle,
    description: BLOG.DESCRIPTION as string,
  };
}

// `generateStaticParams`가 반환한 `params`를 사용하여 이 페이지의 여러 버전이 정적으로 생성됩니다.
export default async function Page({ params }) {
  const { pageId } = await params;

  if (!pageId) {
    return <ErrorComponent />;
  }

  const result = await getARecordPageById({
    pageId: pageId,
    from: "engineering-page",
    type: "Engineering",
  });

  if (!result) {
    return <div>Invalid Page Id</div>;
  }

  // console.log("result:::", result.page);

  return (
    <GeneralRecordTypePageWrapper>
      <SingleRecords props={result} />
      <RightSlidingDrawer props={result} />
    </GeneralRecordTypePageWrapper>
  );
}
