"use client";
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import AuthorInfoCard from "./AuthorInfoCard";
import NorKiveInfoCard from "./NorKiveInfoCard";
import { useEffect } from "react";

const RightSideInfoBar = () => {
  const { rightSideInfoBarMode, handleChangeRightSideInfoBarMode } =
    useGeneralSiteSettings();
  useEffect(() => {
    handleChangeRightSideInfoBarMode("info");
  }, []);
  return (
    <div
      className="hidden md:w-[300px] z-10 py-16 h-screen md:fixed xl:block m-0
right-0 border-l bg-fd-background dark:bg-transparent border-neutral-200 dark:border-transparent 
"
    >
      <div className="  overflow-hidden w-full h-[calc(100vh-150px)] relative  flex flex-col gap-2 ">
        {rightSideInfoBarMode === "info" ? (
          <NorKiveInfoCard />
        ) : (
          <AuthorInfoCard />
        )}
      </div>
    </div>
  );
};

export default RightSideInfoBar;
