import { cn, substringWithNumberDots } from "@/lib/utils/general";
import TagItemMini from "@/modules/common/tag/TagItemMini";
import LazyImage from "@/modules/shared/LazyImage";
import { CalendarIcon, PencilLineIcon } from "lucide-react";
import React from "react";
import CardBase from "@/modules/common/cards/CardBase";
import { GridCardProps } from "@/types";

const GridCard = React.forwardRef<HTMLDivElement, GridCardProps>(
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
    const isCompact = variant === "compact";
    const isLarge = variant === "large";

    const cardClasses = cn("h-full overflow-hidden ", className);

    const imageContainerClasses = cn(
      " flex md:flex-0 flex-1 rounded-lg items-start justify-center w-full ",
      isCompact ? "h-40" : "h-48",
      isLarge && "h-64"
    );

    const imageClasses = cn(
      "w-full h-full object-cover object-center ",
      isCompact ? "h-40 " : "h-48",
      "md:rounded-none rounded-r-lg transition-all duration-300 hover:scale-110 "
    );
    const contentClasses = cn(
      "flex flex-1 flex-col items-start  justify-start gap-3 ",
      isCompact ? "p-4" : "p-6",
      isLarge && "p-8"
    );

    const titleClasses = cn(
      "font-semibold text-neutral-800 dark:text-white  line-clamp-2 hover:underline",
      isCompact ? "text-lg" : "text-xl",
      isLarge && "text-2xl"
    );

    const descriptionClasses = cn(
      "text-neutral-600 dark:text-neutral-300 text-sm  line-clamp-3",
      isCompact && "line-clamp-2"
    );

    const handleClick = () => {
      if (onClick) {
        onClick();
      } else if (url) {
        window.location.href = url;
      }
    };

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
        {/* 이미지 영역 */}
        {showImage && (
          <div className={imageContainerClasses}>
            {imageUrl ? (
              <LazyImage
                alt={imageAlt || title}
                priority={false}
                src={imageUrl}
                className={imageClasses}
              />
            ) : (
              <div
                className="md:w-full w-40 h-40  bg-gradient-to-br from-neutral-400 to-blue-400 flex items-center justify-center"
                style={{
                  backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {!imageUrl && (
                  <span className="text-white text-4xl font-bold">
                    {title.charAt(0)}
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* 콘텐츠 영역 */}
        <div className={contentClasses}>
          <div className="flex flex-col items-start">
            {/* 타입 */}
            <span className="text-xs text-neutral-500 dark:text-neutral-400  uppercase tracking-wide">
              {type} / {subType}
            </span>
            {/* 제목 */}
            <h3 className={titleClasses}>{title}</h3>
          </div>

          {/* 설명 */}
          {showDescription && description && (
            <p className={descriptionClasses}>{description}...</p>
          )}
          {/* 메타데이터 */}
          <div className="flex flex-col gap-2">
            {/* 작성자 */}
            {author && (
              <div className="flex gap-2 items-center text-xs text-neutral-500 dark:text-neutral-400 ">
                <PencilLineIcon className="w-3 h-3" />
                <span className="text-xs text-neutral-500 dark:text-neutral-400 ">
                  {substringWithNumberDots(author, 10)}
                </span>
              </div>
            )}
            {/* 날짜 */}
            {showMeta && date && (
              <div className="flex gap-2 items-center text-xs text-neutral-500 dark:text-neutral-400">
                <CalendarIcon className="w-3 h-3" />
                <span>
                  {date} &nbsp; &nbsp;{distanceFromToday}
                </span>
              </div>
            )}
            {/* 태그 */}
            {showTags && tags && tags.length > 0 && (
              <div className="flex gap-2 items-start break-all">
                <TagItemMini
                  tags={tags}
                  className="bg-neutral-200
                   dark:bg-neutral-700 text-neutral-600
                    dark:text-neutral-300 
                    line-clamp-1
                    "
                />
              </div>
            )}
          </div>
        </div>
      </CardBase>
    );
  }
);

GridCard.displayName = "GridCard";

export default GridCard;
