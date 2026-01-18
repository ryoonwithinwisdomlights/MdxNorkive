"use client";
import { useThemeStore } from "@/lib/stores";
import { getDistanceFromToday, getYearMonthDay } from "@/lib/utils";
import { GridCard } from "@/modules/common/cards";
import {
  OptionItem,
  DocsWithMultiplesOfThreeProps,
} from "@/types/components/pageutils";
import { useCallback, useMemo, useState } from "react";
import IntroSectionWithMenuOption from "./IntroSectionWithMenuOption";
import PaginationSimple from "./PaginationSimple";

const DocsWithMultiplesOfThree = ({
  type,
  introTrue,
  docs,
}: DocsWithMultiplesOfThreeProps) => {
  const pages = docs;
  if (!pages) return null;

  const { locale, lang } = useThemeStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentDocType, setcurrentDocType] = useState("");

  // useMemo를 사용하여 필터링 로직 최적화
  const { filteredPages, allOptions } = useMemo(() => {
    const filteredPages = pages.filter(
      (page) =>
        (type !== "" ? page.data.type === type : true) &&
        (currentDocType !== "" ? page.data.type === currentDocType : true)
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
  }, [pages, type, currentDocType, locale.COMMON.ALL]);

  const handleDocTypeChange = useCallback((option: string) => {
    setcurrentDocType(option);
    setCurrentPage(1); // 페이지 변경 시 첫 페이지로 이동
  }, []);

  const totalPages = useMemo(
    () => Math.ceil(filteredPages.length / 9),
    [filteredPages]
  );

  // getCurrentArticles 결과를 useMemo로 캐싱
  const currentArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * 9;
    const endIndex = startIndex + 9;
    return filteredPages.slice(startIndex, endIndex);
  }, [filteredPages, currentPage]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Section Title */}
      <IntroSectionWithMenuOption
        introTrue={introTrue}
        introType="LATEST"
        currentDocType={currentDocType}
        allOptions={allOptions}
        handleDocTypeChange={handleDocTypeChange}
      />

      {/* Grid Cards */}
      <div
        id="norkive-recent-grid"
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {currentArticles.map((article) => (
          <GridCard
            key={`${article.data.notionId || article.url}-${currentPage}`}
            title={article.data.title || ""}
            description={article.data.summary}
            date={
              article.data.date
                ? getYearMonthDay(article.data.date, locale.LOCALE)
                : ""
            }
            distanceFromToday={
              article.data.date
                ? getDistanceFromToday(article.data.date, lang)
                : ""
            }
            tags={article.data.tags}
            imageUrl={article.data.pageCover as string | undefined}
            imageAlt={article.data.title || ""}
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

export default DocsWithMultiplesOfThree;
