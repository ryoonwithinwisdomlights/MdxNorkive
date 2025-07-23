"use client";
import { useGlobal } from "@/lib/context/EssentialNavInfoProvider";
import { BasicPageDivProps } from "@/types";
import { LockIcon } from "lucide-react";
import { useRouter } from "next/navigation";

/**
 * Records grouping

 * @param {*} param0
 * @returns
 */
export default function AllRecords({ title, recordList }: BasicPageDivProps) {
  // const { handleRouter } = useGlobal({});
  const router = useRouter();
  const handleRouter = (page) => {
    console.log("page.slug:", page.slug);
    // router.push(`/${page.slug}`);
  };
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
            key={page.notionId}
            className="border-l-4 border-norkive-light  hover:border-norkive-medium 
             p-2 text-xs md:text-base 
             text-justify  hover:scale-x-105  dark:hover:border-neutral-400 dark:border-neutral-400/30 transform duration-500"
          >
            <div
              id={page.notionId}
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
                <span className="text-norkive-medium dark:hover:text-neutral-300 ">
                  {page.date}
                </span>

                <span className="pl-2 pr-3 text-xs  ">{page.icon}</span>
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
