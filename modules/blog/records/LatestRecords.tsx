"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import {
  getCurrentRecordsWithPagination,
  getMainRecentArticles,
} from "@/lib/utils/records";
import IntroSectionWithMenuOption from "./IntroSectionWithMenuOption";
import PageIndicator from "./PageIndicator";

const LatestRecords = ({ records, introTrue }) => {
  const pages = records;
  if (!pages) return null;
  const { lang, locale } = useGeneralSiteSettings();
  const [currentPage, setCurrentPage] = useState(0);
  const [currentRecordType, setCurrentRecordType] = useState("");

  // useMemo를 사용하여 필터링 로직 최적화
  const { firstArticle, restArticles, filteredPages, allOptions } =
    useMemo(() => {
      // 기본 필터링: Project 타입만
      const projectPages = pages;

      // 카테고리 파라미터가 있으면 추가 필터링
      const filtered =
        currentRecordType !== ""
          ? projectPages.filter((page) => {
              const pageType = page?.data?.type;
              if (!pageType) return false;

              // 대소문자 구분 없이 비교
              return pageType.toLowerCase() === currentRecordType.toLowerCase();
            })
          : projectPages;

      // 중복되지 않는 고유한 카테고리만 추출 (전체 프로젝트 페이지 기준)
      const uniqueOptions = Array.from(
        new Set(
          projectPages
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

      const articles = getMainRecentArticles(filtered, lang, 7);
      const firstArticle = articles[0];
      const restArticles = articles.slice(1, articles.length);

      return {
        firstArticle,
        restArticles,
        filteredPages: filtered,
        allOptions: options,
      };
    }, [pages, currentRecordType]); // 의존성 배열에 pages와 categoryParam만 포함

  const CARDS_PER_PAGE = 3;
  const TOTAL_PAGES = Math.ceil(restArticles.length / CARDS_PER_PAGE);

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
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Section Title */}
      <IntroSectionWithMenuOption
        introTrue={introTrue}
        introType="LATEST"
        currentRecordType={currentRecordType}
        allOptions={allOptions}
        handleRecordTypeChange={handleRecordTypeChange}
      />

      {/* Main Featured Article */}
      <div
        className="bg-white rounded-lg shadow-md overflow-hidden mb-8 
      border border-neutral-200 dark:border-neutral-700
       hover:border-neutral-300 dark:hover:border-neutral-600"
      >
        <div className="flex flex-col md:flex-row">
          {/* Left Side - Image */}
          <div className="md:w-1/2 rounded-lg">
            <div
              className={`h-60   
         
            flex items-center justify-center rounded-l-lg
            transition-all duration-300 hover:scale-105`}
              style={{
                backgroundImage: `url(${firstArticle.pageCover})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </div>

          {/* Right Side - Content */}
          <div className="md:w-1/2 h-60 p-6 flex flex-col justify-between  items-start  ">
            <div className="flex flex-col">
              <span className="text-xs text-neutral-500 uppercase tracking-wide mb-2">
                {firstArticle.type} / {firstArticle.category}
              </span>
              <Link
                href={firstArticle.url}
                className=" hover:underline text-xl font-bold text-black mb-4 leading-tight"
              >
                {firstArticle.title}
              </Link>
            </div>

            <h3 className="  text-black mt-1 line-clamp-2">
              {firstArticle.description}
              {/* Barely half of banks' own employees would recommend their inter... */}
            </h3>
            <div className="flex items-center text-sm text-neutral-500">
              <span>{firstArticle.author}</span>
              <span className="mx-2">•</span>
              <span>{firstArticle.date}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Smaller Featured Articles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Article 1 */}
        {getCurrentRecordsWithPagination(
          restArticles,
          currentPage,
          CARDS_PER_PAGE
        ).map((article) => (
          <div
            key={`${article.id}-${currentPage}`}
            className="bg-white rounded-lg shadow-md overflow-hidden
              border border-neutral-200 dark:border-neutral-700
       hover:border-neutral-300 dark:hover:border-neutral-600"
          >
            <div className="flex flex-row">
              <div className="w-30 h-40 bg-neutral-800 flex items-center justify-center">
                <div
                  className={`w-full h-full
                   
                      flex items-center justify-center rounded-l-sm
                      transition-all duration-300 hover:scale-105`}
                  style={{
                    backgroundImage: `url(${article.pageCover})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
              </div>
              <div className="flex-1 p-4 flex flex-col justify-between items-start">
                <span className="text-xs text-neutral-500 uppercase tracking-wide">
                  {article.type} / {article.category}
                </span>
                <Link
                  href={firstArticle.url}
                  className=" hover:underline text-sm font-semibold text-black mt-1 line-clamp-2"
                >
                  {article.title}
                </Link>
                <h5 className="text-sm font-semibold text-black mt-1 line-clamp-2">
                  {article.description}
                </h5>
                <div className="flex flex-col items-start text-xs text-neutral-500 mt-2">
                  <span>{article.author.substr(0, 10)}...</span>
                  <span>{article.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <PageIndicator
        currentPage={currentPage}
        TOTAL_PAGES={TOTAL_PAGES}
        prevPage={prevPage}
        nextPage={nextPage}
      />
    </div>
  );
};

export default LatestRecords;
