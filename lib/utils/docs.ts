import { BLOG } from "@/blog.config";
import { formatDateFmt, getDistanceFromToday, getYearMonthDay } from "./date";
import { TransferedDataProps, SerializedPage, LocaleDict } from "@/types";
import { DocsLayoutProps } from "fumadocs-ui/layouts/docs";

import { DOCS_CONFIG } from "@/config/docs.config";
import {
  generalsSource,
  portfoliosSource,
  submenuPageSource,
  techsSource,
} from "@/lib/source";
import { Root } from "fumadocs-core/page-tree";

export function getDocsResource(resource: string) {
  if (resource === DOCS_CONFIG.DOCS_TYPE.GENERALS) return generalsSource;
  if (resource === DOCS_CONFIG.DOCS_TYPE.TECHS) return techsSource;
  if (resource === DOCS_CONFIG.DOCS_TYPE.PORTFOLIOS) return portfoliosSource;
  if (resource === DOCS_CONFIG.DOCS_TYPE.SUBMENU_PAGES)
    return submenuPageSource;
  else return null;
}

export function setAllPagesGetSortedGroupedByDate(
  allPages: SerializedPage[]
): Record<string, SerializedPage[]> {
  const pageSortedByDate = setPageSortedByDate(allPages);
  const pageGroupedByDate = setPageGroupedByDate(pageSortedByDate);
  return pageGroupedByDate;
}

export function setPageSortedByDate(obj: SerializedPage[]): SerializedPage[] {
  const docsSortByDate = [...obj];

  docsSortByDate.sort((a, b) => {
    return (
      new Date(b?.data?.date).getTime() - new Date(a?.data?.date).getTime()
    );
  });
  return docsSortByDate;
}

export function setPageGroupedByDate(
  array: SerializedPage[]
): Record<string, SerializedPage[]> {
  const alldocs: Record<string, SerializedPage[]> = {};

  array.forEach((doc) => {
    const date = formatDateFmt(doc.data.date, "yyyy-MM");
    if (alldocs[date]) {
      alldocs[date].push(doc);
    } else {
      alldocs[date] = [doc];
    }
  });
  return alldocs;
}

export function getMainRecentDocs(
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
    docType: page.data.doc_type,
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

export const getCurrentDocsWithPagination = (
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
    type: safeGet(page, "data.type", DOCS_CONFIG.DOCS_TYPE.GENERALS),
    docType: safeGet(page, "data.doc_type", ""),
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

export const pageOptionsGenerator = <T = unknown>(
  source: { getPageTree: () => Root },
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
    tree: source.getPageTree() as Root,
    nav: {
      ...baseOptions.nav,
      transparentMode: "none",
    },
  };
};
