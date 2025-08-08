"use client";
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import { getYearMonthDay } from "@/lib/utils/date";
import {
  CalendarIcon,
  FolderClosedIcon,
  LockIcon,
  TagIcon,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import TagItemMini from "@/modules/common/tag/TagItemMini";
import IntroSectionWithMenuOption from "./IntroSectionWithMenuOption";
import PageIndicator from "./PageIndicator";
import { SerializedPage } from "@/types";

type Props = {
  type: string;
  subType: boolean;
  introTrue: boolean;
  records: SerializedPage[];
};
const EntireRecords = ({
  type,
  records,
  introTrue,
  subType = false,
}: Props) => {
  const pages = records;
  if (!pages) return null;
  const router = useRouter();
  const CARDS_PER_PAGE = 4;

  const { locale } = useGeneralSiteSettings();
  const [currentPage, setCurrentPage] = useState(0);
  const [currentRecordType, setCurrentRecordType] = useState("");

  // useMemo를 사용하여 필터링 로직 최적화
  const { allOptions, modAllRecords, filteredPages } = useMemo(() => {
    const filtered =
      currentRecordType !== ""
        ? pages.filter((page) => {
            const pageType = subType ? page?.data?.sub_type : page?.data?.type;
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
    const uniqueTypeOptions = Array.from(
      new Set(
        pages
          .map((item) => item?.data?.type)
          .filter((data): data is string => Boolean(data))
      )
    );

    const uniqueSubTypeOptions = Array.from(
      new Set(
        filtered
          .map((item) => item?.data?.sub_type)
          .filter((data): data is string => Boolean(data))
      )
    );

    // "전체" 아이템을 맨 앞에 추가
    const typeOptions: any[] = [
      {
        id: -1,
        title: locale.COMMON.ALL,
        option: "",
      },
      ...uniqueTypeOptions.map((option, index) => ({
        id: index,
        title: option,
        option: option,
      })),
    ];
    const subTypeOptions: any[] = [
      {
        id: -1,
        title: locale.COMMON.ALL,
        option: "",
      },
      ...uniqueSubTypeOptions.map((option, index) => ({
        id: index,
        title: option,
        option: option,
      })),
    ];

    const allOptions = subType ? subTypeOptions : typeOptions;
    return {
      modAllRecords: modAllRecords,
      filteredPages: filtered,
      allOptions: allOptions,
    };
  }, [pages, currentRecordType, currentPage]);

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

  const handleRouter = (page: any) => {
    // if (page.data.password === "") {
    router.push(page.url);
    // }
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-8">
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
              dark:border-neutral-700 p-6 hover:shadow-lg transition-all duration-300 hover:scale-95  hover:border-neutral-300 dark:hover:border-neutral-600"
          >
            <div
              onClick={() => handleRouter(page)}
              className=" flex flex-col gap-5 hover:cursor-pointer"
            >
              {/* 제목 */}
              <div className="flex flex-row justify-start items-center gap-2">
                <h3
                  className="text-xl font-semibold
               text-neutral-700 dark:text-neutral-200 
                group-hover:text-black group-hover:underline 
                 dark:group-hover:text-white transition-colors"
                >
                  {page.data.title}
                </h3>
                {page.data.password !== "" && (
                  <div className="text-neutral-500 dark:text-neutral-400 flex flex-row  gap-2  text-sm justify-start items-center">
                    <LockIcon className="w-4 h-4" />
                    <span className="text-sm">{locale.COMMON.LOCKED}</span>
                  </div>
                )}
              </div>

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
                {/* sub_type */}
                {page.data.sub_type && (
                  <div className="flex items-center gap-1">
                    <TagIcon className="w-4 h-4" />
                    <span>{page.data.sub_type}</span>
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
                <TagItemMini
                  tags={page.data.tags}
                  className="bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300"
                />
              )}
            </div>
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
