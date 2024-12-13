"use client";
import NotionPage from "@/components/shared/NotionPage";
import { formatDateFmt } from "@/lib/utils/formatDate";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCalendar,
  faCalendarAlt,
  faFolder,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import TagItemMini from "../TagItemMini";
import { useRouter } from "next/navigation";

// 사전에 사용할 아이콘 추가
library.add(faFolder, faLock, faCalendar, faCalendarAlt);

/**
 * Portfolio list text content
 * @param {*} param0
 * @returns
 */
export const DevprojectRecordsCardInfo = ({
  index,
  post,
  showPreview,
  showPageCover,
  showSummary,
}) => {
  const router = useRouter();
  const onClick = (category: string) => {
    router.push(`/category/${category}`);
  };

  return (
    <div
      className={`flex flex-col justify-between lg:p-6 p-4   ${
        showPageCover && !showPreview
          ? "md:w-7/12 w-full md:max-h-60"
          : "w-full"
      }`}
    >
      <div className="flex flex-col items-start">
        <div
          className={`line-clamp-2 flex flex-row replace cursor-pointer text-2xl ${
            showPreview ? "text-center" : ""
          } leading-tight font-normal text-neutral-600  hover:text-black`}
        >
          <span className="menu-link text-start">
            {post.title}
            {/* {post.title.substr(0, 25) + "..."} */}
          </span>
        </div>
        {/* Classification */}
        {post?.category && (
          <div
            className={`flex items-center ${
              showPreview ? "justify-center" : "justify-start"
            } flex-wrap dark:text-neutral-500 text-neutral-400 `}
          >
            <span className="text-xs">
              &nbsp;&nbsp;&nbsp;{" "}
              {post.password !== "" && (
                <>
                  <FontAwesomeIcon className="mr-1" icon={faLock} />
                  &nbsp;비공개
                </>
              )}
            </span>
          </div>
        )}

        {/* Summary */}
        {(!showPreview || showSummary) && !post.results && (
          <p className="line-clamp-2 replace  text-neutral-500  dark:text-neutral-500 text-sm font-light leading-7">
            {post.summary}
          </p>
        )}

        {/* Preview */}
        {showPreview && (
          <div className="overflow-ellipsis truncate">
            <NotionPage post={post} />
          </div>
        )}
      </div>

      <div>
        {/* date label */}
        <div className="text-neutral-400 justify-between flex">
          {/* date */}
          <Link
            href={`/#${formatDateFmt(post?.publishDate, "yyyy-MM")}`}
            passHref
            className="font-light menu-link cursor-pointer text-sm leading-4 mr-3"
          >
            <FontAwesomeIcon className="mr-1" icon={faCalendar} />

            {post?.publishDay || post.lastEditedDay}
          </Link>

          <div className="md:flex-nowrap flex-wrap md:justify-start inline-block">
            <div>
              {post.tagItems?.map((tag) => (
                <TagItemMini key={tag.name} tag={tag} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
