"use client";
import InfoCard from "./InfoCard";

const RightSlidingDrawer = () => {
  return (
    <div
      className="hidden md:w-[20%] md:fixed
md:right-0 xl:block dark:border-transparent 
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
