import React from "react";
import RightSlidingDrawer from "./RightSlidingDrawer";

export default function NoRecordTypeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full flex flex-row justify-between items-start  ">
      <div className=" overflow-y-auto h-screen  md:w-[60%] py-10 px-20  scrollbar-hide overscroll-contain">
        {children}
      </div>

      <RightSlidingDrawer props={null} />
    </div>
  );
}
