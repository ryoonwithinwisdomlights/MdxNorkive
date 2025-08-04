"use client";
import NotFound from "@/app/not-found";
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import { getPages } from "@/lib/source";
import { getYearMonthDay } from "@/lib/utils/date";
import { CalendarIcon, FolderClosedIcon } from "lucide-react";
import Link from "next/link";

const EntireRecords = ({ allRecords }) => {
  // const pages = getPages();
  const { locale } = useGeneralSiteSettings();
  if (!allRecords) NotFound();
  const modAllRecords = allRecords.slice(6, allRecords.length);
  return (
    <section className="w-full">
      {/* 섹션 제목 */}
      <div className="text-end mb-6 flex flex-col gap-2">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white  ">
          {locale.INTRO.ENTIRE_RECORDS}
        </h2>
        <p className="text-lg text-neutral-600 dark:text-neutral-300">
          {locale.INTRO.ENTIRE_RECORDS_DESC}
        </p>
      </div>

      {/* 전체 게시글 목록 */}
      <div className="grid grid-cols-1 gap-6 ">
        {modAllRecords.map((page) => (
          <article
            key={page.data.notionId}
            className="group relative bg-gradient-to-br from-white to-neutral-200 dark:from-neutral-900 dark:to-neutral-700 rounded-lg border border-neutral-200
              dark:border-neutral-700 p-6 hover:shadow-lg transition-all duration-300 hover:scale-105  hover:border-neutral-300 dark:hover:border-neutral-600"
          >
            <Link href={page.url} className="block">
              {/* 제목 */}
              <h3
                className="text-xl font-semibold
               text-neutral-700 dark:text-neutral-200 mb-3
                group-hover:text-black group-hover:underline 
                 dark:group-hover:text-white transition-colors"
              >
                {page.data.title}
              </h3>

              {/* 요약 */}
              {page.data.summary && (
                <p className="text-neutral-600 dark:text-neutral-300 mb-4 line-clamp-2">
                  {page.data.summary}
                </p>
              )}

              {/* 메타 정보 */}
              <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
                {/* 날짜 */}
                <div className="flex items-center gap-1">
                  <CalendarIcon className="w-4 h-4" />
                  <span>
                    {getYearMonthDay(
                      page.data.date,
                      locale === "kr-KR" ? "kr-KR" : "en-US"
                    )}
                  </span>
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
                    <span className="text-xs">
                      +{page.data.tags.length - 3}
                    </span>
                  )}
                </div>
              )}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default EntireRecords;
