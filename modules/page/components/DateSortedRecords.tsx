"use client";
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import { BasicPageDivProps } from "@/types";
import { FolderClosedIcon, LockIcon } from "lucide-react";
import { useRouter } from "next/navigation";
/**
 * Records grouping

 * @param {*} param0
 * @returns
 */
export default function DateSortedRecords({
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
            className="border-l-4 border-neutral-200 px-2  py-4 text-xs md:text-base w-full 
               hover:border-neutral-400 dark:border-neutral-400/30 hover:text-neutral-700  dark:hover:text-neutral-200"
          >
            {/* CSS Grid를 사용한 레이아웃 */}
            <div className="grid grid-cols-[auto_1fr_auto] gap-4 items-start">
              {/* 날짜 컬럼 */}
              <div className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-200">
                {new Date(page.data.date).toISOString().split("T")[0]}
              </div>

              {/* 제목과 태그 컬럼 */}
              <div
                onClick={() => handleRouter(page)}
                className="flex flex-col gap-2 cursor-pointer"
              >
                {/* 제목 행 */}
                <div className="flex flex-row justify-start items-center gap-2">
                  {page.data.icon && (
                    <span className="text-xs">{page.data.icon}</span>
                  )}
                  <span className="hover:underline break-all">
                    {page.data.title}
                  </span>

                  {page.data.password !== "" && (
                    <div className="pl-2 flex flex-row gap-1 text-sm justify-start items-center">
                      <LockIcon className="w-3 h-3" />
                      <span className="">{locale.COMMON.LOCKED}</span>
                    </div>
                  )}
                </div>

                {/* 태그 행 */}
                {page.data.tags && page.data.tags.length > 0 && (
                  <div className="flex items-center gap-2">
                    {page.data.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 rounded-md text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                    {page.data.tags.length > 3 && (
                      <span className="text-xs">
                        +{page.data.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* 카테고리 컬럼 */}
              {page.data.category && (
                <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-300">
                  <FolderClosedIcon className="w-4 h-4" />
                  <span>{page.data.category}</span>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
