"use client";

import { BLOG } from "@/blog.config";
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import { useNav } from "@/lib/context/NavInfoProvider";
import SwitchLanguage from "@/modules/shared/SwitchLanguage";
import ToggleDarkModeButton from "@/modules/shared/ToggleDarkModeButton";
import { Label } from "@/modules/shared/ui/label";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { LefitSidebarItemDrop } from "./LefitSidebarItemDrop";
import MobileLeftSidebar from "./MobileLeftSidebar";

const MobileLeftSidebarWrapper = () => {
  const { menuList } = useNav({ from: "LeftSidebar" });
  const { locale, toggleMobileLeftSidebarOpen } = useGeneralSiteSettings();
  const collapseRef = useRef<any>(null);

  return (
    <MobileLeftSidebar collapseRef={collapseRef}>
      <div
        id="left-sidebar-mobile-content"
        className="p-4  overflow-hidden w-full h-[calc(100vh-150px)] relative flex flex-col gap-2 "
      >
        <div className="flex flex-row justify-end gap-2">
          <Link
            href={BLOG.CONTACT_GITHUB}
            target="_blank"
            rel="noreferrer"
            className="h-8 w-8 rounded-lg bg-neutral-200 hover:bg-neutral-300/70 dark:bg-neutral-700 flex items-center justify-center"
          >
            <GitHubLogoIcon className="w-4 h-4 text-neutral-600 hover:text-neutral-900 dark:hover:text-white dark:text-neutral-200" />
          </Link>
          <div
            onClick={toggleMobileLeftSidebarOpen}
            className="h-8 w-8 rounded-lg bg-neutral-200 hover:bg-neutral-300/70 dark:bg-neutral-700 flex items-center justify-center"
          >
            <MenuIcon className="dark:text-norkive-light" />
          </div>
        </div>

        {menuList?.map((data, index) => (
          <LefitSidebarItemDrop key={index} menuData={data} />
        ))}

        <div className="mt-4 pl-2 flex flex-col gap-2 w-full">
          <div className="flex items-center justify-between">
            <div className="flex flex-col  text-neutral-800 dark:text-neutral-200">
              <Label className="text-xs">{locale.SITE.DISPLAY_LIGHT}</Label>
            </div>
            <ToggleDarkModeButton />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col text-neutral-800 dark:text-neutral-200">
              <Label className="text-xs">{locale.SITE.LOCALE}</Label>
            </div>
            <SwitchLanguage />
          </div>
        </div>
      </div>
    </MobileLeftSidebar>
  );
};

export default MobileLeftSidebarWrapper;
