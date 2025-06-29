"use client";
import { BLOG } from "@/blog.config";
import { usePathname, useSearchParams } from "next/navigation";
import ShareButtons from "./ShareButtons";

const ShareBar = ({ record }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (
    !JSON.parse(BLOG.archive_share_bar_enable) ||
    !record ||
    record?.type === "CONFIG" ||
    record?.type === "Menu" ||
    record?.type === "SubMenu" ||
    record?.type === "Notice" ||
    record?.type === "Page" ||
    record?.status !== "Published"
  ) {
    return <></>;
  }

  const shareUrl = BLOG.LINK + `${pathname}?${searchParams}`;

  return (
    <div className="m-1 overflow-x-auto">
      <div className="flex w-full md:justify-end">
        <ShareButtons
          shareUrl={shareUrl}
          title={record.title}
          image={record.pageCover}
          body={
            record?.title +
            " | " +
            BLOG.TITLE +
            " " +
            shareUrl +
            " " +
            record?.summary
          }
        />
      </div>
    </div>
  );
};
export default ShareBar;
