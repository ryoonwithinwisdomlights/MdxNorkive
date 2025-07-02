"use client";
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import NotionPage from "@/modules/common/components/shared/NotionPage";
import { RecordCardInfoProps } from "@/types";
import { CalendarIcon, FolderClosedIcon, LockIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import TagItemMini from "../tag/TagItemMini";
import { useGlobal } from "@/lib/context/EssentialNavInfoProvider";

/**
 *  Records list Card Info
 * @param {*} param0
 * @returns
 */
const RecordCardInfo = ({
  record,
  showPreview,
  showPageCover,
  showSummary,
}: RecordCardInfoProps) => {
  const { locale } = useGeneralSiteSettings();
  const { handleRouter } = useGlobal({});

  return (
    <div
      className={`flex flex-col justify-around lg:p-6 p-4  ${
        showPageCover && !showPreview
          ? "md:w-7/12 w-full md:max-h-60"
          : "w-full"
      }`}
    >
      <div className="flex flex-col items-start text-start">
        <div
          onClick={(e) => {
            handleRouter(record);
          }}
          className={`line-clamp-2 flex flex-row  replace cursor-pointer text-2xl ${
            showPreview ? "text-center" : ""
          } leading-tight font-normal text-neutral-500  hover:text-black `}
        >
          <span className="menu-link text-start ">{record.title}</span>
        </div>
        {/* Classification */}
        {record?.category && (
          <div
            className={`flex mt-2 items-center ${
              showPreview ? "justify-center" : "justify-start"
            } flex-wrap  text-neutral-400 `}
          >
            <Link
              href={`/category/${record.category}`}
              passHref
              className="flex flex-row items-center cursor-pointer font-light text-sm menu-link hover:text-black transform"
            >
              <FolderClosedIcon className="mr-1 w-4 h-4" />
              {record.category}
            </Link>
            <span className="text-xs flex flex-row items-center">
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
          <p className="line-clamp-2  replace my-3 text-neutral-700  dark:text-neutral-300 text-sm font-light leading-7">
            {record.summary}
          </p>
        )}

        {/* search results */}
        {record.results && (
          <p className="line-clamp-2   mt-4 text-neutral-700 dark:text-neutral-300 text-sm font-light leading-7">
            {record.results.map((r, index) => (
              <span key={index}>{r}</span>
            ))}
          </p>
        )}
        {/* Preview */}
        {showPreview && (
          <div className="overflow-ellipsis truncate ">
            <NotionPage record={record} />
          </div>
        )}
      </div>

      <div>
        {/* date label */}
        <div className="flex text-neutral-400  justify-between ">
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
export default RecordCardInfo;
