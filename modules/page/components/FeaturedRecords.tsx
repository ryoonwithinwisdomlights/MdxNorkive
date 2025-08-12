"use client";
import { ImageCard } from "@/modules/common/cards";
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import { transferDataForCardProps } from "@/lib/utils/records";
import { useMemo, useState } from "react";
import IntroSectionWithMenuOption from "./IntroSectionWithMenuOption";
import { mainRecordProps } from "@/types";

const FeaturedRecords = ({
  type = "",
  introTrue,
  records,
  subType = false,
}: mainRecordProps) => {
  const pages = records;
  if (!pages) return null;

  pages.sort((a, b) => {
    return (
      new Date(b?.data?.date).getTime() - new Date(a?.data?.date).getTime()
    );
  });

  const { locale, lang } = useGeneralSiteSettings();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentRecordType, setCurrentRecordType] = useState("");

  // useMemo를 사용하여 필터링 로직 최적화
  const { filteredPages, allOptions } = useMemo(() => {
    const featuredPages = pages
      .filter(
        (page) =>
          page.data.favorite === true &&
          (type !== "" ? page.data.type === type : true)
      )
      .slice(0, 10);

    // currentRecordType값 있으면 추가 필터링
    const filtered =
      currentRecordType !== ""
        ? featuredPages.filter((page) => {
            const pageType = subType ? page?.data?.sub_type : page?.data?.type;
            if (!pageType) return false;

            // 대소문자 구분 없이 비교
            return pageType.toLowerCase() === currentRecordType.toLowerCase();
          })
        : featuredPages;

    // 중복되지 않는 고유한 타입만 추출 (전체 프로젝트 페이지 기준)
    const uniqueTypeOptions = Array.from(
      new Set(
        featuredPages
          .map((item) => item?.data?.type)
          .filter((data): data is string => Boolean(data))
      )
    );

    const uniqueSubTypeOptions = Array.from(
      new Set(
        featuredPages
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
      filteredPages: filtered,
      allOptions: allOptions,
    };
  }, [pages, type, currentRecordType, subType, locale.COMMON.ALL]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredPages.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + filteredPages.length) % filteredPages.length
    );
  };

  const handleRecordTypeChange = (option: string) => {
    setCurrentRecordType(option);
    setCurrentIndex(0);
  };

  const currentPage = filteredPages[currentIndex];

  return (
    <section className="w-full max-w-6xl mx-auto md:px-4 py-8 flex flex-col gap-8">
      {/* Section Title */}
      <IntroSectionWithMenuOption
        introTrue={introTrue}
        introType="FEATURED"
        currentRecordType={currentRecordType}
        allOptions={allOptions}
        handleRecordTypeChange={handleRecordTypeChange}
      />

      {/* 주요 게시글 슬라이더 */}
      {currentPage?.data && (
        <ImageCard
          data={transferDataForCardProps(currentPage)}
          variant="horizontal"
          showMeta={true}
          showTags={true}
          showSummary={true}
          locale={locale}
          lang={lang}
          isSlider={true}
          onPrevious={prevSlide}
          onNext={nextSlide}
          showNavigation={filteredPages.length > 1}
          currentIndex={currentIndex}
          totalSlides={filteredPages.length}
          onSlideChange={setCurrentIndex}
        />
      )}
    </section>
  );
};

export default FeaturedRecords;
