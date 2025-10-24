"use client";
import { useRef, lazy } from "react";
import Link from "next/link";

import { BLOG } from "@/blog.config";
import { useThemeStore, useUIStore } from "@/lib/stores";
import { useNav } from "@/lib/context/NavInfoProvider";

import MobileRightSidebar from "./MobileRightSidebar";
import { RightSidebarItemDrop } from "./RightSidebarItemDrop";

import { Label } from "@/modules/shared/ui/label";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { AlignRightIcon } from "lucide-react";
import { CollapseRefType } from "@/types/components/collapse";

const ToggleDarkModeButton = lazy(
  () => import("@/modules/layout/components/dark-mode-toggle")
);
const SwitchLanguage = lazy(
  () => import("@/modules/layout/components/switch-language-dropdown")
);

const MobileRightSidebarWrapper = () => {
  const { menuList } = useNav({ from: "LeftSidebar" });
  const { locale } = useThemeStore();
  const { toggleMobileLeftSidebar } = useUIStore();
  const collapseRef = useRef<CollapseRefType>(null);

  return (
    <MobileRightSidebar collapseRef={collapseRef}>
      <div
        id="left-sidebar-mobile-content"
        className="p-4  overflow-hidden w-full h-100vh relative flex flex-col gap-2 "
      >
        <div className="flex flex-row justify-end gap-2">
          <Link
            href={BLOG.CONTACT_GITHUB}
            target="_blank"
            rel="noreferrer"
            className="h-8 w-8 rounded-lg 
             bg-neutral-200/50 hover:bg-neutral-200 dark:bg-neutral-800 
            dark:hover:bg-neutral-700 
            flex items-center justify-center"
          >
            <GitHubLogoIcon className="w-4 h-4 text-neutral-600 hover:text-neutral-900 dark:hover:text-white dark:text-neutral-100" />
          </Link>
          <div
            onClick={toggleMobileLeftSidebar}
            className="h-8 w-8 rounded-lg  bg-neutral-200/50  hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700  flex items-center justify-center"
          >
            <AlignRightIcon className="w-4 h-4 text-neutral-600 hover:text-neutral-900 dark:hover:text-white dark:text-neutral-100" />
          </div>
        </div>

        {menuList?.map((data, index) => (
          <RightSidebarItemDrop key={index} menuData={data} />
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
    </MobileRightSidebar>
  );
};

export default MobileRightSidebarWrapper;
