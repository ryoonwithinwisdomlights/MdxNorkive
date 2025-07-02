import {
  setPrevNextRecommendInRecordPage,
  getRecordPageDataById,
  getPageDataByTypeAndId,
} from "@/lib/data/actions/pages/page-action";
import SingleRecords from "@/modules/blog/records/SingleRecords";
import GeneralRecordTypePageWrapper from "@/modules/layout/templates/GeneralRecordTypePageWrapper";
import RightSlidingDrawer from "@/modules/layout/components/RightSlidingDrawer";
import ErrorComponent from "@/modules/common/components/shared/ErrorComponent";
export async function generateStaticParams() {
  const records = [{ pageId: "341eb5c0337801da209c34c90bc3377" }];
  return records.map((record) => ({
    pageId: record.pageId,
  }));
}

// `generateStaticParams`가 반환한 `params`를 사용하여 이 페이지의 여러 버전이 정적으로 생성됩니다.
export default async function Page({ params }) {
  const { pageId } = await params;

  if (!pageId) {
    return <ErrorComponent />;
  }

  const result = await getPageDataByTypeAndId({
    pageId: pageId,
    from: "SubMenuPage",
    type: "SubMenuPage",
  });
  if (!result?.record) {
    return <div>Invalid record ID</div>;
  }

  return (
    <GeneralRecordTypePageWrapper>
      <SingleRecords props={result} />
      <RightSlidingDrawer props={result} />
    </GeneralRecordTypePageWrapper>
  );
}
