"use client";
import NotionPage from "@/components/shared/NotionPage";
import { formatDateFmt } from "@/lib/utils/formatDate";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCalendarAlt,
  faFolder,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import TagItemMini from "../TagItemMini";
import { useRouter } from "next/navigation";

// 사전에 사용할 아이콘 추가
library.add(faFolder, faLock, faCalendarAlt);

/**
 * Portfolio list text content
 * @param {*} param0
 * @returns
 */
export const SideprojectRecordsCardInfo = ({
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
      <div className="w-full">
        <div
          className={`line-clamp-2 replace cursor-pointer text-2xl ${
            showPreview ? "text-center" : ""
          } leading-tight font-normal text-neutral-600  hover:text-red-400`}
        >
          <span className="menu-link ">{post.title}</span>
        </div>
        {/* Classification */}
        {post?.category && (
          <div
            className={`flex mt-2 items-center ${
              showPreview ? "justify-center" : "justify-start"
            } flex-wrap dark:text-neutral-500 text-neutral-400 `}
          >
            <div
              onClick={(e) => {
                onClick(post.category);
              }}
              className="cursor-pointer font-light text-sm menu-link hover:text-red-400 dark:hover:text-red-400 transform"
            >
              <FontAwesomeIcon className="mr-1" icon={faFolder} />

              {post.category}
            </div>
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
          <p className="line-clamp-2 replace my-3 text-neutral-500  dark:text-neutral-500 text-sm font-light leading-7">
            {post.summary}
          </p>
        )}

        {/* search results */}
        {post.results && (
          <p className="line-clamp-2 mt-4 text-neutral-700 dark:text-neutral-300 text-sm font-light leading-7">
            {post.results.map((r, index) => (
              <span key={index}>{r}</span>
            ))}
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
            // href={`/records#${formatDateFmt(post?.publishDate, "yyyy-MM")}`}
            href={`/#${formatDateFmt(post?.publishDate, "yyyy-MM")}`}
            passHref
            className="font-light menu-link cursor-pointer text-sm leading-4 mr-3"
          >
            <FontAwesomeIcon className="mr-1" icon={faCalendarAlt} />

            {post?.publishDay || post.lastEditedDay}
          </Link>

          <div className="md:flex-nowrap flex-wrap md:justify-start inline-block">
            <div>
              {" "}
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
