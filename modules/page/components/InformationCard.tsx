"use client";
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import { getDistanceFromToday, getYearMonthDay } from "@/lib/utils/date";
import { CardInfoDivProps } from "@/types";
import {
  CalendarIcon,
  FolderClosedIcon,
  LockIcon,
  TagIcon,
} from "lucide-react";
import Link from "next/link";
import TagItemMini from "@/modules/common/tag/TagItemMini";
/**
 * Portfolio list text content
 * @param {*} param0
 * @returns
 */
const InformationCard = ({
  page,
  showPreview,
  showPageCover,
  showSummary,
}: CardInfoDivProps) => {
  const { locale, lang } = useGeneralSiteSettings();

  return (
    <div
      className={`flex flex-col justify-between lg:p-6 p-4   ${
        showPageCover && !showPreview
          ? "md:w-7/12 w-full md:max-h-60"
          : "w-full"
      }`}
    >
      <div className="flex flex-col items-start  text-start gap-2">
        <div
          className={`line-clamp-2 flex flex-row justify-start gap-2 replace cursor-pointer text-2xl ${
            showPreview ? "text-center" : ""
          } leading-tight font-normal text-neutral-900 dark:text-white `}
        >
          <span className="menu-link text-start hover:underline">
            {page.data.title.length > 35
              ? page.data.title.slice(0, 35) + "..."
              : page.data.title}
          </span>
          {page.data.password !== "" && (
            <div className=" text-neutral-500 dark:text-neutral-400 flex flex-row  gap-1 text-sm justify-start items-center">
              <LockIcon className="w-2 h-2" />
              <span className="text-sm">{locale.COMMON.LOCKED}</span>
            </div>
          )}
        </div>

        {page.data.type && (
          <div className="flex flex-row justify-start items-center gap-4">
            <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 ">
              <FolderClosedIcon className="w-4 h-4" />
              <span className="text-sm">{page.data.type}</span>
            </div>
            <div className="flex flex-row items-center gap-2 text-neutral-500 dark:text-neutral-400">
              <CalendarIcon className="w-4 h-4" />
              <span className="text-sm">
                {getYearMonthDay(
                  page.data.date,
                  locale === "kr-KR" ? "kr-KR" : "en-US"
                )}
                &nbsp; &nbsp;
                {getDistanceFromToday(page.data.date, lang)}
              </span>
            </div>
          </div>
        )}

        {/* Summary */}
        {(!showPreview || showSummary) && !page.data.results && (
          <p className="line-clamp-2 replace  text-neutral-500  dark:text-neutral-200 text-sm font-light leading-7">
            {page.data.summary}
          </p>
        )}
      </div>

      <div className="flex flex-row justify-start items-center gap-4">
        {/* Classification */}
        {page?.data?.sub_type && (
          <div
            className={`flex items-center ${
              showPreview ? "justify-center" : "justify-start"
            } flex-wrap dark:text-neutral-200 text-neutral-400 `}
          >
            <Link
              href={page.url ?? ""}
              passHref
              className="flex flex-row items-center cursor-pointer 
              font-light text-sm  "
            >
              <TagIcon className="mr-1 w-4 h-4" />
              {page.data.sub_type}
            </Link>
          </div>
        )}
        <div className="md:flex-nowrap flex-wrap md:justify-start inline-block">
          <div>
            {page.data.tags && page.data.tags.length > 0 && (
              <TagItemMini
                tags={page.data.tags}
                className="bg-neutral-200 dark:bg-neutral-500 text-neutral-500 dark:text-neutral-200"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationCard;
