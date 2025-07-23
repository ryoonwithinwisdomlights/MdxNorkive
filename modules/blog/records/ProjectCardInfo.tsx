"use client";
import { useGlobal } from "@/lib/context/EssentialNavInfoProvider";
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import { CardInfoDivProps } from "@/types";
import { CalendarIcon, LockIcon } from "lucide-react";
import TagItemMini from "../tag/TagItemMini";

/**
 * Portfolio list text content
 * @param {*} param0
 * @returns
 */
const ProjectCardInfo = ({
  record,
  showPreview,
  showPageCover,
  showSummary,
}: CardInfoDivProps) => {
  const { locale } = useGeneralSiteSettings();
  const { handleRouter } = useGlobal({});

  return (
    <div
      className={`flex flex-col justify-between lg:p-6 p-4   ${
        showPageCover && !showPreview
          ? "md:w-7/12 w-full md:max-h-60"
          : "w-full"
      }`}
    >
      <div className="flex flex-col items-start  text-start">
        <div
          onClick={(e) => {
            handleRouter(record);
          }}
          className={`line-clamp-2 flex flex-row replace cursor-pointer text-2xl ${
            showPreview ? "text-center" : ""
          } leading-tight font-normal text-neutral-600  hover:text-black`}
        >
          <span className="menu-link text-start">
            {record.title}
            {/* {record.title.substr(0, 25) + "..."} */}
          </span>
        </div>
        {/* Classification */}
        {record?.category && (
          <div
            className={`flex items-center ${
              showPreview ? "justify-center" : "justify-start"
            } flex-wrap dark:text-neutral-500 text-neutral-400 `}
          >
            <span className="text-xs flex flex-row">
              &nbsp;&nbsp;&nbsp;{" "}
              {record.password !== "" && (
                <>
                  <LockIcon className="mr-1 w-4 h-4" />
                  &nbsp;{locale.COMMON.LOCKED}
                </>
              )}
            </span>
          </div>
        )}

        {/* Summary */}
        {(!showPreview || showSummary) && !record.results && (
          <p className="line-clamp-2 replace  text-neutral-500  dark:text-neutral-500 text-sm font-light leading-7">
            {record.summary}
          </p>
        )}

        {/* Preview */}
        {showPreview && (
          <div className="overflow-ellipsis truncate">
            {/* <NotionPage record={record} /> */}
          </div>
        )}
      </div>

      <div>
        {/* date label */}
        <div className="text-neutral-400 justify-between flex">
          <div className="flex flex-row items-center">
            <CalendarIcon className="mr-1 w-4 h-4" />
            {record?.publishDay || record.lastEditedDay}
          </div>
          <div className="md:flex-nowrap flex-wrap md:justify-start inline-block">
            <div>
              {record.tagItems?.map((tag) => (
                <TagItemMini key={tag.name} tag={tag} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCardInfo;
