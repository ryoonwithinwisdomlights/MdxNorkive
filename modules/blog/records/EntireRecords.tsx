"use client";
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import { getYearMonthDay } from "@/lib/utils/date";
import { CalendarIcon, FolderClosedIcon, TagIcon } from "lucide-react";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import IntroSectionWithMenuOption from "./IntroSectionWithMenuOption";
import PageIndicator from "./PageIndicator";
import TagList from "./TagList";

const EntireRecords = ({ records, introTrue }) => {
  const pages = records;
  if (!pages) return null;
  const CARDS_PER_PAGE = 4;

  const { locale } = useGeneralSiteSettings();
  const [currentPage, setCurrentPage] = useState(0);
  const [currentRecordType, setCurrentRecordType] = useState("");

  // useMemo를 사용하여 필터링 로직 최적화
  const { allOptions, modAllRecords, filteredPages } = useMemo(() => {
    const filtered =
      currentRecordType !== ""
        ? pages.filter((page) => {
            const pageType = page?.data?.type;
            if (!pageType) return false;

            // 대소문자 구분 없이 비교
            return pageType.toLowerCase() === currentRecordType.toLowerCase();
          })
        : pages;

    const modAllRecords = filtered.slice(
      currentPage * CARDS_PER_PAGE,
      (currentPage + 1) * CARDS_PER_PAGE
    );
    // const modAllRecords = filtered;
    // 중복되지 않는 고유한 타입만 추출 (전체 프로젝트 페이지 기준)
    const uniqueOptions = Array.from(
      new Set(
        pages
          .map((item) => item?.data?.type)
          .filter((type): type is string => Boolean(type))
      )
    );

    // "전체" 아이템을 맨 앞에 추가
    const options: any[] = [
      {
        id: -1,
        title: locale.COMMON.ALL,
        option: "",
      },
      ...uniqueOptions.map((option, index) => ({
        id: index,
        title: option,
        option: option,
      })),
    ];

    return {
      modAllRecords: modAllRecords,
      filteredPages: filtered,
      allOptions: options,
    };
  }, [pages, currentRecordType, currentPage]); // 의존성 배열에 pages와 categoryParam만 포함

  const TOTAL_PAGES = Math.ceil(filteredPages.length / CARDS_PER_PAGE);
  useEffect(() => {
    setCurrentPage(0);
  }, [currentRecordType]);

  const nextPage = () => {
    if (currentPage < TOTAL_PAGES - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleRecordTypeChange = (option: string) => {
    setCurrentRecordType(option);
  };
  return (
    <section className="w-full">
      {/* 섹션 제목 */}
      <IntroSectionWithMenuOption
        introTrue={introTrue}
        introType="ENTIRE"
        currentRecordType={currentRecordType}
        allOptions={allOptions}
        handleRecordTypeChange={handleRecordTypeChange}
      />

      {/* 전체 게시글 목록 */}
      <div className="grid grid-cols-1 gap-6 ">
        {modAllRecords.map((page) => (
          <article
            key={page.data.notionId}
            className="group relative bg-gradient-to-br from-white to-neutral-200 dark:from-neutral-900 dark:to-neutral-700 rounded-lg border border-neutral-200
              dark:border-neutral-700 p-6 hover:shadow-lg transition-all duration-300 hover:scale-105  hover:border-neutral-300 dark:hover:border-neutral-600"
          >
            <Link href={page.url} className=" flex flex-col gap-5">
              {/* 제목 */}
              <h3
                className="text-xl font-semibold
               text-neutral-700 dark:text-neutral-200 
                group-hover:text-black group-hover:underline 
                 dark:group-hover:text-white transition-colors"
              >
                {page.data.title}
              </h3>

              {/* 요약 */}
              {page.data.summary && (
                <p className="text-neutral-600 dark:text-neutral-300 line-clamp-2">
                  {page.data.summary}
                </p>
              )}

              {/* 메타 정보 */}
              <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
                {/* 타입 */}
                <div className="flex items-center gap-1">
                  <FolderClosedIcon className="w-4 h-4" />
                  <span>{page.data.type}</span>
                </div>
                {/* 카테고리 */}
                {page.data.category && (
                  <div className="flex items-center gap-1">
                    <TagIcon className="w-4 h-4" />
                    <span>{page.data.category}</span>
                  </div>
                )}
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
              </div>
              {/* 태그 */}
              {page.data.tags && page.data.tags.length > 0 && (
                <TagList
                  tags={page.data.tags}
                  className="bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300"
                />
                // <div className="mt-4 flex items-center gap-2">
                //   {page.data.tags.slice(0, 3).map((tag, index) => (
                //     <span
                //       key={index}
                //       className="px-2 py-1 bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 rounded-md text-xs"
                //     >
                //       {tag}
                //     </span>
                //   ))}
                //   {page.data.tags.length > 3 && (
                //     <span className="text-xs">
                //       +{page.data.tags.length - 3}
                //     </span>
                //   )}
                // </div>
              )}
            </Link>
          </article>
        ))}
      </div>
      <PageIndicator
        currentPage={currentPage}
        TOTAL_PAGES={TOTAL_PAGES}
        prevPage={prevPage}
        nextPage={nextPage}
      />
    </section>
  );
};

export default EntireRecords;
