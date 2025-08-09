"use client";
/* eslint-disable multiline-ternary */

import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import { MenuIcon } from "lucide-react";

const SettingToggle = () => {
  const {
    isMobileTopNavOpen,
    isMobileLeftSidebarOpen,
    toggleMobileLeftSidebarOpen,
  } = useGeneralSiteSettings();

  return (
    <div
      onClick={toggleMobileLeftSidebarOpen}
      className="cursor-pointer 
    rounded-lg  bg-fd-secondary/50 p-1.5  text-sm
     text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
    >
      {!isMobileLeftSidebarOpen && (
        <MenuIcon className="w-4 h-4 dark:text-white text-neutral-800" />
      )}
    </div>
  );
};

export default SettingToggle;
