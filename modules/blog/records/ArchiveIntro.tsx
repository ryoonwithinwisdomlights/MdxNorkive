import { isObjectNotEmpty } from "@/lib/utils/utils";
import React from "react";
import AllRecords from "./AllRecords";
import NoRecordFound from "./NoRecordFound";
import HeaderSearch from "@/modules/common/components/HeaderSearch";
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import { useGlobal } from "@/lib/context/EssentialNavInfoProvider";
import { usePathname } from "next/navigation";
import { setAllPagesGetSortedGroupedByDate } from "@/lib/notion/functions/function";
import { useNav } from "@/lib/context/NavInfoProvider";

const ArchiveIntro = () => {
  const pathname = usePathname();
  const type = pathname.split("/")[1];
  const { recordList } = useNav({ from: type });
  const isAble = isObjectNotEmpty(recordList);
  const modAllPages = isAble
    ? setAllPagesGetSortedGroupedByDate(true, recordList)
    : {};
  console.log("modAllPages:", modAllPages);
  return (
    <div
      id="main-scroll-container"
      className=" dark:bg-black dark:text-neutral-300 pb-40  items-center  px-10 
    md:w-[60%] flex flex-col overflow-y-auto h-screen  scrollbar-hide overscroll-contain "
    >
      <div className="flex flex-col w-full items-center  pt-4  ">
        <div
          className="
        flex flex-col   break-words overflow "
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
