import { notFound } from "next/navigation";
import { engineeringSource, submenuPageSource } from "@/lib/source";
import CustomedMDXPage from "@/components/CustomedMDXPage";
import ErrorComponent from "@/modules/common/components/shared/ErrorComponent";

// export async function generateStaticParams() {
//   const records = [{ pageId: "341eb5c0337801da209c34c90bc3377" }];
//   return records.map((record) => ({
//     pageId: record.pageId,
//   }));
// }

export const dynamic = "force-static";

// `generateStaticParams`가 반환한 `params`를 사용하여 이 페이지의 여러 버전이 정적으로 생성됩니다.
export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  let slug = params.slug;
  if (slug) {
    slug = slug.map((s) => decodeURIComponent(s));
  }

  // console.log("pageId:", pageId);
  // console.log("page::", page);

  return (
    <CustomedMDXPage
      resource={"submenupage"}
      className="bg-pink-200 p-10 md:p-0"
      slug={params.slug}
    />
  );
}
