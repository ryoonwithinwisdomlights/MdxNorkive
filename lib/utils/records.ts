import { BLOG } from "@/blog.config";
import { formatDateFmt, getDistanceFromToday, getYearMonthDay } from "./date";

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
  // console.log("pages:", pages);
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
