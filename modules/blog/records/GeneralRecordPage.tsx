"use client";
import { useGlobal } from "@/lib/context/EssentialNavInfoProvider";
import { setAllPagesGetSortedGroupedByDate } from "@/lib/notion/functions/function";
import { isObjectNotEmpty } from "@/lib/utils/utils";
import { usePathname } from "next/navigation";
import AllRecords from "./AllRecords";
import NoRecordFound from "./NoRecordFound";

const GeneralRecordPage = () => {
  const pathname = usePathname();
  const type = pathname.split("/")[1];

  const { allPages } = useGlobal({ from: type });
  const isAble = isObjectNotEmpty(allPages);
  const modAllPages = isAble
    ? setAllPagesGetSortedGroupedByDate(true, allPages)
    : {};
  return (
    <div
      id="main-scroll-container"
      className=" dark:bg-black dark:text-neutral-300 pb-40  items-center  px-10 
    md:w-[60%] flex flex-col overflow-y-auto h-screen  scrollbar-hide overscroll-contain "
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
