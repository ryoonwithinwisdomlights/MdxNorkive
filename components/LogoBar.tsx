"use client"; // 클라이언트 컴포넌트
import { BLOG } from "@/blog.config";
import LazyImage from "@/components/shared/LazyImage";
import { useGlobal } from "@/lib/providers/globalProvider";
import { useGitBookGlobal } from "@/lib/providers/themeGitbookProvider";
import Link from "next/link";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignJustify, faIndent } from "@fortawesome/free-solid-svg-icons";

// 사전에 사용할 아이콘 추가
library.add(faAlignJustify, faIndent);

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
      <div
        onClick={togglePageNavVisible}
        className="cursor-pointer    md:hidden text-xl pr-3 hover:scale-110 duration-150"
      >
        <FontAwesomeIcon
          className="mr-2 text-[#f1efe9e2]"
          icon={pageNavVisible ? faAlignJustify : faIndent}
        />
      </div>
      <Link
        href="/"
        className="flex flex-row   text-md  text-neutral-900 dark:text-neutral-200  dark:hover:text-neutral-900  hover:bg-[#f1efe9e2] px-2 hover:rounded-lg "
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
