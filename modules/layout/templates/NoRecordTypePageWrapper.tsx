import React from "react";
import RightSlidingDrawer from "../components/RightSlidingDrawer";

export default function NoRecordTypePageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full flex flex-row justify-between items-start md:pt-14 pt-10 pb-20 ">
      <div className=" overflow-y-auto h-screen  md:w-[60%] px-20 scrollbar-hide overscroll-contain">
        {children}
      </div>

      <RightSlidingDrawer props={null} />
    </div>
  );
}
