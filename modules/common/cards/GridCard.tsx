import React, { useCallback, useMemo } from "react";

import { substringWithNumberDots } from "@/lib/utils/general";
import {
  combinedCardClasses,
  combinedContentClasses,
  combinedDescriptionClasses,
  combinedImageClasses,
  combinedImageContainerClasses,
  combinedTitleClasses,
  GridCardProps,
} from "@/types";

import CardBase from "@/modules/common/cards/CardBase";
import TagItemMini from "@/modules/common/tag/TagItemMini";
import LazyImage from "@/modules/shared/LazyImage";
import { CalendarIcon, PencilLineIcon } from "lucide-react";

const GridCard = React.memo(React.forwardRef<HTMLDivElement, GridCardProps>(
  (
    {
      title,
      type,
      subType,
      author,
      description,
      date,
      distanceFromToday,
      tags,
      imageUrl,
      imageAlt,
      url,
      onClick,
      className,
      variant = "default",
      showImage = true,
      showMeta = true,
      showTags = true,
      showDescription = true,
      locale,
      ...props
    },
    ref
  ) => {
    // 변수들을 useMemo로 최적화
    const isCompact = useMemo(() => variant === "compact", [variant]);
    const isLarge = useMemo(() => variant === "large", [variant]);
    const isDefault = useMemo(() => variant === "default", [variant]);

    // 클래스 계산을 useMemo로 최적화
    const cardClasses = useMemo(() => combinedCardClasses({
      className: "h-full overflow-hidden",
    }), []);
    
    const imageContainerClasses = useMemo(() => combinedImageContainerClasses({
      isCompact,
      isLarge,
      className:
        "flex md:flex-0 flex-1 rounded-lg items-start justify-center w-full",
    }), [isCompact, isLarge]);

    const imageClasses = useMemo(() => combinedImageClasses({
      isCompact,
      className: "md:rounded-none rounded-r-lg",
    }), [isCompact]);
    
    const contentClasses = useMemo(() => combinedContentClasses({
      isCompact,
      isLarge,
      className: "flex flex-1 flex-col items-start  justify-start gap-3 ",
    }), [isCompact, isLarge]);

    const titleClasses = useMemo(() => combinedTitleClasses({
      isCompact,
      isLarge,
      isDefault,
      className: "font-semibold leading-tight",
    }), [isCompact, isLarge, isDefault]);

    const descriptionClasses = useMemo(() => combinedDescriptionClasses({
      isCompact,
    }), [isCompact]);

    // handleClick을 useCallback으로 최적화
    const handleClick = useCallback(() => {
      if (onClick) {
        onClick();
      } else if (url) {
        window.location.href = url;
      }
    }, [onClick, url]);

    // 메타데이터 렌더링을 useMemo로 최적화
    const metaContent = useMemo(() => {
      if (!showMeta || (!type && !date)) return null;
      
      return (
        <div className="flex flex-col gap-2 text-sm text-neutral-500 dark:text-neutral-400">
          {type && (
            <div className="flex items-center gap-2">
              <PencilLineIcon className="w-3 h-3" />
              <span>{type} / {subType}</span>
            </div>
          )}
          {date && (
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-3 h-3" />
              <span>{date}</span>
              {distanceFromToday && (
                <span className="text-xs">({distanceFromToday})</span>
              )}
            </div>
          )}
        </div>
      );
    }, [showMeta, type, subType, date, distanceFromToday]);

    // 태그 렌더링을 useMemo로 최적화
    const tagsContent = useMemo(() => {
      if (!showTags || !tags || tags.length === 0) return null;
      
      return (
        <div className="flex flex-wrap gap-2">
          <TagItemMini
            tags={tags}
            className="bg-neutral-200 dark:bg-neutral-500 text-neutral-500 dark:text-neutral-200"
          />
        </div>
      );
    }, [showTags, tags]);

    // 이미지 렌더링을 useMemo로 최적화
    const imageContent = useMemo(() => {
      if (!showImage || !imageUrl) return null;
      
      return (
        <div className={imageContainerClasses}>
          <LazyImage
            src={imageUrl}
            alt={imageAlt || title}
            className={imageClasses}
            width={isCompact ? 120 : 200}
            height={isCompact ? 80 : 150}
          />
        </div>
      );
    }, [showImage, imageUrl, imageAlt, title, imageContainerClasses, imageClasses, isCompact]);

    return (
      <CardBase
        ref={ref}
        className={cardClasses}
        onClick={handleClick}
        hover={true}
        shadow="md"
        border={true}
        rounded="lg"
        background="default"
        padding="none"
        {...props}
      >
        <div className="flex flex-row gap-4 p-4">
          {/* 이미지 영역 */}
          {imageContent}
          
          {/* 콘텐츠 영역 */}
          <div className={contentClasses}>
            {/* 제목 */}
            <h3 className={titleClasses}>
              {substringWithNumberDots(title, isCompact ? 30 : 50)}
            </h3>
            
            {/* 메타데이터 */}
            {metaContent}
            
            {/* 설명 */}
            {showDescription && description && (
              <p className={descriptionClasses}>
                {substringWithNumberDots(description, isCompact ? 80 : 120)}
              </p>
            )}
            
            {/* 태그 */}
            {tagsContent}
          </div>
        </div>
      </CardBase>
    );
  }
));

GridCard.displayName = "GridCard";

export default GridCard;
