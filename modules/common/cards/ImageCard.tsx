import React from "react";

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

const ImageCard = React.forwardRef<HTMLDivElement, ImageCardProps>(
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
    const isHorizontal = variant === "horizontal";
    const isVertical = variant === "vertical";
    const isFeatured = variant === "featured";

    const cardClasses = combinedCardClasses({
      isHorizontal,
      isVertical,
      isFeatured,
      className: "group overflow-hidden",
    });

    const imageContainerClasses = combinedImageContainerClasses({
      isHorizontal,
      isVertical,
      isFeatured,
      className: "overflow-hidden rounded-xl",
    });

    const contentContainerClasses = combinedContentContainerClasses({
      isHorizontal,
      isVertical,
      isFeatured,
      className: "flex flex-col justify-between",
    });

    const imageClasses = combinedImageClasses({
      isHorizontal,
      isVertical,
      isFeatured,
      className: "rounded-xl border border-neutral-200 dark:border-neutral-700",
    });

    const handleClick = () => {
      if (onClick) {
        onClick();
      } else if (data.url) {
        window.location.href = data.url;
      }
    };

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
          {data.imageUrl && (
            <div className={imageContainerClasses}>
              <LazyImage
                alt={data.imageAlt || data.title}
                priority={isFeatured}
                src={data.imageUrl}
                className={imageClasses}
              />

              {/* 슬라이더 네비게이션 */}
              {isSlider && showNavigation && totalSlides > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPrevious?.();
                    }}
                    className={cn(
                      "absolute hover:cursor-pointer left-10 top-1/2 transform -translate-y-1/2 w-8 h-8 border border-neutral-200 bg-white dark:bg-neutral-800 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
                    )}
                  >
                    <ChevronLeft className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNext?.();
                    }}
                    className="absolute hover:cursor-pointer right-10 top-1/2 transform -translate-y-1/2 w-8 h-8 border border-neutral-200 bg-white dark:bg-neutral-800 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <ChevronRight className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
                  </button>
                </>
              )}
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
        {isSlider && totalSlides > 1 && (
          <div className="mt-6 flex flex-row  justify-center items-center  gap-2 overflow-hidden">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  onSlideChange?.(index);
                }}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  index === currentIndex
                    ? "bg-neutral-600 dark:bg-neutral-200"
                    : "bg-neutral-300 dark:bg-neutral-600"
                )}
              />
            ))}
          </div>
        )}
      </CardBase>
    );
  }
);

ImageCard.displayName = "ImageCard";

export default ImageCard;
