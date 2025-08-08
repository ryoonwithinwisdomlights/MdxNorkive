"use client";
import NotFound from "@/app/not-found";
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import { recordSource } from "@/lib/source";
import { setPageGroupedByDate, setPageSortedByDate } from "@/lib/utils/records";
import { isObjectNotEmpty } from "@/lib/utils/general";
import { RecordsWrapper } from "@/modules/page/components/RecordsWrapper";
import FeaturedRecords from "@/modules/page/components/FeaturedRecords";
import NoRecordFound from "@/modules/page/components/NoRecordFound";

export function setAllPagesGetSortedGroupedByDate(allPages) {
  let result = allPages;
  const pageSortedByDate = setPageSortedByDate(allPages);

  const pageGroupedByDate = setPageGroupedByDate(pageSortedByDate);
  result = pageGroupedByDate;

  return result;
}

const GeneralRecordPage = () => {
  const pages = recordSource.getPages();
  if (!pages) NotFound();
  const { lang } = useGeneralSiteSettings();

  const isAble = isObjectNotEmpty(pages);
  if (!isAble) NotFound();
  const modAllPages = setAllPagesGetSortedGroupedByDate(pages);
  return (
    <div className="flex flex-col  w-full items-center dark:bg-black dark:text-neutral-300 ">
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
                  <span className="font-semibold "> All Records&nbsp;</span>
                  connected by small and big waves.
                </>
              )}
            </div>
          </div>
        </div>

        {isAble ? (
          <div className="flex flex-col gap-16 items-start w-full ">
            <FeaturedRecords
              type="RECORDS"
              subType={true}
              records={pages}
              introTrue={false}
            />
            <RecordsWrapper
              modAllPages={modAllPages}
              className="w-full flex flex-col justify-center  items-center gap-10 bg-opacity-30 rounded-lg dark:bg-black dark:bg-opacity-70"
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
