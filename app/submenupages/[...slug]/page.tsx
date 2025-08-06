import CustomedMDXPage from "@/components/CustomedMDXPage";

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

  console.log("slug", params.slug);
  return (
    <CustomedMDXPage
      resource={"submenupage"}
      className=" p-4 md:p-0"
      slug={params.slug}
    />
  );
}
