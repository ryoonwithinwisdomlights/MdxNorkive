import React from "react";
import RightSlidingDrawer from "./RightSlidingDrawer";

export default function NoRecordTypeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full flex flex-row justify-between items-start  pl-10 ">
      {children}
      <RightSlidingDrawer props={null} />
    </div>
  );
}
