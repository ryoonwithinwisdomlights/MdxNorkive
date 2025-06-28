import { BLOG } from "@/blog.config";
import {
  getPageByPageIdAndType,
  getPageProps,
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
  const props = await getPageProps({ pageId: engId, type: "Engineering" });
  const postTitle = props?.post ? props.post : "";
  return {
    title: postTitle,
    description: BLOG.DESCRIPTION as string,
  };
}

// `generateStaticParams`가 반환한 `params`를 사용하여 이 페이지의 여러 버전이 정적으로 생성됩니다.
export default async function Page({ params }) {
  const { engId } = await params;
  if (!engId) {
    return <ErrorComponent />;
  }
  const props = await getPageProps({
    pageId: engId,
    type: "Project",
  });

  if (!props?.post) {
    // props.post = null;
    return <div>Invalid record ID</div>;
  }

  const page = await getPageByPageIdAndType(props, "Engineering");
  console.log("Engineering SingleRecords:", props);
  return (
    <div className="w-full h-full">
      <SingleRecords props={page} />
    </div>
  );
}
