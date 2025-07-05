"use client";
import { useGlobal } from "@/lib/context/EssentialNavInfoProvider";
import { AllRecordsProps } from "@/types";
import { LockIcon } from "lucide-react";

/**
 * Records grouping

 * @param {*} param0
 * @returns
 */
export default function AllRecords({ title, recordList }: AllRecordsProps) {
  const { handleRouter } = useGlobal({});
  return (
    <div key={title} className="w-full flex flex-col items-center">
      <div
        id={title}
        className="pt-10  text-[#cbcac4e2] font-semibold pb-4 text-2xl  "
      >
        {title}
      </div>
      <ul>
        {recordList[title]?.map((page) => (
          <li
            key={page.id}
            className="border-l-4 border-[#f1efe9e2]  hover:border-[#cbcac4e2] 
             p-2 text-xs md:text-base 
             text-justify  hover:scale-x-105  dark:hover:border-neutral-400 dark:border-neutral-400/30 transform duration-500"
          >
            <div
              id={page?.publishDay}
              className="flex flex-row items-start justify-start  "
            >
              <div
                onClick={() => {
                  handleRouter(page);
                }}
                className="dark:text-neutral-400
                 hover:text-neutral-400  dark:hover:text-neutral-200 overflow-x-hidden 
                 hover:underline cursor-pointer text-neutral-600"
              >
                <span className="text-[#cbcac4e2] dark:hover:text-neutral-300 ">
                  {page.date?.start_date}
                </span>

                <span className="pl-2 pr-3 text-xs  ">{page.pageIcon}</span>
                <span className=" ">{page.title}</span>
              </div>
              <span className="pl-2 pr-3  flex flex-row justify-start items-center text-neutral-500">
                &nbsp;
                {page.password !== "" && (
                  <>
                    <LockIcon className="mr-1 w-3" />
                    비공개
                  </>
                )}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
