import React from "react";

export default function GeneralRecordTypePageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="w-full h-screen flex flex-row justify-between
     items-start dark:bg-black dark:text-neutral-200  md:pt-14 pt-10 pb-40 "
    >
      {children}
    </div>
  );
}
