"use client";
import Announcement from "@/modules/announcement/Announcement";
import InfoCard from "../components/InfoCard";

import ArticleInfo from "@/modules/common/components/article/ArticleInfo";
import TableOfContents from "@/modules/common/components/TableOfContents";

const RightSlidingDrawer = ({ props }) => {
  let result = props;
  if (!props) {
    result = null;
  }
  //  relative  overflow-y-auto h-screen  scrollbar-hide overscroll-contain
  return (
    <div
      className="hidden md:w-[20%] md:fixed
md:right-0 xl:block dark:border-transparent 
h-screen z-10 border-l  border-neutral-200 px-6 md:flex md:flex-col"
    >
      <div className="">
        <ArticleInfo props={result} />

        <TableOfContents props={props} />

        <InfoCard />
        <Announcement />
      </div>
    </div>
  );
};

export default RightSlidingDrawer;
