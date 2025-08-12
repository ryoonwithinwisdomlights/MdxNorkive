"use client";
import { GridCard, ImageCard } from "@/modules/common/cards";
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import {
  getDistanceFromToday,
  getYearMonthDay,
  transferDataForCardProps,
} from "@/lib/utils";

import { useMemo, useState } from "react";
import IntroSectionWithMenuOption from "./IntroSectionWithMenuOption";
import PageIndicator from "./PageIndicator";
import { mainRecordProps } from "@/types";

const LatestRecords = ({
  type,
  introTrue,
  records,
  subType,
}: mainRecordProps) => {
  const pages = records;
  if (!pages) return null;

  const { locale, lang } = useGeneralSiteSettings();
  const [currentPage, setCurrentPage] = useState(0);
  const [currentRecordType, setCurrentRecordType] = useState("");

  // useMemo를 사용하여 필터링 로직 최적화
  const { filteredPages, allOptions } = useMemo(() => {
    const filteredPages =
      currentRecordType !== ""
        ? pages.filter((page) => {
            const pageType = subType ? page?.data?.sub_type : page?.data?.type;
            if (!pageType) return false;

            // 대소문자 구분 없이 비교
            return pageType.toLowerCase() === currentRecordType.toLowerCase();
          })
        : pages;

    // 중복되지 않는 고유한 타입만 추출
    const uniqueTypeOptions = Array.from(
      new Set(
        pages //타입은 전체 페이지 기준
          .map((item) => item?.data?.type)
          .filter((data): data is string => Boolean(data))
      )
    );
    const uniqueSubTypeOptions = Array.from(
      new Set(
        filteredPages //서브타입은 필터링된 페이지 기준
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
      filteredPages,
      allOptions: allOptions,
    };
  }, [pages, type, currentRecordType, locale.COMMON.ALL]);

  const handleRecordTypeChange = (option: string) => {
    setCurrentRecordType(option);
    setCurrentPage(0); // 페이지 변경 시 첫 페이지로 이동
  };

  const getCurrentRecordsWithPagination = (
    records: any[],
    page: number,
    perPage: number
  ) => {
    const startIndex = page * perPage;
    const endIndex = startIndex + perPage;
    return records.slice(startIndex, endIndex);
  };

  const CARDS_PER_PAGE = 3;
  const firstArticle = filteredPages[0];
  const restArticles = filteredPages.slice(1, filteredPages.length);
  const totalPages = Math.ceil(restArticles.length / CARDS_PER_PAGE);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 flex flex-col gap-8">
      {/* Section Title */}
      <IntroSectionWithMenuOption
        introTrue={introTrue}
        introType="LATEST"
        currentRecordType={currentRecordType}
        allOptions={allOptions}
        handleRecordTypeChange={handleRecordTypeChange}
      />

      {/* Main Featured Article */}
      {firstArticle && (
        <ImageCard
          data={transferDataForCardProps(firstArticle)}
          variant="featured"
          showMeta={true}
          showTags={true}
          showSummary={true}
          locale={locale}
          lang={lang}
          isSlider={false}
        />
      )}

      {/* Pagination */}
      <PageIndicator
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {getCurrentRecordsWithPagination(
          restArticles,
          currentPage,
          CARDS_PER_PAGE
        ).map((article) => (
          <GridCard
            key={`${article.data.notionId}`}
            title={article.data.title}
            description={article.data.summary}
            date={getYearMonthDay(article.data.date, locale.LOCALE)}
            type={article.data.type}
            subType={article.data.sub_type}
            author={article.data.author}
            distanceFromToday={getDistanceFromToday(article.data.date, lang)}
            tags={article.data.tags}
            imageUrl={article.data.pageCover}
            imageAlt={article.data.title}
            url={article.url}
            variant="compact"
            showImage={true}
            showMeta={true}
            showTags={true}
            showDescription={true}
            locale={locale}
            className="flex md:flex-col flex-row    "
          />
        ))}
      </div>
    </div>
  );
};

export default LatestRecords;
