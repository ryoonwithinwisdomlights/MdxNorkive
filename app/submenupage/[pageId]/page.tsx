import { submenuPageSource } from "@/lib/source";
import { notFound } from "next/navigation";

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
export default async function Page({ params }) {
  const { pageId } = await params;

  if (!pageId) {
    return <ErrorComponent />;
  }

  // console.log("pageId:", pageId);
  const pages = submenuPageSource.getPages();
  // console.log("pages::", pages);

  const page = pages.find((page) => {
    if (page.slugs[0] === pageId) {
      console.log("page.slugs[0]:", page.slugs[0]);
      return page;
    }
  });
  // console.log("page::", page);
  // const page = submenuPageSource.getPage(params.slug);
  if (!page) notFound();
  const { body, toc, lastEditedDate } = await page.data;
  return (
    <CustomedMDXPage
      body={body}
      toc={toc}
      date={lastEditedDate}
      page={page}
      className=""
    />
  );
}
