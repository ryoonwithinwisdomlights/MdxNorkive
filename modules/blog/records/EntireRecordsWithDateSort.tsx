"use client";
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import { BasicPageDivProps } from "@/types";
import { FolderClosedIcon, LockIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
/**
 * Records grouping

 * @param {*} param0
 * @returns
 */
export default function EntireRecordsWithDateSort({
  title,
  recordList,
}: BasicPageDivProps) {
  const router = useRouter();
  const { locale } = useGeneralSiteSettings();
  const handleRouter = (page: any) => {
    // if (page.data.password === "") {
    router.push(page.url);
    // }
  };
  return (
    <div key={title} className="w-full flex flex-col items-start">
      <div id={title} className=" font-semibold pb-4 text-2xl  ">
        {title}
      </div>
      <ul className="w-full pl-4">
        {recordList[title]?.map((page) => (
          <li
            key={page.data.notionId}
            className="border-l-4 border-neutral-200  hover:border-norkive-medium 
             p-2 text-xs md:text-base w-full
             text-justify    dark:hover:border-neutral-400 dark:border-neutral-400/30 "
          >
            <div
              id={page.data.notionId}
              className="flex flex-row items-start justify-between  gap-4 w-full break-all "
            >
              <div
                key={page.url}
                onClick={() => handleRouter(page)}
                className="dark:text-neutral-400
                flex flex-row justify-start items-center 
                 hover:text-neutral-400  dark:hover:text-neutral-200 overflow-x-hidden 
                 hover:underline cursor-pointer text-neutral-600"
              >
                <span className="text-norkive-medium dark:hover:text-neutral-300 ">
                  {new Date(page.data.date).toISOString().split("T")[0]}
                </span>

                <div className="flex flex-row justify-start items-center gap-2">
                  <span className="pl-2 pr-3 text-xs  ">{page.data.icon}</span>
                  <span className="  ">{page.data.title}</span>

                  {page.data.password !== "" && (
                    <div className="pl-2 text-neutral-500 dark:text-neutral-400 flex flex-row  gap-1 text-sm justify-start items-center">
                      <LockIcon className="w-3 h-3" />
                      <span className="">{locale.COMMON.LOCKED}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* 카테고리 */}
              {page.data.category && (
                <div className="flex items-center gap-1">
                  <FolderClosedIcon className="w-4 h-4" />
                  <span>{page.data.category}</span>
                </div>
              )}
            </div>
            {/* 태그 */}
            {page.data.tags && page.data.tags.length > 0 && (
              <div className="mt-4 flex items-center gap-2">
                {page.data.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 rounded-md text-xs"
                  >
                    {tag}
                  </span>
                ))}
                {page.data.tags.length > 3 && (
                  <span className="text-xs">+{page.data.tags.length - 3}</span>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
