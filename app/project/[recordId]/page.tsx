import { BLOG } from "@/blog.config";
import {
  setPrevNextRecommendInRecordPage,
  getRecordPageDataById,
  getPageDataByTypeAndId,
} from "@/lib/data/actions/pages/page-action";

import SingleRecords from "@/modules/blog/records/SingleRecords";
import GeneralPageLayout from "@/modules/layout/templates/GeneralLayout";
import RightSlidingDrawer from "@/modules/layout/templates/RightSlidingDrawer";
import ErrorComponent from "@/modules/shared/ErrorComponent";
import { Metadata } from "next";

export async function generateStaticParams() {
  const records = [
    { recordId: "1341eb5c-0337-81ad-a46c-d94c8abcdada" },
    { recordId: "another-record-id" },
  ];
  return records.map((record) => ({
    recordId: record.recordId,
  }));
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const { recordId } = await params;
  const props = await getRecordPageDataById({
    pageId: recordId,
    from: "Project",
  });
  const recordTitle = props?.record ? props.record : "";
  return {
    title: recordTitle,
    description: BLOG.DESCRIPTION as string,
  };
}

// `generateStaticParams`가 반환한 `params`를 사용하여 이 페이지의 여러 버전이 정적으로 생성됩니다.
export default async function Page({ params }) {
  const { recordId } = await params;

  if (!recordId) {
    return <ErrorComponent />;
  }
  // const result = await getRecordPageDataById({
  //   pageId: recordId,
  //   from: "Project",
  // });

  const result = await getPageDataByTypeAndId({
    pageId: recordId,
    from: "Project",
    type: "Project",
  });

  if (!result?.record) {
    return <div>Invalid record ID</div>;
  }

  // const page = await setPrevNextRecommendInRecordPage(result);

  return (
    <GeneralPageLayout>
      <SingleRecords props={result} />
      <RightSlidingDrawer props={result} />
    </GeneralPageLayout>
  );
}
