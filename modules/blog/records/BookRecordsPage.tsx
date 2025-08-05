"use client";
import NotFound from "@/app/not-found";
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import { bookSource } from "@/lib/source";
import {
  setPageGroupedByDate2,
  setPageSortedByDate2,
} from "@/lib/utils/backup/utils";
import { isObjectNotEmpty } from "@/lib/utils/general";
import { EntireRecordsWithDateSortWrapper } from "./EntireRecordsWithDateSortWrapper";
import FeaturedRecords from "./FeaturedRecords";
import NoRecordFound from "./NoRecordFound";

export function setAllPagesGetSortedGroupedByDate(allPages) {
  let result = allPages;
  const pageSortedByDate = setPageSortedByDate2(allPages, "date");
  const pageGroupedByDate = setPageGroupedByDate2(pageSortedByDate, "date");
  result = pageGroupedByDate;

  return result;
}

const BookRecordsPage = () => {
  const pages = bookSource.getPages();
  if (!pages) NotFound();
  const { lang } = useGeneralSiteSettings();
  // console.log("BookRecordsPage::", pages);

  const isAble = isObjectNotEmpty(pages);
  if (!isAble) NotFound();
  const modAllPages = setAllPagesGetSortedGroupedByDate(pages);
  return (
    <div className="flex flex-col md:px-10 w-full items-center dark:bg-black dark:text-neutral-300 ">
      <div className="text-start mb-6 flex flex-col gap-10 w-full">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col  ">
            <div className="flex flex-row justify-end text-sm  text-neutral-600 font-extralight dark:text-neutral-200  pr-3">
              Take a look all the Book Records&nbsp;&nbsp;
            </div>
            <div className="flex flex-row justify-end text-sm   text-neutral-600 font-extralight dark:text-neutral-200  pr-3">
              based on all the Words and World of sentences.
            </div>
            <div className="text-7xl hover:underline dark:text-neutral-100 flex flex-row justify-end ">
              Book Records.
            </div>
            <div className=" dark:text-neutral-200 text-right md:px-2 text-neutral-700 mt-1  my-2  text-2xl ">
              {lang === "kr-KR" ? (
                <>
                  언어와 문장들로
                  <span className="font-semibold "> 이루어진</span>
                  <span className=" dark:text-[#ffffff] font-bold">
                    &nbsp;아카이브.
                  </span>
                </>
              ) : (
                <>
                  <span className="font-semibold ">Archive</span> of
                  <span className="font-semibold "> All Books&nbsp;</span>
                  connected by small and big words.
                </>
              )}
            </div>
          </div>
        </div>

        {isAble ? (
          <div className="flex flex-col gap-16 items-start w-full ">
            <FeaturedRecords
              type="BOOKS"
              subType={true}
              records={pages}
              introTrue={false}
            />
            {/* <RecordsWithMultiplesOfThree
              filteredPages={filteredPages}
              className=""
              introTrue={false}
            /> */}

            <EntireRecordsWithDateSortWrapper
              modAllPages={modAllPages}
              className=""
            />
          </div>
        ) : (
          <NoRecordFound />
        )}
      </div>
    </div>
  );
};

export default BookRecordsPage;
