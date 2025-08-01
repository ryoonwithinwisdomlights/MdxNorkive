"use client";
import {
  setPageGroupedByDate2,
  setPageSortedByDate2,
} from "@/lib/notion/functions/utils";
import { getPages } from "@/lib/source";
import { isObjectNotEmpty } from "@/lib/utils/utils";
import AllRecords from "./AllRecords";
import NoRecordFound from "./NoRecordFound";
import NotFound from "@/app/not-found";

export function setAllPagesGetSortedGroupedByDate(allPages) {
  let result = allPages;
  const pageSortedByDate = setPageSortedByDate2(allPages, "date");
  const pageGroupedByDate = setPageGroupedByDate2(pageSortedByDate, "date");
  result = pageGroupedByDate;

  return result;
}

const ArchiveIntro = () => {
  const pages = getPages();

  if (!pages) NotFound();
  const isAble = isObjectNotEmpty(pages);
  const modAllPages = setAllPagesGetSortedGroupedByDate(pages);
  return (
    <div className="w-full flex flex-col items-center ">
      <div className="flex flex-col w-full items-center  pt-10  ">
        <div
          className="
        flex flex-col break-words overflow "
        >
          <div className="  dark:text-neutral-300 flex flex-col  ">
            <div className="text-1xl flex flex-row justify-start ml-2 text-neutral-600 dark:text-neutral-300 ">
              archive | recorded | in notion
            </div>
            <div
              className="text-7xl font-semibold text-black dark:text-white flex flex-row justify-start underline 
         decoration-black dark:decoration-neutral-100 "
            >
              Norkive
            </div>
            <div className="mt-2 flex flex-row justify-start text-sm text-neutral-800 font-extralight dark:text-neutral-200  ">
              Browsing all your archives written and recored in Notion.
            </div>
          </div>
        </div>
      </div>
      {isAble ? (
        <div className="flex flex-row items-center w-full ">
          <div className="w-full mt-20 flex flex-col justify-center  items-center gap-10 bg-opacity-30 rounded-lg md:pl-10 dark:bg-black dark:bg-opacity-70 ">
            {Object.keys(modAllPages)?.map((title, index) => (
              <AllRecords key={index} title={title} recordList={modAllPages} />
            ))}
          </div>
        </div>
      ) : (
        <NoRecordFound />
      )}
    </div>
  );
};

export default ArchiveIntro;
