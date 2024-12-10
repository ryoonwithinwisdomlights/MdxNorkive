"use client";
import NotionPage from "@/components/shared/NotionPage";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCalendarAlt,
  faFolder,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TagItemMini from "../TagItemMini";

// 사전에 사용할 아이콘 추가
library.add(faFolder, faLock, faCalendarAlt);
/**
 *  EngineeringRecords list text content
 * @param {*} param0
 * @returns
 */
export const EngineeringRecordsCardInfo = ({
  post,
  showPreview,
  showPageCover,
  showSummary,
}) => {
  const router = useRouter();
  const onClick = (engId: string) => {
    router.push(`/engineering/${engId}`);
  };
  return (
    <div
      className={`flex flex-col justify-between lg:p-6 p-4  ${
        showPageCover && !showPreview ? "md:w-7/12 w-full " : "w-full"
      }`}
    >
      <div>
        <div
          onClick={(e) => {
            onClick(post.id);
          }}
          className={`line-clamp-2 replace cursor-pointer text-2xl ${
            showPreview ? "text-center" : ""
          } leading-tight  text-neutral-500  hover:text-black `}
        >
          <span className="menu-link ">
            {/* {post.title.substr(0, 500) + "..."} */}
            {post.title}
          </span>
        </div>
        {/* Classification */}
        {post?.category && (
          <div
            className={`flex mt-2 items-center ${
              showPreview ? "justify-center" : "justify-start"
            } flex-wrap  text-neutral-400 `}
          >
            <Link
              href={`/category/${post.category}`}
              passHref
              className="cursor-pointer font-light text-sm menu-link hover:text-black transform"
            >
              <FontAwesomeIcon className="mr-1" icon={faFolder} />

              {post.category}
            </Link>
            <span className="text-xs">
              &nbsp;&nbsp;&nbsp;{" "}
              {post.password !== "" && (
                <>
                  {" "}
                  <FontAwesomeIcon className="mr-1" icon={faLock} />
                  &nbsp;비공개
                </>
              )}
            </span>
          </div>
        )}
        {/* Summary */}
        {(!showPreview || showSummary) && !post.results && (
          <p className="line-clamp-2 replace my-3 text-neutral-700  dark:text-neutral-300 text-sm font-light leading-7">
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
          <FontAwesomeIcon className="mr-1" icon={faCalendarAlt} />
          {post?.publishDay || post.lastEditedDay}
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
