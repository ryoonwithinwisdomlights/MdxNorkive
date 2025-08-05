"use client";
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import { getYearMonthDay } from "@/lib/utils/date";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  Book,
  CalendarIcon,
  ChevronDownIcon,
  FolderClosedIcon,
  TagIcon,
} from "lucide-react";

import Link from "next/link";
import { useMemo, useState } from "react";

const EntireRecords = ({ records, introText }) => {
  const pages = records;
  if (!pages) return null;
  const { locale } = useGeneralSiteSettings();
  const [currentRecordType, setCurrentRecordType] = useState("");

  // useMemo를 사용하여 필터링 로직 최적화
  const { allOptions, modAllRecords } = useMemo(() => {
    // const favoritePages = pages.filter(
    //   (page) =>
    //     page.data.favorite === true &&
    //     (type !== "" ? page.data.type === type : true)
    // );
    // currentRecordType값 있으면 추가 필터링
    const filtered =
      currentRecordType !== ""
        ? pages.filter((page) => {
            const pageType = page?.data?.type;
            if (!pageType) return false;

            // 대소문자 구분 없이 비교
            return pageType.toLowerCase() === currentRecordType.toLowerCase();
          })
        : pages;

    // const modAllRecords = filtered.slice(6, filtered.length);
    const modAllRecords = filtered;
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
      // filteredPages: filtered,
      allOptions: options,
    };
  }, [pages, currentRecordType]); // 의존성 배열에 pages와 categoryParam만 포함

  const handleRecordTypeChange = (option: string) => {
    setCurrentRecordType(option);
  };
  return (
    <section className="w-full">
      {/* 섹션 제목 */}
      <div className="flex flex-row justify-between">
        {introText && (
          <div className="text-start mb-6 flex flex-col gap-2">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white  ">
              {locale.INTRO.ENTIRE_RECORDS}
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300">
              {locale.INTRO.ENTIRE_RECORDS_DESC}
            </p>
          </div>
        )}
        <div className="w-52 text-right relative flex flex-col justify-end items-end mb-6  ">
          <Menu>
            <MenuButton
              className="w-40  inline-flex items-center justify-center
            gap-2 rounded-md bg-neutral-50 dark:bg-neutral-600 
            dark:border-neutral-100
            border border-neutral-200 
            px-3 py-1.5 text-sm font-semibold
              text-neutral-900 dark:text-white shadow-inner shadow-white/10 
        
              data-focus:outline-white
               data-hover:bg-neutral-100
                data-open:bg-neutral-100"
            >
              {currentRecordType === "" ? locale.COMMON.ALL : currentRecordType}
              <ChevronDownIcon className="size-4 fill-white/60" />
            </MenuButton>
            <MenuItems
              anchor="bottom"
              className="w-52 rounded-xl border border-neutral-200 bg-white dark:bg-neutral-800 dark:border-neutral-700 p-1 text-sm/6 text-neutral-900 dark:text-white shadow-lg"
            >
              {allOptions.map((item) => (
                <MenuItem key={item.id}>
                  <button
                    onClick={() => handleRecordTypeChange(item.option)}
                    className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-neutral-100 dark:data-focus:bg-neutral-700"
                  >
                    <Book className="size-4 text-neutral-500 dark:text-neutral-400" />{" "}
                    {item.title}
                  </button>
                </MenuItem>
              ))}
            </MenuItems>
          </Menu>
        </div>
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
