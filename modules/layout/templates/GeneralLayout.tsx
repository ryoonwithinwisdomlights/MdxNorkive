import React from "react";

export default function GeneralPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full flex flex-row justify-between items-start  pl-10 ">
      {children}
      {/* <RightSlidingDrawer result={result} /> */}
    </div>
  );
}
