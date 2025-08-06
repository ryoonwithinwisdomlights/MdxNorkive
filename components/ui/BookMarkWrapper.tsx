import { LinkIcon } from "lucide-react";
import * as React from "react";

interface BookMarkWrapperProps {
  names: string;
  urls: string;
}

const assetStyle: React.CSSProperties = {};

export default function BookMarkWrapper(props: BookMarkWrapperProps) {
  const { names, urls } = props;

  if (!urls) return null;

  // 일반 링크인 경우 링크로 표시
  return (
    <div
      className="my-4 text-sm 
        w-full 
          rounded-md text-neutral-600 
          dark:text-neutral-200
          bg-neutral-100
      flex flex-row gap-2 items-center
            dark:bg-neutral-800  dark:border-neutral-700
            border-[1px]
            border-[#e5e5e5]
            hover:dark:text-white
            p-[10px] break-all"
      data-tooltip={"Bookmark Open in new tab"}
    >
      <LinkIcon className="w-4 h-4 mr-2" />
      <a
        href={urls}
        target="_blank"
        rel="noopener noreferrer"
        className=" "
        {...props}
      >
        <span className="">{names} -</span>
        <span className=""> {urls}</span>
      </a>
    </div>
  );
}
