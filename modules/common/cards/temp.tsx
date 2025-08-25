import React, { useCallback, useMemo } from "react";

import { cn } from "@/lib/utils/general";

import {
  combinedCardClasses,
  combinedContentContainerClasses,
  combinedImageClasses,
  combinedImageContainerClasses,
  ImageCardProps,
} from "@/types";

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
        ...props
      },
      ref
    ) => {
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

        return (
          <div className={imageContainerClasses}>
            <LazyImage
              alt={data.imageAlt || data.title}
              src={data.imageUrl}
              className={imageClasses}
              width={isFeatured ? 400 : 300}
              height={isFeatured ? 250 : 200}
            />
          </div>
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
        if (!showNavigation || !isSlider) return null;

        return (
          <div className="absolute inset-0 flex items-center justify-between p-4">
            <button
              onClick={handlePrevious}
              className="bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        );
      }, [showNavigation, isSlider, handlePrevious, handleNext]);

      // 슬라이더 인디케이터 렌더링을 useMemo로 최적화
      const sliderIndicator = useMemo(() => {
        if (!isSlider || totalSlides <= 1) return null;

        return (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                key={index}
                onClick={() => onSlideChange?.(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex
                    ? "bg-white"
                    : "bg-white/50 hover:bg-white/75"
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
            {/* 이미지 영역 */}
            {imageContent}

            {/* 콘텐츠 영역 */}
            <div className={contentContainerClasses}>
              <ContentCard
                data={data}
                showMeta={showMeta}
                showTags={showTags}
                showSummary={showSummary}
                locale={locale}
                lang={lang}
                variant={variant}
              />
            </div>

            {/* 네비게이션 버튼 */}
            {navigationButtons}

            {/* 슬라이더 인디케이터 */}
            {sliderIndicator}
          </div>
        </CardBase>
      );
    }
  )
);

ImageCard.displayName = "ImageCard";

export default ImageCard;
