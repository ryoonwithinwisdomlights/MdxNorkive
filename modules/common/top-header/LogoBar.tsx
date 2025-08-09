"use client"; // 클라이언트 컴포넌트
import { BLOG } from "@/blog.config";
import { getSiteInfo } from "@/lib/utils/site";
import LazyImage from "@/modules/shared/LazyImage";
import Link from "next/link";

/**
 * Logo area
 * @param {*} props
 * @returns
 */
export default function LogoBar(props) {
  const siteInfo = getSiteInfo({});
  return (
    <div id="top-wrapper" className="flex  flex-row items-center   ">
      <Link
        href="/"
        className="flex flex-row   text-md 
         text-neutral-900 dark:text-neutral-200 
         hover:bg-neutral-200/50  dark:hover:bg-neutral-700/50
          p-2 dark:hover:text-white px-2 hover:rounded-lg "
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
