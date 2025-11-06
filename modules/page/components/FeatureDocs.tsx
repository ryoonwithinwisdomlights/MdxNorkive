"use client";
import { ImageCard } from "@/modules/common/cards";
import { useThemeStore } from "@/lib/stores";
import { transferDataForCardProps } from "@/lib/utils/docs";
import { useCallback, useMemo, useState } from "react";
import IntroSectionWithMenuOption from "./IntroSectionWithMenuOption";
import { OptionItem } from "@/types/components/pageutils";
import { mainDocsProps } from "@/types/components/pageutils";
import { BLOG } from "@/blog.config";
const FeatureDocs = ({
  type,
  introTrue,
  docs,
  docType = false,
}: mainDocsProps): React.ReactElement | null => {
  const pages = docs;
  if (!pages) return null;

  pages.sort((a, b) => {
    return (
      new Date(b?.data?.date).getTime() - new Date(a?.data?.date).getTime()
    );
  });

  const { locale, lang } = useThemeStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentDocType, setcurrentDocType] = useState("");
  const { FEATURED_DOCS_CARDS_PER_PAGE } = BLOG;

  // useMemo를 사용하여 필터링 로직 최적화
  const { filteredPages, allOptions } = useMemo(() => {
    const featuredPages = pages
      .filter(
        (page) =>
          page.data.favorite === true && (type ? page.data.type === type : true)
      )
      .slice(0, FEATURED_DOCS_CARDS_PER_PAGE);

    // currentDocType값 있으면 추가 필터링
    const filtered =
      currentDocType !== ""
        ? featuredPages.filter((page) => {
            const pageType = docType ? page?.data?.doc_type : page?.data?.type;
            if (!pageType) return false;

            // 대소문자 구분 없이 비교
            return pageType.toLowerCase() === currentDocType.toLowerCase();
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

    const uniquedocTypeOptions = Array.from(
      new Set(
        featuredPages
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
      filteredPages: filtered,
      allOptions: allOptions,
    };
  }, [pages, type, currentDocType, docType, locale.COMMON.ALL]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % filteredPages.length);
  }, [filteredPages.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + filteredPages.length) % filteredPages.length
    );
  }, [filteredPages.length]);

  const handleDocTypeChange = useCallback((option: string) => {
    setcurrentDocType(option);
    setCurrentIndex(0);
  }, []);

  const currentPage = useMemo(
    () => filteredPages[currentIndex],
    [filteredPages, currentIndex]
  );

  return (
    <section className="w-full max-w-6xl mx-auto md:px-4 py-8 flex flex-col gap-8">
      {/* Section Title */}
      <IntroSectionWithMenuOption
        introTrue={introTrue}
        introType="FEATURED"
        currentDocType={currentDocType}
        allOptions={allOptions}
        handleDocTypeChange={handleDocTypeChange}
      />

      {/* 주요 게시글 슬라이더 */}
      {currentPage?.data && (
        <ImageCard
          data={transferDataForCardProps(currentPage)}
          imageAlt={currentPage.data.title || ""}
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
          priority={true}
        />
      )}
    </section>
  );
};

export default FeatureDocs;
