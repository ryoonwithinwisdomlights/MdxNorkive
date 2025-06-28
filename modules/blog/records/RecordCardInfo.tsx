"use client";
import NotionPage from "@/modules/shared/NotionPage";
import { CalendarIcon, FolderClosedIcon, LockIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import TagItemMini from "../tag/TagItemMini";
import { useGlobal } from "@/context/globalProvider";
import { RecordCardInfoProps } from "@/types";
import { useNorkiveTheme } from "@/context/NorkiveThemeProvider";

/**
 *  Records list Card Info
 * @param {*} param0
 * @returns
 */
const RecordCardInfo = ({
  post,
  showPreview,
  showPageCover,
  showSummary,
}: RecordCardInfoProps) => {
  const router = useRouter();
  const patname = usePathname();
  const { locale } = useNorkiveTheme();
  const onClick = (recId: string) => {
    router.push(`${patname}/${recId}`);
  };

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
            onClick(post.id);
          }}
          className={`line-clamp-2 flex flex-row  replace cursor-pointer text-2xl ${
            showPreview ? "text-center" : ""
          } leading-tight font-normal text-neutral-500  hover:text-black `}
        >
          <span className="menu-link text-start ">{post.title}</span>
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
              className="flex flex-row items-center cursor-pointer font-light text-sm menu-link hover:text-black transform"
            >
              <FolderClosedIcon className="mr-1 w-4 h-4" />
              {post.category}
            </Link>
            <span className="text-xs flex flex-row items-center">
              &nbsp;&nbsp;&nbsp;{" "}
              {post.password !== "" && (
                <>
                  <LockIcon className="mr-1 w-4 h-4" />
                  &nbsp;{locale.COMMON.LOCKED}
                </>
              )}
            </span>
          </div>
        )}
        {/* Summary */}
        {(!showPreview || showSummary) && !post.results && (
          <p className="line-clamp-2  replace my-3 text-neutral-700  dark:text-neutral-300 text-sm font-light leading-7">
            {post.summary}
          </p>
        )}

        {/* search results */}
        {post.results && (
          <p className="line-clamp-2   mt-4 text-neutral-700 dark:text-neutral-300 text-sm font-light leading-7">
            {post.results.map((r, index) => (
              <span key={index}>{r}</span>
            ))}
          </p>
        )}
        {/* Preview */}
        {showPreview && (
          <div className="overflow-ellipsis truncate ">
            <NotionPage post={post} />
          </div>
        )}
      </div>

      <div>
        {/* date label */}
        <div className="flex text-neutral-400  justify-between ">
          <div className="flex flex-row items-center">
            <CalendarIcon className="mr-1 w-4 h-4" />
            {post?.publishDay || post.lastEditedDay}
          </div>
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
export default RecordCardInfo;
