import React from "react";
import RightSideNavWrapper from "../wrapper/RightSideNavWrapper";

export default function GeneralDocTypePageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="xl:w-[calc(100vw-300px)] w-full h-vh flex flex-row  justify-end items-start ">
      {children}
      <RightSideNavWrapper />
    </div>
  );
}
