"use client";
import { BLOG } from "@/blog.config";
import { usePathname, useSearchParams } from "next/navigation";
import ShareButtons from "./ShareButtons";

const ShareBar = ({ post }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (
    !JSON.parse(BLOG.POST_SHARE_BAR_ENABLE) ||
    !post ||
    post?.type === "CONFIG" ||
    post?.type === "Menu" ||
    post?.type === "SubMenu" ||
    post?.type === "Notice" ||
    post?.type === "Page" ||
    post?.status !== "Published"
  ) {
    return <></>;
  }

  const shareUrl = BLOG.LINK + `${pathname}?${searchParams}`;

  return (
    <div className="m-1 overflow-x-auto">
      <div className="flex w-full md:justify-end">
        <ShareButtons
          shareUrl={shareUrl}
          title={post.title}
          image={post.pageCover}
          body={
            post?.title +
            " | " +
            BLOG.TITLE +
            " " +
            shareUrl +
            " " +
            post?.summary
          }
        />
      </div>
    </div>
  );
};
export default ShareBar;
