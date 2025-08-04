"use client";
import NotFound from "@/app/not-found";
import {
  setPageGroupedByDate2,
  setPageSortedByDate2,
} from "@/lib/notion/functions/utils";
import { getPages } from "@/lib/source";
import { isObjectNotEmpty } from "@/lib/utils/utils";
import EntireRecordsWithDateSort from "./EntireRecordsWithDateSort";
import NoRecordFound from "./NoRecordFound";
import RecordsWithMultiplesOfThree from "./RecordsWithMultiplesOfThree";
import { EntireRecordsWithDateSortWrapper } from "./EntireRecordsWithDateSortWrapper";
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import FeaturedRecords from "./FeaturedRecords";

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
  const { lang, locale } = useGeneralSiteSettings();
  const filteredPages = pages.filter(
    (page) =>
      page.data.sub_type !== "Engineering" && page.data.sub_type !== "Project"
  );

  const isAble = isObjectNotEmpty(filteredPages);
  if (!isAble) NotFound();
  const modAllPages = setAllPagesGetSortedGroupedByDate(filteredPages);
  return (
    <div className="flex flex-col md:px-10 w-full items-center dark:bg-black dark:text-neutral-300 ">
      <div className="text-start mb-6 flex flex-col gap-10 w-full">
        <div className="flex flex-col gap-2">
          <h2
            className="text-5xl  font-bold text-neutral-800
           dark:text-white 
         dark:bg-neutral-800"
          >
            General records
          </h2>
          {/* <p className="text-lg text-neutral-600 dark:text-neutral-300">
          {locale.INTRO.RECENT_RECORDS_DESC}
        </p> */}
        </div>
        {/* <hr className="w-full border-2 border-neutral-100" /> */}
        {isAble ? (
          <div className="flex flex-col gap-16 items-start w-full ">
            <FeaturedRecords sub_type="General" introText={false} />
            {/* <RecordsWithMultiplesOfThree
              filteredPages={filteredPages}
              className=""
              introText={false}
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

export default GeneralRecordPage;
