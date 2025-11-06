import { getDistanceFromToday, getYearMonthDay } from "@/lib/utils/date";
import { cn, substringWithNumberDots } from "@/lib/utils/general";
import TagItemMini from "@/modules/common/tag/TagItemMini";
import {
  combinedMetaClasses,
  combinedTitleClasses,
  combinedSummaryClasses,
} from "@/lib/styles/card.styles";
import { ContentCardProps } from "@/types/components/cards";
import { CalendarIcon, LockIcon, UserPenIcon } from "lucide-react";
import React, { useCallback, useMemo } from "react";
import CardBase from "./CardBase";

const ContentCard = React.memo(
  React.forwardRef<HTMLDivElement, ContentCardProps>(
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
      // 변수들을 useMemo로 최적화
      const isCompact = useMemo(() => variant === "compact", [variant]);
      const isFeatured = useMemo(() => variant === "featured", [variant]);
      const isDefault = useMemo(() => variant === "default", [variant]);

      // 클래스 계산을 useMemo로 최적화
      const titleClasses = useMemo(
        () =>
          combinedTitleClasses({
            isCompact,
            isDefault,
            isFeatured,
            className: "font-semibold leading-tight",
          }),
        [isCompact, isDefault, isFeatured]
      );

      // handleClick을 useCallback으로 최적화
      const handleClick = useCallback(() => {
        if (onClick) {
          onClick();
        } else if (data.url) {
          window.location.href = data.url;
        }
      }, [onClick, data.url]);

      // 메타데이터 렌더링을 useMemo로 최적화
      const metaContent = useMemo(() => {
        if (!showMeta || (!data.type && !data.date)) return null;

        return (
          <div className={combinedMetaClasses({ className: "" })}>
            {/* 작성자 */}
            {data.author && (
              <div className="flex gap-2 items-center">
                <UserPenIcon className="w-3 h-3" />
                <span className="text-neutral-500 dark:text-neutral-400">
                  {substringWithNumberDots(data.author, 10)}
                </span>
              </div>
            )}
            {data.date && (
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-3 h-3" />
                <span>
                  {getYearMonthDay(data.date, locale?.LOCALE || "en-US")}
                  &nbsp; &nbsp;
                  {getDistanceFromToday(data.date, lang)}
                </span>
              </div>
            )}
          </div>
        );
      }, [showMeta, data.type, data.date, data.author, locale?.LOCALE, lang]);

      // 요약 렌더링을 useMemo로 최적화
      const summaryContent = useMemo(() => {
        if (!showSummary || !data.summary) return null;

        return (
          <p className={combinedSummaryClasses({ className: "" })}>
            {substringWithNumberDots(data.summary, 100)}
          </p>
        );
      }, [showSummary, data.summary]);

      // 태그 렌더링을 useMemo로 최적화
      const tagsContent = useMemo(() => {
        if (!showTags || !data.tags || data.tags.length === 0) return null;

        return (
          <div className="md:flex-nowrap flex-wrap md:justify-start inline-block">
            <TagItemMini
              tags={data.tags}
              className="bg-neutral-200 dark:bg-neutral-500 text-neutral-500 dark:text-neutral-200"
            />
          </div>
        );
      }, [showTags, data.tags]);

      return (
        <CardBase
          ref={ref}
          className={cn(
            "flex flex-col justify-between items-start text-start gap-2",
            isCompact ? "p-3" : "p-4",
            isFeatured && "p-6",
            isDefault && "p-4",
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
          {/* 타입  */}
          <span
            className={combinedMetaClasses({
              className: "mb-0 text-xs flex-row",
            })}
          >
            {data.type} / {data.docType}
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
          {metaContent}

          {/* 요약 */}
          {summaryContent}

          {/* 하단 영역 */}
          <div className="flex flex-row justify-start items-center gap-4">
            {/* 태그 */}
            {tagsContent}
          </div>
        </CardBase>
      );
    }
  )
);

ContentCard.displayName = "ContentCard";

export default ContentCard;
