import { BLOG } from "@/blog.config";
import { PageBlockDataProps } from "@/types";
import { getGlobalData } from "@/lib/data/actions/notion/getNotionData";
import { getRecordBlockMap } from "@/lib/data/service/getPostBlocks";
import {
  getExcludeMenuPages,
  getFilteredArrayByProperty,
  getRecommendPage,
  getArchiveRecords,
} from "@/lib/data/service/notion-service";
import { getPageTableOfContents } from "notion-utils";

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
  const archiveRecords = getArchiveRecords(dateSort, props);
  props.archiveRecords = archiveRecords;
  delete props.allPages;
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

  // Find archives in list
  props.record = props?.allPages?.find((item) => {
    return item.id === pageId;
  });
  return props;
}

export async function setPrevNextRecommendInRecordPage(props) {
  let lockedRecord = true;
  // if (!props?.records?.blockMap) {
  props.record.blockMap = await getRecordBlockMap({
    pageId: props.record.id,
  });
  // }

  const recommendRecords = getExcludeMenuPages({
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
      Number(BLOG.archive_recommend_count)
    );
  } else {
    props.prev = null;
    props.next = null;
    props.recommendRecords = [];
  }

  if (props.record?.password && props.record?.password !== "") {
    lockedRecord = true;
  } else {
    lockedRecord = false;
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

  // if (!lockedRecord) {
  //   console.log("props.tableOfContents:", props.record.tableOfContents);
  // }

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
  // Process article page count
  props.recordCount = props.records.length;
  const records_PER_PAGE = BLOG.archive_per_page;

  // Handle pagination

  props.records =
    pagenum !== undefined
      ? props.records.slice(
          records_PER_PAGE * (pagenum - 1),
          records_PER_PAGE * pagenum
        )
      : props.records?.slice(0, records_PER_PAGE);

  delete props.allPages;

  return props;
}
