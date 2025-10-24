"use client";
import { useUIStore } from "@/lib/stores";
import AuthorInfoCard from "@/modules/common/right-sidebar/infocard/AuthorInfoCard";
import NorKiveInfoCard from "@/modules/common/right-sidebar/infocard/NorKiveInfoCard";

const getInfoCard = (mode: "info" | "author") => {
  switch (mode) {
    case "info":
      return <NorKiveInfoCard />;
    case "author":
      return <AuthorInfoCard />;
    default:
      return <NorKiveInfoCard />;
  }
};

const RightSideNavWrapper = () => {
  const { rightSideInfoBarMode } = useUIStore();

  return (
    <div
      className="hidden md:w-[300px] z-10 py-16  md:fixed xl:block m-0  h-full overflow-y-auto
right-0 border-l bg-fd-background dark:bg-transparent border-neutral-200 dark:border-transparent 
"
    >
      {getInfoCard(rightSideInfoBarMode)}
    </div>
  );
};

export default RightSideNavWrapper;
