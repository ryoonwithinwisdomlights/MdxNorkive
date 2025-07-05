import { BLOG } from "@/blog.config";
import {
  getPageDataByTypeAndId,
  getRecordPageDataById,
} from "@/lib/data/business-action";

import SingleRecords from "@/modules/blog/records/SingleRecords";
import ErrorComponent from "@/modules/common/components/shared/ErrorComponent";
import RightSlidingDrawer from "@/modules/layout/components/RightSlidingDrawer";
import GeneralRecordTypePageWrapper from "@/modules/layout/templates/GeneralRecordTypePageWrapper";
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
  const props = await getPageDataByTypeAndId({
    pageId: engId,
    from: "Engineering",
  });
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

  const result = await getPageDataByTypeAndId({
    pageId: pageId,
    from: "Engineering",
    type: "Engineering",
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
