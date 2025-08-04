"use client";
import { BLOG } from "@/blog.config";
import { usePathname, useSearchParams } from "next/navigation";
import ShareButtons from "./ShareButtons";

const ShareBar = ({ data }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // if (
  //   !JSON.parse(BLOG.RECORD_SHARE_BAR_ENABLE) ||
  //   !record ||
  //   record?.type === "CONFIG" ||
  //   record?.type === "Menu" ||
  //   record?.type === "SubMenu" ||
  //   record?.type === "Notice" ||
  //   record?.type === "Page" ||
  //   record?.status !== "Published"
  // ) {
  //   return <></>;
  // }

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
