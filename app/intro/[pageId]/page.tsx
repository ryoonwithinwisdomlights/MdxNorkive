import { BLOG } from "@/blog.config";
import SingleRecords from "@/components/records/SingleRecords";
import { generatingPageByTypeAndId } from "@/lib/notion/getNotionData";

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
    return <div>Invalid pageId ID</div>;
  }

  const props = await generatingPageByTypeAndId(pageId, "SubMenuPage");

  return (
    <div className="w-full h-full">
      <SingleRecords props={props} />
    </div>
  );
}
