"use client";
import { AllRecordsProps } from "@/types";
import { LockIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

/**
 * Records grouping

 * @param {*} param0
 * @returns
 */
export default function AllRecords({ title, recordList }: AllRecordsProps) {
  const router = useRouter();

  return (
    <div key={title}>
      <div
        id={title}
        className="pt-10  text-[#cbcac4e2] font-semibold pb-4 text-2xl  "
      >
        {title}
      </div>
      <ul>
        {recordList[title]?.map((record) => (
          <li
            key={record.id}
            className="border-l-4 border-[#f1efe9e2]  hover:border-[#cbcac4e2] 
             p-2 text-xs md:text-base 
             text-justify  hover:scale-x-105  dark:hover:border-neutral-400 dark:border-neutral-400/30 transform duration-500"
          >
            <div
              id={record?.publishDay}
              className="flex flex-row items-start justify-start  "
            >
              {/* <Link
                href={`/${record.slug}`}
                className="dark:text-neutral-400
                 hover:text-neutral-400  dark:hover:text-neutral-200 overflow-x-hidden 
                 hover:underline cursor-pointer text-neutral-600"
              >
                <span className="text-[#cbcac4e2] dark:hover:text-neutral-300 ">
                  {record.date?.start_date}
                </span>

                <span className="pl-2 pr-3 text-xs  ">{record.pageIcon}</span>
                <span className=" ">{record.title}</span>
              </Link> */}
              <div
                onClick={() => {
                  router.push(`/${record.slug}`);
                }}
                className="dark:text-neutral-400
                 hover:text-neutral-400  dark:hover:text-neutral-200 overflow-x-hidden 
                 hover:underline cursor-pointer text-neutral-600"
              >
                <span className="text-[#cbcac4e2] dark:hover:text-neutral-300 ">
                  {record.date?.start_date}
                </span>

                <span className="pl-2 pr-3 text-xs  ">{record.pageIcon}</span>
                <span className=" ">{record.title}</span>
              </div>
              <span className="pl-2 pr-3  flex flex-row justify-start items-center text-neutral-500">
                &nbsp;
                {record.password !== "" && (
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
