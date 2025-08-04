"use client";
import NotFound from "@/app/not-found";
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import { getPages } from "@/lib/source";
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
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col  ">
            <div className="flex flex-row justify-end text-sm  text-neutral-600 font-extralight dark:text-neutral-200  pr-3">
              Take a look all the General Records&nbsp;&nbsp;
            </div>
            <div className="flex flex-row justify-end text-sm   text-neutral-600 font-extralight dark:text-neutral-200  pr-3">
              based on all the waves Life has been comming through.
            </div>
            <div className="text-7xl hover:underline dark:text-neutral-100 flex flex-row justify-end ">
              Gerneral Records.
            </div>
            <div className=" dark:text-neutral-200 text-right md:px-2 text-neutral-700 mt-1  my-2  text-2xl ">
              {lang === "kr-KR" ? (
                <>
                  일상의 작은 조각들로
                  <span className="font-semibold "> 이루어진</span>
                  <span className=" dark:text-[#ffffff] font-bold">
                    &nbsp;아카이브.
                  </span>
                </>
              ) : (
                <>
                  <span className="font-semibold ">Archive</span> of
                  <span className="font-semibold "> All projects&nbsp;</span>
                  connected by small and big learnings
                </>
              )}
            </div>
          </div>
        </div>

        {/* <div className="flex flex-col gap-2">
          <h2
            className="text-5xl  font-bold text-neutral-800
           dark:text-white 
         dark:bg-neutral-800"
          >
            General records
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-300">
          {locale.INTRO.RECENT_RECORDS_DESC}
        </p>
        </div> */}
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
