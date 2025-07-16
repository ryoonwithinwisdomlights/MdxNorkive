import { getWordCount } from "@/lib/notion/api/original/getPosts";
import { calculateReadingTime } from "@/lib/utils/utils";
import React from "react";
const TransferedMd = ({ result }) => {
  console.log("result:::::::", result);
  const wordCount = result?.content ? getWordCount(result?.content) : 0;
  return (
    <div
      id="main-scroll-container"
      className="dark:bg-black dark:text-neutral-100 text-neutral-800 md:px-20 
    md:w-[60%] flex flex-col overflow-y-auto h-full  scrollbar-hide overscroll-contain "
    >
      <div className="mb-8">
        <div className="flex items-center gap-4 text-muted-foreground mb-4">
          <time>{result?.publishDay}</time>
          {result?.author && <span>By {result?.author}</span>}
          <span>{calculateReadingTime(wordCount)}</span>
          <span>{wordCount} words</span>
        </div>

        <h1 className="text-4xl font-bold mb-4 text-foreground">
          {result?.title}
        </h1>
      </div>

      <div className="max-w-none"></div>
    </div>
  );
};

export default TransferedMd;
