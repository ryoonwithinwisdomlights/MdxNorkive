import React, { useMemo } from "react";

import { substringWithNumberDots } from "@/lib/utils/general";
import {
  combinedCardClasses,
  combinedContentClasses,
  combinedDescriptionClasses,
  combinedImageClasses,
  combinedImageContainerClasses,
  combinedTitleClasses,
} from "@/lib/styles/card.styles";
import { GridCardProps } from "@/types/components/cards";
import CardBase from "@/modules/common/cards/CardBase";
import TagItemMini from "@/modules/common/tag/TagItemMini";
import LazyImage from "@/modules/shared/LazyImage";
import { CalendarIcon, PencilLineIcon } from "lucide-react";

const GridCard = React.memo(
  React.forwardRef<HTMLDivElement, GridCardProps>(
    (
      {
        title,
        type,
        docType,
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
      // console.log(title);
      const isCompact = variant === "compact";
      const isLarge = variant === "large";
      const isDefault = variant === "default";

      const cardClasses = combinedCardClasses({
        className: "h-full overflow-hidden",
      });
      const imageContainerClasses = combinedImageContainerClasses({
        isCompact,
        isLarge,
        className:
          "flex md:flex-0 flex-1 rounded-lg items-start justify-center w-full",
      });

      const imageClasses = combinedImageClasses({
        isCompact,
        className: "md:rounded-none rounded-r-lg",
      });
      const contentClasses = combinedContentClasses({
        isCompact,
        isLarge,
        className: "flex flex-1 flex-col items-start  justify-start gap-3 ",
      });

      const titleClasses = combinedTitleClasses({
        isCompact,
        isLarge,
        isDefault,
        className: "font-semibold leading-tight",
      });

      const descriptionClasses = combinedDescriptionClasses({
        isCompact,
      });

      const handleClick = () => {
        if (onClick) {
          onClick();
        } else if (url) {
          window.location.href = url;
        }
      };

      // 이미지 렌더링을 useMemo로 최적화
      const imageContent = useMemo(() => {
        if (!showImage) return null;

        return (
          <div className={imageContainerClasses}>
            {imageUrl ? (
              <LazyImage
                alt={imageAlt || ""}
                priority={false}
                src={imageUrl}
                className={imageClasses}
                width={isCompact ? 200 : 300}
                height={isCompact ? 150 : 200}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 300px"
                quality={80}
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
        );
      }, [
        showImage,
        imageUrl,
        imageAlt,
        title,
        imageContainerClasses,
        imageClasses,
        isCompact,
      ]);

      const titleContent = useMemo(() => {
        return (
          <div className="flex flex-col items-start gap-2">
            {/* 타입 */}
            <span className="text-xs text-neutral-500 dark:text-neutral-400  uppercase tracking-wide">
              {type} / {docType}
            </span>
            {/* 제목 */}
            {title && <h3 className={titleClasses}>{title}</h3>}
          </div>
        );
      }, [title, type, docType]);

      const descriptionContent = useMemo(() => {
        if (!showDescription || !description) return null;
        return <p className={descriptionClasses}>{description}...</p>;
      }, [showDescription, description]);

      // 메타데이터 렌더링을 useMemo로 최적화
      const metaContent = useMemo(() => {
        return (
          <div className="flex flex-col gap-2">
            {author && (
              <div className="flex gap-2 items-center text-xs text-neutral-500 dark:text-neutral-400 ">
                <PencilLineIcon className="w-3 h-3" />
                <span className="text-xs text-neutral-500 dark:text-neutral-400 ">
                  {substringWithNumberDots(author, 10)}
                </span>
              </div>
            )}
            {showMeta && date && (
              <div className="flex gap-2 items-center text-xs text-neutral-500 dark:text-neutral-400">
                <CalendarIcon className="w-3 h-3" />
                <span>
                  {date} &nbsp; &nbsp;{distanceFromToday}
                </span>
              </div>
            )}
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
        );
      }, [showMeta, showTags, tags, author, date, distanceFromToday]);

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
          {imageContent}
          {/* 콘텐츠 영역 */}
          <div className={contentClasses}>
            {/* 제목 & 타입 */}
            {titleContent}

            {/* 설명 */}
            {descriptionContent}
            {/* 메타데이터 */}
            {metaContent}
          </div>
        </CardBase>
      );
    }
  )
);

GridCard.displayName = "GridCard";

export default GridCard;
