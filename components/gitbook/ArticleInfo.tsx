"use client";
import { useGlobal } from "@/lib/providers/globalProvider";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// 사전에 사용할 아이콘 추가
library.add(faClock);

export default function ArticleInfo() {
  const { post, notice } = useGlobal({ from: "index" });
  if (!post) {
    return null;
  }
  const modPost = post ? post : notice;
  // post={props?.post ? props?.post : props.notice}
  return (
    <div className="pt-10 pb-6 text-neutral-400 text-sm border-b">
      <FontAwesomeIcon className="mr-1" icon={faClock} />
      Last update: {modPost.date?.start_date}
    </div>
  );
}
