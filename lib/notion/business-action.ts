import { BLOG } from "@/blog.config";
import {
  getAllPagesWithoutMenu,
  getFilteredArrayByProperty,
  getRecommendPage,
  setAllPagesGetSortedGroupedByDate,
  setPageTableOfContentsByRecord,
} from "@/lib/notion/function";
import { getGlobalData, getOneRecordPageData } from "@/lib/notion/interface";
import { PageBlockDataProps } from "@/types";
import { getRecordBlockMapWithRetry } from "./data/getPageWithRetry";

export default async function initArchiveGlobalData(from: string = "main") {
  const props = await getGlobalData({
    pageId: BLOG.NOTION_DATABASE_ID as string,
    from: from,
  });
  return props;
}

//전체페이지
export async function getAllPageDataListByType({
  from,
  type,
  dateSort = true,
}: {
  from: string;
  type?: string;
  dateSort?: boolean;
}) {
  const props = await getGlobalData({
    from,
    pageId: BLOG.NOTION_DATABASE_ID as string,
    type: type,
  });

  const archivedPages = setAllPagesGetSortedGroupedByDate(dateSort, props);
  props.archivedPages = archivedPages;
  delete props.allPages;
  return props;
}

//1개페이지
export async function getPageDataByTypeAndId({
  pageId,
  type,
  from,
}: PageBlockDataProps) {
  const props = await getOneRecordPageData({
    pageId: pageId,
    from: from,
    type: type,
  });
  if (!props) {
    return null;
  }
  if (!props.page) {
    return null;
  }
  setPageTableOfContentsByRecord(props);

  const recommendPages = getAllPagesWithoutMenu({
    arr: props?.allPages,
  });

  if (recommendPages && recommendPages.length > 0) {
    const index = recommendPages.indexOf(props.page);
    props.page.prev =
      recommendPages.slice(index - 1, index)[0] ?? recommendPages.slice(-1)[0];
    props.page.next =
      recommendPages.slice(index + 1, index + 2)[0] ?? recommendPages[0];
    props.page.recommendPages = getRecommendPage(
      props.page,
      recommendPages,
      Number(BLOG.PAGE_RECOMMEND_COUNT)
    );
  } else {
    props.page.prev = null;
    props.page.next = null;
    props.page.recommendPages = [];
  }
  // console.log("tableOfContents::::", props.page.tableOfContents);
  return props;
}

/**
 * 개별 레코드페이지 정보를 반환하는 메소드
 * 전체 아카이브에서 인자값으로 전해지는 pageId에 해당하는 1개의 레코드를 가져온다.
 * 2024.12.23 added for app router's [id] page.
 * @param {*} pageId
 * @param {*} from
 * @returns
 */
export async function getRecordPageDataById({
  pageId,
  from,
}: PageBlockDataProps) {
  const props = await getGlobalData({
    pageId: BLOG.NOTION_DATABASE_ID as string,
    from: from,
  });
  if (!props.record) {
    return null;
  }

  props.record.blockMap = await getRecordBlockMapWithRetry({
    pageId: props.record.id,
  });

  const recommendPages = getAllPagesWithoutMenu({
    arr: props?.allPages,
  });

  if (recommendPages && recommendPages.length > 0) {
    const index = recommendPages.indexOf(props.record);
    props.prev =
      recommendPages.slice(index - 1, index)[0] ?? recommendPages.slice(-1)[0];
    props.next =
      recommendPages.slice(index + 1, index + 2)[0] ?? recommendPages[0];
    props.recommendPages = getRecommendPage(
      props.record,
      recommendPages,
      Number(BLOG.PAGE_RECOMMEND_COUNT)
    );
  } else {
    props.prev = null;
    props.next = null;
    props.recommendPages = [];
  }
  return props;
}

export async function getCategoryAndTagById({
  decodedName,
  pageProperty,
  pagenum,
}: {
  decodedName: string;
  pageProperty: string;
  pagenum: number;
}) {
  const props = await getGlobalData({
    pageId: BLOG.NOTION_DATABASE_ID as string,
    from: `${pageProperty}-props`,
  });

  props.allPages = getFilteredArrayByProperty(
    props.allPages,
    pageProperty,
    decodedName
  );

  // Process Archive page count
  props.pageCount = props.allPages.length;
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
