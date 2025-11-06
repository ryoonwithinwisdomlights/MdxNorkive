"use client";
import { BLOG } from "@/blog.config";
import {
  getDistanceFromToday,
  getYearMonthDay,
  transferDataForCardProps,
} from "@/lib/utils";

import { useThemeStore } from "@/lib/stores";
import { mainDocsProps, OptionItem } from "@/types/components/pageutils";
import { lazy, useCallback, useMemo, useState } from "react";
import IntroSectionWithMenuOption from "./IntroSectionWithMenuOption";
import PageIndicator from "./PageIndicator";

const GridCard = lazy(() => import("@/modules/common/cards/GridCard"));
const ImageCard = lazy(() => import("@/modules/common/cards/ImageCard"));

const LatestDocs = ({ type, introTrue, docs, docType }: mainDocsProps) => {
  const pages = docs;
  if (!pages) return null;

  const { locale, lang } = useThemeStore();
  const [currentPage, setCurrentPage] = useState(0);
  const [currentDocType, setcurrentDocType] = useState("");
  const { LATEST_DOCS_CARDS_PER_PAGE } = BLOG;
  // useMemo를 사용하여 필터링 로직 최적화
  const { filteredPages, allOptions } = useMemo(() => {
    const filteredPages =
      currentDocType !== ""
        ? pages.filter((page) => {
            const pageType = docType ? page?.data?.doc_type : page?.data?.type;
            if (!pageType) return false;

            // 대소문자 구분 없이 비교
            return pageType.toLowerCase() === currentDocType.toLowerCase();
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
    const uniquedocTypeOptions = Array.from(
      new Set(
        filteredPages //서브타입은 필터링된 페이지 기준
          .map((item) => item?.data?.doc_type)
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

    const docTypeOptions: OptionItem[] = [
      {
        id: -1,
        title: locale.COMMON.ALL,
        option: "",
      },
      ...uniquedocTypeOptions.map((option, index) => ({
        id: index,
        title: option,
        option: option,
      })),
    ];

    const allOptions = docType ? docTypeOptions : typeOptions;
    return {
      filteredPages,
      allOptions: allOptions,
    };
  }, [pages, currentDocType, docType, locale.COMMON.ALL]);

  const handleDocTypeChange = useCallback((option: string) => {
    setcurrentDocType(option);
    setCurrentPage(0);
  }, []);

  const firstArticle = useMemo(() => filteredPages[0], [filteredPages]);
  const restArticles = useMemo(
    () => filteredPages.slice(1, filteredPages.length),
    [filteredPages]
  );
  const totalPages = useMemo(
    () => Math.ceil(restArticles.length / LATEST_DOCS_CARDS_PER_PAGE),
    [restArticles]
  );

  // getCurrentDocsWithPagination 결과를 useMemo로 캐싱
  const currentDocs = useMemo(() => {
    const startIndex = currentPage * LATEST_DOCS_CARDS_PER_PAGE;
    const endIndex = startIndex + LATEST_DOCS_CARDS_PER_PAGE;
    return restArticles.slice(startIndex, endIndex);
  }, [restArticles, currentPage, LATEST_DOCS_CARDS_PER_PAGE]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 flex flex-col gap-8">
      {/* Section Title */}
      <IntroSectionWithMenuOption
        introTrue={introTrue}
        introType="LATEST"
        currentDocType={currentDocType}
        allOptions={allOptions}
        handleDocTypeChange={handleDocTypeChange}
      />

      {/* Main Featured Article */}
      {firstArticle && (
        <ImageCard
          data={transferDataForCardProps(firstArticle)}
          variant="featured"
          imageAlt={firstArticle.data.title || ""}
          showMeta={true}
          showTags={true}
          showSummary={true}
          locale={locale}
          lang={lang}
          isSlider={false}
          priority={true}
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
        {currentDocs.map((article) => (
          <GridCard
            key={`${article.data.notionId}`}
            title={article.data.title}
            description={article.data.summary}
            date={getYearMonthDay(article.data.date, locale.LOCALE)}
            type={article.data.type}
            docType={article.data.doc_type}
            author={article.data.author}
            distanceFromToday={getDistanceFromToday(article.data.date, lang)}
            tags={article.data.tags}
            imageUrl={article.data.pageCover as string | undefined}
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

export default LatestDocs;
