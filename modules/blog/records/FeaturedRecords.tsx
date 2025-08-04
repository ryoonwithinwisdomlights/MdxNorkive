"use client";
import NotFound from "@/app/not-found";
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import { getDistanceFromToday, getYearMonthDay } from "@/lib/utils/date";
import LazyImage from "@/modules/common/components/shared/LazyImage";
import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  FolderClosedIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const FeaturedRecords = ({ sub_type, introText, records }) => {
  const pages = records;
  console.log("FeaturedRecords::", pages);
  const { locale, lang } = useGeneralSiteSettings();
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!pages) NotFound();

  // favorite이 true인 데이터만 필터링
  const favoritePages = pages.filter(
    (page) =>
      page.data.favorite === true &&
      (sub_type !== "" ? page.data.sub_type === sub_type : true)
  );

  if (favoritePages.length === 0) {
    return null; // favorite 게시글이 없으면 아무것도 표시하지 않음
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % favoritePages.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + favoritePages.length) % favoritePages.length
    );
  };

  const currentPage = favoritePages[currentIndex];

  return (
    <section className="px-4 w-full">
      {/* 섹션 제목 */}
      {introText && (
        <div className="text-end mb-6 flex flex-col gap-2">
          <h2 className="text-4xl font-bold text-neutral-900 dark:text-white  ">
            {locale.INTRO.FAVORITE_RECORDS}
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-300">
            {locale.INTRO.FAVORITE_RECORDS_DESC}
          </p>
        </div>
      )}

      {/* 주요 게시글 슬라이더 */}
      <div
        className="relative bg-gradient-to-br from-white to-neutral-200
       dark:from-neutral-900 dark:to-neutral-700 rounded-lg 
       border border-neutral-200 dark:border-neutral-700 overflow-hidden
       hover:shadow-lg transition-all duration-300
         hover:border-neutral-300 dark:hover:border-neutral-600  p-8
         flex flex-col gap-4
       "
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* 왼쪽: 텍스트 내용 */}
          <div className="flex-1">
            <div className="flex flex-col h-full justify-between">
              <div>
                {/* 제목 */}
                <h3 className="text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-white mb-4 leading-tight">
                  {currentPage.data.title}
                </h3>

                {/* 날짜 */}
                <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 mb-4">
                  <CalendarIcon className="w-4 h-4" />
                  <span className="text-sm">
                    {getYearMonthDay(
                      currentPage.data.date,
                      locale === "kr-KR" ? "kr-KR" : "en-US"
                    )}
                    &nbsp; &nbsp;
                    {getDistanceFromToday(currentPage.data.date, lang)}
                  </span>
                </div>

                {/* 요약 */}
                {currentPage.data.summary && (
                  <p className="text-neutral-600 dark:text-neutral-300 text-lg leading-relaxed mb-6">
                    {currentPage.data.summary}
                  </p>
                )}

                {/* 카테고리 */}
                {currentPage.data.category && (
                  <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 mb-6">
                    <FolderClosedIcon className="w-4 h-4" />
                    <span className="text-sm">{currentPage.data.category}</span>
                  </div>
                )}
              </div>

              {/* 자세히 보기 버튼 */}
              <Link
                href={currentPage.url}
                className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-300 font-medium hover:underline transition-all duration-300"
              >
                {locale.INTRO.READ_MORE}→
              </Link>
            </div>
          </div>

          {/* 오른쪽: 이미지 영역 */}
          <div className="flex-1 relative  flex items-center justify-center h-[250px]  ">
            {/* 페이지 커버 이미지가 있으면 표시, 없으면 기본 일러스트레이션 */}
            {currentPage.data.pageCover ? (
              <LazyImage
                alt={currentPage.data.title}
                priority={true}
                src={currentPage.data.pageCover}
                className="h-full w-full border border-neutral-200 dark:border-neutral-700  rounded-xl object-cover object-center 
               "
              />
            ) : (
              <div className="text-center">
                <div className="h-full w-full mx-auto mb-4 bg-gradient-to-br from-neutral-400 to-blue-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">
                    {currentPage.data.title.charAt(0)}
                  </span>
                </div>
                <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                  {currentPage.data.title}
                </p>
              </div>
            )}

            {/* 슬라이더 화살표 */}
            {favoritePages.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute hover:cursor-pointer   left-10 top-1/2 transform -translate-y-1/2 w-8 h-8 border border-neutral-200 
                  bg-white dark:bg-neutral-800 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
                >
                  <ChevronLeft className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute hover:cursor-pointer right-10 top-1/2 transform -translate-y-1/2 w-8 h-8 border border-neutral-200  bg-white dark:bg-neutral-800 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
                >
                  <ChevronRight className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* 슬라이더 인디케이터 */}
        {favoritePages.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
            {favoritePages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex
                    ? "bg-neutral-600 dark:bg-neutral-200"
                    : "bg-neutral-300 dark:bg-neutral-600"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedRecords;
