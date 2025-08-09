"use client";
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import AuthorInfoCard from "@/modules/common/right-sidebar/infocard/AuthorInfoCard";
import NorKiveInfoCard from "@/modules/common/right-sidebar/infocard/NorKiveInfoCard";
import { useEffect } from "react";

const RightSideNavWrapper = () => {
  const { rightSideInfoBarMode, handleChangeRightSideInfoBarMode } =
    useGeneralSiteSettings();
  useEffect(() => {
    handleChangeRightSideInfoBarMode("info");
  }, []);
  return (
    <div
      className="hidden md:w-[300px] z-10 py-16  md:fixed xl:block m-0  h-full overflow-y-auto
right-0 border-l bg-fd-background dark:bg-transparent border-neutral-200 dark:border-transparent 
"
    >
      <div className="  w-full  relative  flex flex-col gap-2 ">
        {rightSideInfoBarMode === "info" ? (
          <NorKiveInfoCard />
        ) : (
          <AuthorInfoCard />
        )}
      </div>
    </div>
  );
};

export default RightSideNavWrapper;
