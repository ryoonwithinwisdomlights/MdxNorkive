"use client";
/* eslint-disable multiline-ternary */

import { useUIStore } from "@/lib/stores";
import { MenuIcon } from "lucide-react";

const SettingToggle = () => {
  const { isMobileLeftSidebarOpen, toggleMobileLeftSidebar } = useUIStore();

  return (
    <div
      onClick={toggleMobileLeftSidebar}
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
