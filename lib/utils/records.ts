import { BLOG } from "@/blog.config";
import { formatDateFmt, getDistanceFromToday, getYearMonthDay } from "./date";
import { TransferedDataProps, SerializedPage, LocaleDict } from "@/types";
import { DocsLayoutProps } from "fumadocs-ui/layouts/docs";

/**
 * 사용자 친화적 슬러그 생성 (sub_type-title, 한글/영어/숫자만, 중복 방지)
 */
export function generateUserFriendlySlug(
  subType: string,
  title: string,
  existingSlugs: Set<string>
) {
  let base = subType.toLowerCase();
  let safeTitle = title
    .replace(/[^a-zA-Z0-9가-힣]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 30);
  let slug = `${base}-${safeTitle}`;
  let count = 1;
  let uniqueSlug = slug;
  while (existingSlugs.has(uniqueSlug)) {
    uniqueSlug = `${slug}-${count}`;
    count++;
  }
  existingSlugs.add(uniqueSlug);
  return uniqueSlug;
}

export function setAllPagesGetSortedGroupedByDate(
  allPages: SerializedPage[]
): Record<string, SerializedPage[]> {
  const pageSortedByDate = setPageSortedByDate(allPages);
  const pageGroupedByDate = setPageGroupedByDate(pageSortedByDate);
  return pageGroupedByDate;
}

export function setPageSortedByDate(obj: SerializedPage[]): SerializedPage[] {
  const recordsSortByDate = [...obj];

  recordsSortByDate.sort((a, b) => {
    return (
      new Date(b?.data?.date).getTime() - new Date(a?.data?.date).getTime()
    );
  });
  return recordsSortByDate;
}

export function setPageGroupedByDate(
  array: SerializedPage[]
): Record<string, SerializedPage[]> {
  const allrecords: Record<string, SerializedPage[]> = {};

  array.forEach((record) => {
    const date = formatDateFmt(record.data.date, "yyyy-MM");
    if (allrecords[date]) {
      allrecords[date].push(record);
    } else {
      allrecords[date] = [record];
    }
  });
  return allrecords;
}

export function getMainRecentRecords(
  pages: SerializedPage[],
  lang: string,
  sliceNum = 6
) {
  const sortedPage = pages
    .sort((a, b) => {
      return (
        new Date(b?.data?.date).getTime() - new Date(a?.data?.date).getTime()
      );
    })
    .slice(0, sliceNum);

  return sortedPage.map((page, index) => ({
    id: index,
    date: getYearMonthDay(page.data.date, lang),
    type: page.data.type,
    subType: page.data.sub_type,
    category: page.data.category,
    distanceFromToday: getDistanceFromToday(page.data.date, lang),
    title: page.data.title,
    pageCover: page.data.pageCover,
    description: page.data.summary?.slice(0, 100) || "",
    tags: page.data.tags,
    url: page.url,
    author: BLOG.AUTHOR,
    password: page.data.password,
  }));
}

export const getCurrentRecordsWithPagination = (
  array: SerializedPage[],
  currentPage: number,
  cardsPerPage: number
): SerializedPage[] => {
  const startIndex = currentPage * cardsPerPage;
  const modArticles = array.slice(1, array.length);
  return modArticles.slice(startIndex, startIndex + cardsPerPage);
};

export const transferDataForCardProps = (
  page: SerializedPage
): TransferedDataProps => {
  // 안전한 데이터 접근을 위한 헬퍼 함수
  const safeGet = (
    obj: Record<string, unknown>,
    path: string,
    defaultValue: unknown = ""
  ) => {
    try {
      return (
        path
          .split(".")
          .reduce((current: any, key: string) => current?.[key], obj) ??
        defaultValue
      );
    } catch {
      return defaultValue;
    }
  };

  return {
    title: safeGet(page, "data.title", "제목 없음"),
    summary: safeGet(page, "data.summary", ""),
    type: safeGet(page, "data.type", "RECORDS"),
    subType: safeGet(page, "data.sub_type", ""),
    date: safeGet(page, "data.date", ""),
    author: safeGet(page, "data.author", ""),
    tags: safeGet(page, "data.tags", []),
    isLocked: safeGet(page, "data.password", "") !== "",
    url: safeGet(page, "url", "#"),
    imageUrl: safeGet(page, "data.pageCover", ""),
    imageAlt: safeGet(page, "data.title", "이미지"),
  };
};

export const paginationString = (
  locale: LocaleDict,
  totalPages: number,
  currentPage: number
): string => {
  if (locale.LOCALE === "kr-KR") {
    return `${totalPages}${locale.PAGINATION.PAGE} ${locale.PAGINATION.OF} ${
      currentPage + 1
    }${locale.PAGINATION.PAGE} `;
  } else {
    return `${locale.PAGINATION.PAGE} ${currentPage + 1} ${
      locale.PAGINATION.OF
    } ${totalPages}`;
  }
};

export const pageOptionsGenerator = (
  source: { getPageTree: () => any },
  title?: string
): DocsLayoutProps => {
  const baseOptions: Partial<DocsLayoutProps> = {
    nav: {
      title: title,
      //   <>
      //   <LazyImage
      //     src={BLOG.AVATAR}
      //     width={24}
      //     height={24}
      //     alt={BLOG.AUTHOR}
      //     className="mr-2  "
      //   />
      //   {BLOG.TITLE}
      // </>
    },
    links: [],
  };

  return {
    ...baseOptions,
    tree: source.getPageTree(),
    nav: {
      ...baseOptions.nav,
      transparentMode: "none",
    },
  };
};
