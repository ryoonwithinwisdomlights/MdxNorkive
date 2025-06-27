import {
  getPageByPageIdAndType,
  getPageProps,
} from "@/lib/data/notion/typescript/getNotionData";

import SingleRecords from "@/modules/blog/records/SingleRecords";
import ErrorComponent from "@/modules/shared/ErrorComponent";
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
  const props = await getPageProps({
    pageId: pageId,
    type: "SubMenuPage",
  });
  if (!props?.post) {
    // props.post = null;
    return <div>Invalid record ID</div>;
  }

  const page = await getPageByPageIdAndType(props, "SubMenuPage");
  // console.log("SubMenuPage SingleRecords:", props);
  return (
    <div className="w-full h-full">
      <SingleRecords props={page} />
    </div>
  );
}
