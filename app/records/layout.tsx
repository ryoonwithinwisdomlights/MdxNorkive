import React from "react";
const Recordlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full dark:bg-[#b99b9b]">
      <main className="h-full pt-[6.4rem]">{children}</main>
    </div>
  );
};

export default Recordlayout;
