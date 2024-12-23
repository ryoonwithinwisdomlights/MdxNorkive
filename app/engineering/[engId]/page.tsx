import { BLOG } from "@/blog.config";
import SingleRecords from "@/components/records/SingleRecords";
import { AllPosts } from "@/lib/models";
import {
  generatingPageByTypeAndId,
  getPageProps,
} from "@/lib/notion/getNotionData";
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
  const props = await getPageProps(engId, "Engineering");
  const postTitle = props?.post ? props.post : "";
  return {
    title: postTitle,
    description: BLOG.DESCRIPTION as string,
  };
}

// `generateStaticParams`가 반환한 `params`를 사용하여 이 페이지의 여러 버전이 정적으로 생성됩니다.
export default async function Page({ params }) {
  const { engId } = await params;

  const props = await generatingPageByTypeAndId(engId, "Engineering");
  return (
    <div className="w-full h-full">
      <SingleRecords props={props} />
    </div>
  );
}
