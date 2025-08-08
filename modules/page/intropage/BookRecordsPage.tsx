"use client";
import NotFound from "@/app/not-found";
import { bookSource } from "@/lib/source";
import { setPageGroupedByDate, setPageSortedByDate } from "@/lib/utils/records";
import { isObjectNotEmpty } from "@/lib/utils/general";
import BookRecordsBody from "./body/BookRecordsBody";
import BookIntro from "./intro/BookIntro";

export function setAllPagesGetSortedGroupedByDate(allPages) {
  let result = allPages;
  const pageSortedByDate = setPageSortedByDate(allPages);
  const pageGroupedByDate = setPageGroupedByDate(pageSortedByDate);
  result = pageGroupedByDate;

  return result;
}

const BookRecordsPage = () => {
  const pages = bookSource.getPages();
  if (!pages) NotFound();

  const isAble = isObjectNotEmpty(pages);
  const modAllPages = setAllPagesGetSortedGroupedByDate(pages);
  return (
    <div className="w-full  max-w-6xl mx-auto flex flex-col items-center p-10 gap-10">
      <BookIntro />
      <BookRecordsBody
        modAllPages={modAllPages}
        isAble={isAble}
        pages={pages}
      />
    </div>
  );
};

export default BookRecordsPage;
