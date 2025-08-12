import { BLOG } from "@/blog.config";
import { formatDateFmt, getDistanceFromToday, getYearMonthDay } from "./date";
import { TransferedDataProps } from "@/types";
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

export function setAllPagesGetSortedGroupedByDate(allPages) {
  let result = allPages;
  const pageSortedByDate = setPageSortedByDate(allPages);
  const pageGroupedByDate = setPageGroupedByDate(pageSortedByDate);
  result = pageGroupedByDate;

  return result;
}

export function setPageSortedByDate(obj) {
  const recordsSortByDate = Object.create(obj);

  recordsSortByDate.sort((a, b) => {
    return (
      new Date(b?.data?.date).getTime() - new Date(a?.data?.date).getTime()
    );
  });
  return recordsSortByDate;
}

export function setPageGroupedByDate(array) {
  const allrecords = {};

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

export function getMainRecentRecords(pages: any, lang: string, sliceNum = 6) {
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
  array,
  currentPage,
  cardsPerPage
) => {
  const startIndex = currentPage * cardsPerPage;
  const modArticles = array.slice(1, array.length);
  return modArticles.slice(startIndex, startIndex + cardsPerPage);
};

export const transferDataForCardProps = (page: any): TransferedDataProps => {
  return {
    title: page.data.title,
    summary: page.data.summary,
    type: page.data.type,
    subType: page.data.sub_type,
    date: page.data.date,
    author: page.data.author,
    tags: page.data.tags,
    isLocked: page.data.password !== "",
    url: page.url,
    imageUrl: page.data.pageCover,
    imageAlt: page.data.title,
  };
};

export const paginationString = (
  locale: any,
  totalPages: number,
  currentPage: number
) => {
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
  source: any,
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
