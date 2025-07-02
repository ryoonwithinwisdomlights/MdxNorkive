import { isObjectNotEmpty } from "@/lib/utils/utils";
import React from "react";
import AllRecords from "./AllRecords";
import NoRecordFound from "./NoRecordFound";
import HeaderSearch from "@/modules/common/components/HeaderSearch";

const ArchiveIntro = ({ archiveRecords }) => {
  const isAble = isObjectNotEmpty(archiveRecords);
  return (
    <div
      id="main-scroll-container"
      className=" dark:bg-black dark:text-neutral-300 pb-40  items-center  px-10 py-10 
    md:w-[60%] flex flex-col overflow-y-auto h-screen  scrollbar-hide overscroll-contain "
    >
      <div className="flex flex-col w-full items-center pt-4  ">
        <div
          className="
        flex flex-col justify-end  break-words overflow "
        >
          <div className="  dark:text-neutral-300 flex flex-col justify-end ">
            <div className="text-1xl flex flex-row justify-end mr-2 text-neutral-600 dark:text-neutral-300 ">
              archive | recorded | in notion
            </div>
            <div
              className="text-7xl font-semibold text-black dark:text-white flex flex-row justify-end underline 
         decoration-black dark:decoration-neutral-100 "
            >
              Norkive
            </div>
            <div className="mt-2 flex flex-row justify-end text-sm text-neutral-800 font-extralight dark:text-neutral-200  ">
              Browsing all your archives written and recored in Notion.
            </div>
          </div>
        </div>
      </div>
      {isAble ? (
        <div className="flex flex-row items-center w-full ">
          <div className="w-full mt-20 flex flex-col justify-center  items-center gap-10 bg-opacity-30 rounded-lg md:pl-10 dark:bg-black dark:bg-opacity-70 ">
            {Object.keys(archiveRecords)?.map((title, index) => (
              <AllRecords
                key={index}
                title={title}
                recordList={archiveRecords}
              />
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
