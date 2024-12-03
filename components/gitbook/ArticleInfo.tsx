"use client";
import { useGlobal } from "@/lib/providers/globalProvider";

export default function ArticleInfo() {
  const { post, notice } = useGlobal({ from: "index" });
  if (!post) {
    return null;
  }
  const modPost = post ? post : notice;
  // post={props?.post ? props?.post : props.notice}
  return (
    <div className="pt-10 pb-6 text-neutral-400 text-sm border-b">
      <i className="fa-regular fa-clock mr-1" />
      Last update: {modPost.date?.start_date}
    </div>
  );
}
