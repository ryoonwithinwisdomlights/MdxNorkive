import { BLOG } from "@/blog.config";
import {
  getPageByPageIdAndType,
  getPageProps,
} from "@/lib/data/notion/getNotionData";
import SingleRecords from "@/modules/blog/records/SingleRecords";
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
  const props = await getPageProps({ paramId: recordId, type: "Devproject" });
  const postTitle = props?.post ? props.post : "";
  return {
    title: postTitle,
    description: BLOG.DESCRIPTION as string,
  };
}

// `generateStaticParams`가 반환한 `params`를 사용하여 이 페이지의 여러 버전이 정적으로 생성됩니다.
export default async function Page({ params }) {
  const { recordId } = await params;

  if (!recordId) {
    return <ErrorComponent />;
  }
  const props = await getPageProps({
    paramId: recordId,
    type: "Devproject",
  });

  if (!props?.post) {
    return <div>Invalid record ID</div>;
  }

  const page = await getPageByPageIdAndType(props, "Devproject");
  // console.log("Devproject SingleRecords:", props);
  return (
    <div className="w-full h-full">
      <SingleRecords props={page} />
    </div>
  );
}
