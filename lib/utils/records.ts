import { BLOG } from "@/blog.config";
import { getDistanceFromToday, getYearMonthDay } from "./date";

export function getMainRecentArticles(pages: any, lang: string, sliceNum = 6) {
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
    distanceFromToday: getDistanceFromToday(page.data.date, lang),
    title: page.data.title,
    pageCover: page.data.pageCover,
    description: page.data.summary?.slice(0, 100) || "",
    gradient: "from-blue-400 to-purple-500",
    tags: page.data.tags,
    url: page.url,
    author: BLOG.AUTHOR,
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
