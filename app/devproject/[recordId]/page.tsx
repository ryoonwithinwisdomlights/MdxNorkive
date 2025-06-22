import { BLOG } from "@/blog.config";
import SingleRecords from "@/modules/blog/records/SingleRecords";
import { AllPosts } from "@/types";
import {
  generatingPageByTypeAndId,
  getPageProps,
} from "@/lib/data/notion/getNotionData";
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
  const props = await getPageProps(recordId, "Devproject");
  const postTitle = props?.post ? props.post : "";
  return {
    title: postTitle,
    description: BLOG.DESCRIPTION as string,
  };
}

// `generateStaticParams`가 반환한 `params`를 사용하여 이 페이지의 여러 버전이 정적으로 생성됩니다.
export default async function Page({ params }) {
  const { recordId } = await params;

  const props = await generatingPageByTypeAndId(recordId, "Devproject");

  return (
    <div className="w-full h-full">
      <SingleRecords props={props} />
    </div>
  );
}
