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

const GeneralRecordPage = () => {
  const pages = getPages();

  if (!pages) NotFound();
  console.log("pages::", pages);
  const filteredPages = pages.filter(
    (page) =>
      page.data.sub_type !== "Engineering" && page.data.sub_type !== "Project"
  );
  const isAble = isObjectNotEmpty(filteredPages);
  const modAllPages = setAllPagesGetSortedGroupedByDate(filteredPages);
  return (
    <div
      className=" dark:bg-black dark:text-neutral-300 pb-40  items-center  px-10 
   flex flex-col w-full"
    >
      {isAble ? (
        <div className="flex flex-row items-center w-full ">
          <div className="w-full  flex flex-col justify-center  items-center gap-10 bg-opacity-30 rounded-lg md:pl-10 dark:bg-black dark:bg-opacity-70 ">
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

export default GeneralRecordPage;
