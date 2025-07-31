"use client";
import Announcement from "@/modules/blog/Announcement";
import InfoCard from "./InfoCard";

import ArchiveInfo from "@/modules/blog/records/ArchiveInfo";

const RightSlidingDrawer = () => {
  return (
    <div
      className="hidden md:w-[20%] 
 xl:block dark:border-transparent 
h-screen z-10 border-neutral-200 px-6 md:flex md:flex-col"
    >
      {/* <ArchiveInfo props={props} /> */}
      {/* {result && <TableOfContentsDrawerPC page={props?.page} />} */}
      <InfoCard />
      {/* <Announcement /> */}
    </div>
  );
};

export default RightSlidingDrawer;
