import { BLOG } from "@/blog.config";
import {
  getFilteredArrayByProperty,
  setAllPagesGetSortedGroupedByDate,
  setPageTableOfContentsByRecord,
} from "@/lib/notion/functions/function";
import {
  getGlobalRecordPageData,
  getSingleRecordPageData,
} from "@/lib/notion/serviceImpl";
import { PageBlockDataProps } from "@/types";
import { applyDataBaseProcessing } from "@/lib/notion/functions/utils";

//디렉토리별 전체글 페이지
export async function getAllRecordPageListByType({
  from,
  type,
  dateSort = true,
}: {
  from: string;
  type?: string;
  dateSort?: boolean;
}) {
  const data = await getGlobalRecordPageData({
    from,
    pageId: BLOG.NOTION_DATABASE_ID as string,
    type: type,
  });
  // if (!data) {
  //   console.error(
  //     "can`t get Notion Data ; id is: ",
  //     BLOG.NOTION_DATABASE_ID as string
  //   );
  //   return {};
  // }
  const resolvedData = applyDataBaseProcessing(data);

  // resolvedData.allPages = allPages;
  return resolvedData;
}

//레코드글 한 개 페이지
export async function getARecordPageById({
  pageId,
  type,
  from,
}: PageBlockDataProps) {
  if (!pageId || typeof pageId !== "string") {
    console.error("❌ pageId가 undefined임!", pageId);
    console.trace();
    return null;
  }

  const props = await getSingleRecordPageData({
    pageId: pageId,
    from: from,
    type: type,
  });

  if (!props || !props.page) {
    return null;
  }

  setPageTableOfContentsByRecord(props);
  // setPrevNextPages(recommendPages, props)
  return props;
}

//태그 & 카테고리 레코드 리스트 페이지
export async function getCategoryAndTagPageById({
  decodedName,
  pageProperty,
  pagenum,
}: {
  decodedName: string;
  pageProperty: string;
  pagenum: number;
}) {
  const props = await getGlobalRecordPageData({
    pageId: BLOG.NOTION_DATABASE_ID as string,
    from: `${pageProperty}-props`,
  });

  props.allPages = getFilteredArrayByProperty(
    props.allPages,
    pageProperty,
    decodedName
  );

  // Process Archive page count
  props.pageCount = props.pageCount;
  const RECORDS_PER_PAGE = BLOG.RECORD_PER_PAGE;

  // Handle pagination

  props.allPages =
    pagenum !== undefined
      ? props.allPages.slice(
          RECORDS_PER_PAGE * (pagenum - 1),
          RECORDS_PER_PAGE * pagenum
        )
      : props.allPages?.slice(0, RECORDS_PER_PAGE);

  return props;
}
