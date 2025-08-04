"use client";
import { BasicPageDivProps } from "@/types";
import { FolderClosedIcon, LockIcon } from "lucide-react";
import Link from "next/link";
/**
 * Records grouping

 * @param {*} param0
 * @returns
 */
export default function EntireRecordsWithDateSort({
  title,
  recordList,
}: BasicPageDivProps) {
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
              className="flex flex-row items-start justify-between w-full  "
            >
              <Link
                key={page.url}
                href={page.url}
                className="dark:text-neutral-400
                 hover:text-neutral-400  dark:hover:text-neutral-200 overflow-x-hidden 
                 hover:underline cursor-pointer text-neutral-600"
              >
                <span className="text-norkive-medium dark:hover:text-neutral-300 ">
                  {new Date(page.data.date).toISOString().split("T")[0]}
                </span>

                <span className="pl-2 pr-3 text-xs  ">{page.data.icon}</span>
                <span className=" ">{page.data.title}</span>
              </Link>
              <span className="pl-2 pr-3  flex flex-row justify-start items-center text-neutral-500">
                &nbsp;
                {page.data.password !== "" && (
                  <>
                    <LockIcon className="mr-1 w-3" />
                    비공개
                  </>
                )}
              </span>
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
