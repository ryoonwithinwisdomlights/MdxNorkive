"use client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState, memo } from "react";

import { getYearMonthDay, substringWithNumberDots } from "@/lib/utils";
import { CalendarIcon, LockIcon, UserPenIcon } from "lucide-react";

import { useThemeStore } from "@/lib/stores";
import {
  combinedMetaClasses,
  combinedSummaryClasses,
  combinedTitleClasses,
} from "@/lib/styles/card.styles";
import TagItemMini from "@/modules/common/tag/TagItemMini";
import IntroSectionWithMenuOption from "@/modules/page/components/IntroSectionWithMenuOption";
import PageIndicator from "@/modules/page/components/PageIndicator";
import { LockedSection, SerializedPage } from "@/types";
import { mainRecordProps, OptionItem } from "@/types/components/pageutils";

// 메모이제이션된 카드 컴포넌트
const RecordCard = memo(
  ({
    page,
    locale,
    LOCKED,
    subType,
    onCardClick,
  }: {
    page: SerializedPage;
    locale: any;
    LOCKED: LockedSection;
    subType: boolean;
    onCardClick: (page: SerializedPage) => void;
  }) => {
    const metaClasses = useMemo(
      () =>
        combinedMetaClasses({ className: "md:flex-row md:items-center gap-4" }),
      []
    );

    const titleClasses = useMemo(
      () =>
        combinedTitleClasses({
          isCompact: false,
          isFeatured: false,
          className: "font-semibold  leading-tight",
        }),
      []
    );

    return (
      <article
        key={page.data.notionId}
        className="group relative bg-gradient-to-br from-white to-neutral-200 dark:from-neutral-900 dark:to-neutral-700 rounded-lg border border-neutral-200
          dark:border-neutral-700 p-6 hover:shadow-lg  hover:border-neutral-300 dark:hover:border-neutral-600"
      >
        <div
          onClick={() => onCardClick(page)}
          className=" flex flex-col  gap-2 hover:cursor-pointer"
        >
          <div className="flex flex-col gap-2">
            {/* 메타 정보 */}
            <div className={metaClasses}>
              {/* 타입 */}
              <div className="flex flex-row items-center gap-1">
                <span>
                  {page.data.type} / {page.data.sub_type}
                </span>
              </div>
            </div>
            {/* 제목 */}
            <div className="flex flex-row justify-start items-center gap-2">
              <h3 className={titleClasses}>{page.data.title}</h3>
              {page.data.password !== "" && (
                <div className="text-neutral-500 dark:text-neutral-400 flex flex-row  gap-2  text-sm justify-start items-center">
                  <LockIcon className="w-4 h-4" />
                  <span className="text-sm">{LOCKED.LOCKED}</span>
                </div>
              )}
            </div>
          </div>

          {/* 요약 */}
          {page.data.summary && (
            <p className={combinedSummaryClasses({ className: "" })}>
              {substringWithNumberDots(page.data.summary, 100)}
            </p>
          )}

          {/* 메타 정보 */}
          <div className={metaClasses}>
            {/* 타입 */}
            <div className="flex gap-2 items-center  ">
              <UserPenIcon className="w-3 h-3" />
              <span>{substringWithNumberDots(page.data.author, 10)}</span>
            </div>
            {/* sub_type */}

            {/* 날짜 */}
            <div className="flex flex-row items-center gap-1">
              <CalendarIcon className="w-4 h-4" />
              <span>{getYearMonthDay(page.data.date, locale.LOCALE)}</span>
            </div>
          </div>

          {/* 태그 */}
          {page.data.tags && page.data.tags.length > 0 && (
            <TagItemMini
              tags={page.data.tags}
              className="bg-neutral-200 dark:bg-neutral-500 text-neutral-500 dark:text-neutral-200"
            />
          )}
        </div>
      </article>
    );
  }
);

RecordCard.displayName = "RecordCard";

const EntireRecords = ({
  type,
  records,
  introTrue,
  subType = false,
}: mainRecordProps) => {
  const pages = records;
  if (!pages) return null;
  const router = useRouter();
  const CARDS_PER_PAGE = 4;

  const { locale } = useThemeStore();
  const LOCKED = locale.LOCKED as LockedSection;
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
    const typeOptions: OptionItem[] = [
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
    const subTypeOptions: OptionItem[] = [
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
  }, [pages, currentRecordType, currentPage, subType, locale.COMMON.ALL]);

  const TOTAL_PAGES = useMemo(
    () => Math.ceil(filteredPages.length / CARDS_PER_PAGE),
    [filteredPages]
  );

  useEffect(() => {
    setCurrentPage(0);
  }, [currentRecordType]);

  const handleRecordTypeChange = useCallback((option: string) => {
    setCurrentRecordType(option);
  }, []);

  const handleRouter = useCallback(
    (page: SerializedPage) => {
      router.push(page.url);
    },
    [router]
  );

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-8 flex flex-col gap-8">
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
          <RecordCard
            key={page.data.notionId}
            page={page}
            locale={locale}
            LOCKED={LOCKED}
            subType={subType}
            onCardClick={handleRouter}
          />
        ))}
      </div>
      <PageIndicator
        currentPage={currentPage}
        totalPages={TOTAL_PAGES}
        setCurrentPage={setCurrentPage}
      />
    </section>
  );
};

export default EntireRecords;
