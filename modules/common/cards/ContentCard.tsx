import { getDistanceFromToday, getYearMonthDay } from "@/lib/utils/date";
import { cn, substringWithNumberDots } from "@/lib/utils/general";
import TagItemMini from "@/modules/common/tag/TagItemMini";
import {
  CalendarIcon,
  LockIcon,
  PencilLineIcon,
  UserPenIcon,
} from "lucide-react";
import React from "react";
import CardBase from "./CardBase";
import { TransferedDataProps } from "@/types";

export interface ContentCardProps {
  data: TransferedDataProps;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "compact" | "featured";
  showMeta?: boolean;
  showTags?: boolean;
  showSummary?: boolean;
  locale?: any;
  lang: string;
  hover?: boolean;
  border?: boolean;
  background?: "default" | "gradient" | "transparent";
}

const ContentCard = React.forwardRef<HTMLDivElement, ContentCardProps>(
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
      hover,
      border,
      ...props
    },
    ref
  ) => {
    const isCompact = variant === "compact";
    const isFeatured = variant === "featured";

    const titleClasses = cn(
      "line-clamp-2 font-normal text-neutral-800 dark:text-white leading-tight",
      isCompact && "text-lg",
      isFeatured && "text-2xl lg:text-3xl font-bold",
      !isCompact && !isFeatured && "text-2xl font-semibold",
      onClick && "cursor-pointer hover:underline"
    );

    const metaClasses = cn(
      "flex flex-col items-start gap-2 text-neutral-500 dark:text-neutral-400 text-xs"
    );

    const summaryClasses = cn(
      "py-4 text-neutral-500 dark:text-neutral-200 text-sm font-light"
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
        className={cn(
          "flex flex-col justify-between items-start text-start gap-2",
          isCompact ? "p-3" : "p-4",
          isFeatured && "p-6",
          className
        )}
        onClick={handleClick}
        hover={hover}
        shadow="md"
        border={border}
        rounded="lg"
        background="gradient"
        {...props}
      >
        {/* 타입 */}
        <span className={cn(metaClasses, "mb-0 text-xs flex-row")}>
          {data.type} / {data.subType}
        </span>
        {/* 제목 */}
        <div
          className={cn(
            "flex flex-row justify-start gap-2",
            isCompact && "gap-1"
          )}
        >
          <span className={titleClasses}>
            {substringWithNumberDots(data.title, isCompact ? 25 : 35)}
          </span>
          {data.isLocked && (
            <div className="flex flex-row gap-1 text-sm justify-start items-center text-neutral-500 dark:text-neutral-400">
              <LockIcon className={cn("w-4 h-4", isCompact && "w-3 h-3")} />
              <span className="text-sm">
                {locale?.COMMON?.LOCKED || "Locked"}
              </span>
            </div>
          )}
        </div>

        {/* 메타데이터 */}
        {showMeta && (data.type || data.date) && (
          <div className={metaClasses}>
            {/* 작성자 */}
            {data.author && (
              <div className="flex gap-2 items-center  ">
                <UserPenIcon className="w-3 h-3" />
                <span className=" text-neutral-500 dark:text-neutral-400 ">
                  {substringWithNumberDots(data.author, 10)}
                </span>
              </div>
            )}
            {data.date && (
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-3 h-3" />
                <span>
                  {getYearMonthDay(
                    data.date,
                    locale?.LOCALE === "kr-KR" ? "kr-KR" : "en-US"
                  )}
                  &nbsp; &nbsp;
                  {getDistanceFromToday(data.date, lang)}
                </span>
              </div>
            )}
          </div>
        )}

        {/* 요약 */}
        {showSummary && data.summary && (
          <p className={summaryClasses}>
            {substringWithNumberDots(data.summary, 100)}
          </p>
        )}

        {/* 하단 영역 */}
        <div className="flex flex-row justify-start items-center gap-4">
          {/* 태그 */}
          {showTags && data.tags && data.tags.length > 0 && (
            <div className="md:flex-nowrap flex-wrap md:justify-start inline-block">
              <TagItemMini
                tags={data.tags}
                className="bg-neutral-200 dark:bg-neutral-500 text-neutral-500 dark:text-neutral-200"
              />
            </div>
          )}
        </div>
      </CardBase>
    );
  }
);

ContentCard.displayName = "ContentCard";

export default ContentCard;
