import React, { useCallback, useMemo } from "react";

import { cn } from "@/lib/utils/general";

import {
  combinedCardClasses,
  combinedContentContainerClasses,
  combinedImageClasses,
  combinedImageContainerClasses,
} from "@/lib/styles/card.styles";

import { ImageCardProps } from "@/types/components/cards";
import CardBase from "@/modules/common/cards/CardBase";
import ContentCard from "@/modules/common/cards/ContentCard";
import LazyImage from "@/modules/shared/LazyImage";

import { ChevronLeft, ChevronRight } from "lucide-react";

const ImageCard = React.memo(
  React.forwardRef<HTMLDivElement, ImageCardProps>(
    (
      {
        data,
        onClick,
        className,
        imageAlt = "",
        variant = "default",
        showMeta = true,
        showTags = true,
        showSummary = true,
        locale,
        lang,
        isSlider = false,
        onPrevious,
        onNext,
        showNavigation = false,
        currentIndex = 0,
        totalSlides = 1,
        onSlideChange,
        priority = true,
        ...props
      },
      ref
    ) => {
      // const isHorizontal = variant === "horizontal";
      // const isVertical = variant === "vertical";
      // const isFeatured = variant === "featured";
      // 변수들을 useMemo로 최적화
      const isHorizontal = useMemo(() => variant === "horizontal", [variant]);
      const isVertical = useMemo(() => variant === "vertical", [variant]);
      const isFeatured = useMemo(() => variant === "featured", [variant]);

      // 클래스 계산을 useMemo로 최적화
      const cardClasses = useMemo(
        () =>
          combinedCardClasses({
            isHorizontal,
            isVertical,
            isFeatured,
            className: "group overflow-hidden",
          }),
        [isHorizontal, isVertical, isFeatured]
      );

      const imageContainerClasses = useMemo(
        () =>
          combinedImageContainerClasses({
            isHorizontal,
            isVertical,
            isFeatured,
            className: "overflow-hidden rounded-xl",
          }),
        [isHorizontal, isVertical, isFeatured]
      );

      const contentContainerClasses = useMemo(
        () =>
          combinedContentContainerClasses({
            isHorizontal,
            isVertical,
            isFeatured,
            className: "flex flex-col justify-between",
          }),
        [isHorizontal, isVertical, isFeatured]
      );

      const imageClasses = useMemo(
        () =>
          combinedImageClasses({
            isHorizontal,
            isVertical,
            isFeatured,
            className:
              "rounded-xl border border-neutral-200 dark:border-neutral-700",
          }),
        [isHorizontal, isVertical, isFeatured]
      );
      // handleClick을 useCallback으로 최적화
      const handleClick = useCallback(() => {
        if (onClick) {
          onClick();
        } else if (data.url) {
          window.location.href = data.url;
        }
      }, [onClick, data.url]);

      // 네비게이션 핸들러들을 useCallback으로 최적화
      const handlePrevious = useCallback(() => {
        if (onPrevious) {
          onPrevious();
        }
      }, [onPrevious]);

      const handleNext = useCallback(() => {
        if (onNext) {
          onNext();
        }
      }, [onNext]);

      // 이미지 영역 렌더링을 useMemo로 최적화
      const imageContent = useMemo(() => {
        if (!data.imageUrl) return null;

        // 반응형 이미지 크기 설정 - LCP 최적화를 위해 더 작게
        const responsiveSizes = isFeatured
          ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
          : "(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 250px";

        return (
          <LazyImage
            alt={imageAlt || ""}
            src={data.imageUrl}
            className={imageClasses}
            width={isFeatured ? 300 : 250}
            height={isFeatured ? 200 : 150}
            priority={priority}
            sizes={responsiveSizes}
            quality={75}
          />
        );
      }, [
        data.imageUrl,
        data.imageAlt,
        data.title,
        imageContainerClasses,
        imageClasses,
        isFeatured,
      ]);

      // 네비게이션 버튼 렌더링을 useMemo로 최적화
      const navigationButtons = useMemo(() => {
        if (!showNavigation || !isSlider || totalSlides <= 1) return null;

        return (
          <div>
            <button
              aria-label="Previous slide"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              className={cn(
                "absolute hover:cursor-pointer left-10 top-1/2 transform -translate-y-1/2 w-8 h-8 border border-neutral-200 bg-white dark:bg-neutral-800 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
              )}
            >
              <ChevronLeft className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
            </button>
            <button
              aria-label="Next slide"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute hover:cursor-pointer right-10 top-1/2 transform -translate-y-1/2 w-8 h-8 border border-neutral-200 bg-white dark:bg-neutral-800 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <ChevronRight className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
            </button>
          </div>
        );
      }, [showNavigation, isSlider, totalSlides, handlePrevious, handleNext]);

      // 슬라이더 인디케이터 렌더링을 useMemo로 최적화
      const sliderIndicator = useMemo(() => {
        if (!isSlider || totalSlides <= 1) return null;

        return (
          <div className="mt-6 flex flex-row  justify-center items-center  gap-2 overflow-hidden">
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  onSlideChange?.(index);
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex
                    ? "bg-neutral-600 dark:bg-neutral-200"
                    : "bg-neutral-300 dark:bg-neutral-600"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        );
      }, [isSlider, totalSlides, currentIndex, onSlideChange]);
      return (
        <CardBase
          ref={ref}
          className={cn("w-full p-4 md:p-8")}
          onClick={handleClick}
          hover={true}
          shadow="md"
          border={true}
          rounded="lg"
          background="gradient"
          padding="none"
          {...props}
        >
          <div className={cardClasses}>
            {data.imageUrl && (
              <div className={imageContainerClasses}>
                {/* 이미지 영역 */}
                {imageContent}
                {/* 슬라이더 네비게이션 */}
                {navigationButtons}
              </div>
            )}

            {/* 콘텐츠 영역 */}
            <div className={contentContainerClasses}>
              <ContentCard
                data={data}
                onClick={handleClick}
                variant={isFeatured ? "featured" : "default"}
                showMeta={showMeta}
                showTags={showTags}
                showSummary={showSummary}
                locale={locale}
                lang={lang}
                background="transparent"
                hover={false}
                className="border-0 shadow-none p-0 bg-transparent"
              />
            </div>
          </div>

          {/* 슬라이더 인디케이터 */}
          {sliderIndicator}
        </CardBase>
      );
    }
  )
);

ImageCard.displayName = "ImageCard";

export default ImageCard;
