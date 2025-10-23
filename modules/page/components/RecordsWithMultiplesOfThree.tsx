"use client";
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import { GridCard } from "@/modules/common/cards";
import { useMemo, useState } from "react";
import IntroSectionWithMenuOption from "./IntroSectionWithMenuOption";
import PaginationSimple from "./PaginationSimple";
import { OptionItem, SerializedPage } from "@/types";
import { getDistanceFromToday, getYearMonthDay } from "@/lib/utils";

type Props = {
  type: string;
  introTrue: boolean;
  records: SerializedPage[];
};

const RecordsWithMultiplesOfThree = ({ type, introTrue, records }: Props) => {
  const pages = records;
  if (!pages) return null;

  const { locale, lang } = useGeneralSiteSettings();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentRecordType, setCurrentRecordType] = useState("");

  // useMemo를 사용하여 필터링 로직 최적화
  const { filteredPages, allOptions } = useMemo(() => {
    const filteredPages = pages.filter(
      (page) =>
        (type !== "" ? page.data.type === type : true) &&
        (currentRecordType !== "" ? page.data.type === currentRecordType : true)
    );

    // 중복되지 않는 고유한 타입만 추출
    const uniqueTypeOptions = Array.from(
      new Set(
        filteredPages
          .map((item) => item?.data?.type)
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

    return {
      filteredPages,
      allOptions: typeOptions,
    };
  }, [pages, type, currentRecordType, locale.COMMON.ALL]);

  const handleRecordTypeChange = (option: string) => {
    setCurrentRecordType(option);
    setCurrentPage(1); // 페이지 변경 시 첫 페이지로 이동
  };

  const getCurrentArticles = () => {
    const startIndex = (currentPage - 1) * 9;
    const endIndex = startIndex + 9;
    return filteredPages.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredPages.length / 9);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Section Title */}
      <IntroSectionWithMenuOption
        introTrue={introTrue}
        introType="LATEST"
        currentRecordType={currentRecordType}
        allOptions={allOptions}
        handleRecordTypeChange={handleRecordTypeChange}
      />

      {/* Grid Cards */}
      <div
        id="norkive-recent-grid"
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {getCurrentArticles().map((article) => (
          <GridCard
            key={`${article.data.notionId}-${currentPage}`}
            title={article.data.title}
            description={article.data.summary}
            date={getYearMonthDay(article.data.date, locale.LOCALE)}
            distanceFromToday={getDistanceFromToday(article.data.date, lang)}
            tags={article.data.tags}
            imageUrl={article.data.pageCover as string | undefined}
            imageAlt={article.data.title}
            url={article.url}
            variant="default"
            showImage={true}
            showMeta={true}
            showTags={true}
            showDescription={true}
            locale={locale}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8">
          <PaginationSimple pagenum={currentPage} totalPage={totalPages} />
        </div>
      )}
    </div>
  );
};

export default RecordsWithMultiplesOfThree;
