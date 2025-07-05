"use client";
import Announcement from "@/modules/blog/Announcement";
import InfoCard from "./InfoCard";

import ArchiveInfo from "@/modules/blog/records/ArchiveInfo";
import TableOfContents from "@/modules/blog/records/TableOfContents";
import TableOfContentsDrawerPC from "@/modules/blog/records/TableOfContentsDrawerPC";

const RightSlidingDrawer = ({ props }) => {
  let result = props;
  if (!props) {
    result = null;
  }

  return (
    <div
      className="hidden md:w-[20%] md:fixed
md:right-0 xl:block dark:border-transparent 
h-screen z-10  border-neutral-200 px-6 md:flex md:flex-col"
    >
      <ArchiveInfo props={result} />
      <TableOfContentsDrawerPC page={result.page} />
      <InfoCard />
      <Announcement />
    </div>
  );
};

export default RightSlidingDrawer;
