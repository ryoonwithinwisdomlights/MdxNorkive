import { BLOG } from "@/blog.config";
import {
  getFilteredArrayByProperty,
  setAllPagesGetSortedGroupedByDate,
  setPageTableOfContentsByRecord,
} from "@/lib/db/function";
import {
  getGlobalRecordPageData,
  getSingleRecordPageData,
} from "@/lib/db/serviceImpl";
import { PageBlockDataProps } from "@/types";
import { applyDataBaseProcessing } from "./utils";

//page.tsx에서 요청하는 함수들
//layout init용
export default async function initArchiveGlobalData(from: string = "main") {
  const db = await getGlobalRecordPageData({
    pageId: BLOG.NOTION_DATABASE_ID as string,
    from,
  });
  if (!db) {
    console.error(
      "can`t get Notion Data ; Which id is: ",
      BLOG.NOTION_DATABASE_ID as string
    );
    return {};
  }
  const modDB = applyDataBaseProcessing(db);
  return modDB;
}

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
  const props = await getGlobalRecordPageData({
    from,
    pageId: BLOG.NOTION_DATABASE_ID as string,
    type: type,
  });

  const allPages = setAllPagesGetSortedGroupedByDate(dateSort, props);
  props.allPages = allPages;
  return props;
}

//레코드글 한 개 페이지
export async function getSingleRecordPageByPageId({
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
export async function getCategoryAndTagById({
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
