"use client";
import { BasicPageDivProps } from "@/types";
import { LockIcon } from "lucide-react";
import Link from "next/link";
/**
 * Records grouping

 * @param {*} param0
 * @returns
 */
export default function AllRecords({ title, recordList }: BasicPageDivProps) {
  return (
    <div key={title} className="w-full flex flex-col items-center">
      <div
        id={title}
        className="pt-10  text-norkive-medium font-semibold pb-4 text-2xl  "
      >
        {title}
      </div>
      <ul>
        {recordList[title]?.map((page) => (
          <li
            key={page.data.notionId}
            className="border-l-4 border-norkive-light  hover:border-norkive-medium 
             p-2 text-xs md:text-base 
             text-justify  hover:scale-x-105  dark:hover:border-neutral-400 dark:border-neutral-400/30 transform duration-500"
          >
            <div
              id={page.data.notionId}
              className="flex flex-row items-start justify-start  "
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
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
