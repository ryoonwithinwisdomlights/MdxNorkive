import React from "react";
import { cn } from "@/lib/utils/general";
import CardBase from "./CardBase";
import ContentCard from "./ContentCard";
import LazyImage from "@/modules/shared/LazyImage";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TransferedDataProps } from "@/types";

export interface ImageCardProps {
  data: TransferedDataProps;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "horizontal" | "vertical" | "featured";
  showMeta?: boolean;
  showTags?: boolean;
  showSummary?: boolean;
  locale?: any;
  lang: string;
  // 슬라이더 관련 props
  isSlider?: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
  showNavigation?: boolean;
  currentIndex?: number;
  totalSlides?: number;
  onSlideChange?: (index: number) => void;
}

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

    const cardClasses = cn(
      "group overflow-hidden",
      isHorizontal && "flex flex-col md:flex-row",
      isHorizontal && "md:flex-row-reverse gap-4",
      isVertical && "flex flex-col",
      isFeatured && "relative flex flex-col gap-4",
      className
    );

    const imageContainerClasses = cn(
      "overflow-hidden rounded-xl ",
      isHorizontal && "md:w-5/12 relative",
      isVertical && "h-48",
      isFeatured && "flex-1 relative flex items-center justify-center"
    );

    const contentContainerClasses = cn(
      "flex flex-col justify-between",
      isHorizontal && "md:w-7/12 ",
      isVertical && "p-6",
      isFeatured && "flex-1"
    );

    const imageClasses = cn(
      "w-full h-full object-cover object-center rounded-xl ",
      isHorizontal && "h-56",
      isVertical && "h-48",
      isFeatured && "h-56 w-full  ",
      "border border-neutral-200 dark:border-neutral-700 transition-transform duration-500 hover:scale-110"
    );

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
        // className={cn("w-full p-4 md:p-8", isHorizontal && "md:max-md:h-72")}
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
