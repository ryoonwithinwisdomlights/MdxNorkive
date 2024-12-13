"use client"; // 클라이언트 컴포넌트
import { BLOG } from "@/blog.config";
import LazyImage from "@/components/shared/LazyImage";
import { useGlobal } from "@/lib/providers/globalProvider";
import { useGitBookGlobal } from "@/lib/providers/themeGitbookProvider";
import Link from "next/link";
import { AlignJustify, TextQuoteIcon } from "lucide-react";

/**
 * Logo area
 * @param {*} props
 * @returns
 */
export default function LogoBar(props) {
  const { siteInfo } = useGlobal({ from: "index" });
  const { pageNavVisible, changePageNavVisible } = useGitBookGlobal();

  const togglePageNavVisible = () => {
    if (changePageNavVisible) {
      changePageNavVisible();
    }
  };
  return (
    <div id="top-wrapper" className="w-full flex  flex-row items-center   ">
      {/* <div
        onClick={togglePageNavVisible}
        className="cursor-pointer    md:hidden text-xl pr-3 hover:scale-110 duration-150"
      >
        {!pageNavVisible ? (
          <AlignJustify className="mr-2 dark:text-[#f1efe9e2]" />
        ) : (
          <TextQuoteIcon className="mr-2 dark:text-[#f1efe9e2]" />
        )}
      </div> */}
      <Link
        href="/"
        className="flex flex-row   text-md  text-neutral-900 dark:text-neutral-200  p-2 dark:hover:text-white dark:hover:bg-neutral-500 px-2 hover:rounded-lg "
      >
        <LazyImage
          src={siteInfo?.icon}
          width={24}
          height={24}
          alt={BLOG.AUTHOR}
          className="mr-2  "
        />
        {siteInfo?.title}
        <span className="text-xs flex flex-row  items-end mb-1  ">
          &nbsp; ©
        </span>
      </Link>
    </div>
  );
}
