"use client";
import { BLOG } from "@/blog.config";
import { usePathname, useSearchParams } from "next/navigation";
import ShareButtons from "./ShareButtons";

const ShareBar = ({ data }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const shareUrl = BLOG.LINK + `${pathname}?${searchParams}`;
  // console.log("shareUrl::", shareUrl);
  return (
    <div className="mt-16 overflow-x-auto">
      <div className="flex w-full md:justify-end">
        <ShareButtons
          shareUrl={shareUrl}
          title={data.title}
          image={data.pageCover}
          body={
            data?.title +
            " | " +
            BLOG.TITLE +
            " " +
            shareUrl +
            " " +
            data?.summary
          }
        />
      </div>
    </div>
  );
};
export default ShareBar;
