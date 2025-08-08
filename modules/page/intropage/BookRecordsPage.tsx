"use client";
import NotFound from "@/app/not-found";
import { bookSource } from "@/lib/source";
import {
  setPageGroupedByDate2,
  setPageSortedByDate2,
} from "@/lib/utils/backup/utils";
import { isObjectNotEmpty } from "@/lib/utils/general";
import BookRecordsBody from "./body/BookRecordsBody";
import BookIntro from "./intro/BookIntro";

export function setAllPagesGetSortedGroupedByDate(allPages) {
  let result = allPages;
  const pageSortedByDate = setPageSortedByDate2(allPages);
  const pageGroupedByDate = setPageGroupedByDate2(pageSortedByDate);
  result = pageGroupedByDate;

  return result;
}

const BookRecordsPage = () => {
  const pages = bookSource.getPages();
  if (!pages) NotFound();

  const isAble = isObjectNotEmpty(pages);
  const modAllPages = setAllPagesGetSortedGroupedByDate(pages);
  return (
    <div className="w-full max-w-6xl mx-auto  flex flex-col items-center p-10 gap-10">
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
