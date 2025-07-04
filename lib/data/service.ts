import { BLOG } from "@/blog.config";
import { getRecordBlockMapWithRetry } from "@/lib/data/data";
import {
  getAllSortedAndGroupedRecords,
  getFilteredArrayByProperty,
  getPageArrayWithOutMenu,
  getRecommendPage,
  setPageTableOfContentsByRecord,
} from "@/lib/data/function";
import { getGlobalData, getOneRecordPageData } from "@/lib/data/interface";
import { PageBlockDataProps } from "@/types";
import { getPageTableOfContents } from "notion-utils";

export default async function initGlobalNotionData(from: string = "main") {
  const props = await getGlobalData({
    pageId: BLOG.NOTION_DATABASE_ID as string,
    from: from,
  });
  return props;
}

// 각 메뉴의 첫 메인 페이지용 메소드
// 전체 아카이브에서 인자값으로 전해지는 타입에 해당하는 여러개의 레코드를 가져온다.
export async function getRecordPageListDataByType({
  from = "records",
  type,
  dateSort = true,
}: {
  from: string;
  type?: string;
  dateSort?: boolean;
}) {
  const props = await getGlobalData({
    pageId: BLOG.NOTION_DATABASE_ID as string,
    type: type,
  });

  const archiveRecords = getAllSortedAndGroupedRecords(dateSort, props);
  props.archiveRecords = archiveRecords;
  delete props.allPages;
  return props;
}

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
  if (!props.record) {
    return null;
  }
  setPageTableOfContentsByRecord(props);

  const recommendRecords = getPageArrayWithOutMenu({
    arr: props?.allRecords,
  });

  if (recommendRecords && recommendRecords.length > 0) {
    const index = recommendRecords.indexOf(props.record);
    props["prev"] =
      recommendRecords.slice(index - 1, index)[0] ??
      recommendRecords.slice(-1)[0];
    props["next"] =
      recommendRecords.slice(index + 1, index + 2)[0] ?? recommendRecords[0];
    props["recommendRecords"] = getRecommendPage(
      props.record,
      recommendRecords,
      Number(BLOG.RECORD_RECOMMEND_COUNT)
    );
  } else {
    props["prev"] = null;
    props["next"] = null;
    props["recommendRecords"] = [];
  }

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

  const recommendRecords = getPageArrayWithOutMenu({
    arr: props?.allPages,
  });

  if (recommendRecords && recommendRecords.length > 0) {
    const index = recommendRecords.indexOf(props.record);
    props.prev =
      recommendRecords.slice(index - 1, index)[0] ??
      recommendRecords.slice(-1)[0];
    props.next =
      recommendRecords.slice(index + 1, index + 2)[0] ?? recommendRecords[0];
    props.recommendRecords = getRecommendPage(
      props.record,
      recommendRecords,
      Number(BLOG.RECORD_RECOMMEND_COUNT)
    );
  } else {
    props.prev = null;
    props.next = null;
    props.recommendRecords = [];
  }
  return props;
}

export async function setPrevNextRecommendInRecordPage(props) {
  props.record.blockMap = await getRecordBlockMapWithRetry({
    pageId: props.record.id,
  });
  const recommendRecords = getPageArrayWithOutMenu({
    arr: props?.allPages,
  });

  if (recommendRecords && recommendRecords.length > 0) {
    const index = recommendRecords.indexOf(props.record);
    props.prev =
      recommendRecords.slice(index - 1, index)[0] ??
      recommendRecords.slice(-1)[0];
    props.next =
      recommendRecords.slice(index + 1, index + 2)[0] ?? recommendRecords[0];
    props.recommendRecords = getRecommendPage(
      props.record,
      recommendRecords,
      Number(BLOG.RECORD_RECOMMEND_COUNT)
    );
  } else {
    props.prev = null;
    props.next = null;
    props.recommendRecords = [];
  }

  if (props.record?.password && props.record?.password !== "") {
  } else {
    if (props.record?.blockMap?.block) {
      props.record.content = Object.keys(props.record.blockMap.block).filter(
        (key) =>
          props.record.blockMap.block[key]?.value?.parent_id === props.record.id
      );
      props.record.tableOfContents = getPageTableOfContents(
        props.record,
        props.record.blockMap
      );
    } else {
      props.record.tableOfContents = [];
    }
  }

  return props;
}

export async function getCategoryAndTagById(
  decodedPropertyId,
  pageProperty,
  pagenum
) {
  const props = await getGlobalData({
    pageId: BLOG.NOTION_DATABASE_ID as string,
    from: `${pageProperty}-props`,
  });

  props.records = getFilteredArrayByProperty(
    props.records,
    pageProperty,
    decodedPropertyId
  );
  // Process Archive page count
  props.recordCount = props.records.length;
  const RECORDS_PER_PAGE = BLOG.RECORD_PER_PAGE;

  // Handle pagination

  props.records =
    pagenum !== undefined
      ? props.records.slice(
          RECORDS_PER_PAGE * (pagenum - 1),
          RECORDS_PER_PAGE * pagenum
        )
      : props.records?.slice(0, RECORDS_PER_PAGE);

  delete props.allPages;

  return props;
}
