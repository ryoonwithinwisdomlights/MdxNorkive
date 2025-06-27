"use client";
/* eslint-disable multiline-ternary */

import { BLOG } from "@/blog.config";
import { MENU_MOBILE } from "@/lib/constants/menu-mobile.constansts";
import Collapse from "@/modules/shared/Collapse";
import DarkModeButton from "@/modules/shared/DarkModeButton";
import { useGlobal } from "@/context/globalProvider";
import { CustomNavList } from "@/types";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEllipsisVertical, faTimes } from "@fortawesome/free-solid-svg-icons";
import { AlignRightIcon, MenuIcon } from "lucide-react";
import { useRef, useState } from "react";
import LogoBar from "@/modules/common/ui/LogoBar";
import { MenuBarMobile } from "@/modules/common/components/menu/MenuBarMobile";
import { MenuItemDrop } from "@/modules/common/components/menu/MenuItemDrop";
// 사전에 사용할 아이콘 추가
library.add(faEllipsisVertical, faTimes);

const TopNavBar = () => {
  const { oldNav, customMenu, locale } = useGlobal({ from: "index" });
  const [isOpen, changeShow] = useState(false);
  const collapseRef = useRef<any>(null);

  const defaultLinks: CustomNavList[] = [
    {
      icon: "fa-solid fa-wand-magic-sparkles",
      name: locale.COMMON.CATEGORY,
      to: "/category",
      show: MENU_MOBILE.MENU_CATEGORY,
    },
    {
      icon: "fas fa-tag",
      name: locale.COMMON.TAGS,
      to: "/tag",
      show: MENU_MOBILE.MENU_TAG,
    },
    {
      icon: "fa-solid fa-folder-closed",
      name: locale.NAV.RECORD,
      to: "/records",
      show: MENU_MOBILE.MENU_RECORDS,
    },
    {
      icon: "fa-solid fa-hand-sparkles",
      name: locale.NAV.DEVPROJECT,
      to: "/devproject",
      show: MENU_MOBILE.MENU_DEVPROJECT,
    },
    {
      icon: "fa-solid fa-hand-sparkles",
      name: locale.NAV.ENGINEERING,
      to: "/eengineering",
      show: MENU_MOBILE.MENU_ENGINEERING,
    },
  ];

  let links: any[] = BLOG.CUSTOM_MENU ? customMenu : defaultLinks;
  const toggleMenuOpen = () => {
    changeShow(!isOpen);
  };

  return (
    <div id="top-nav" className={"fixed top-0 w-full z-40 "}>
      {/* Mobile collapsible menu */}
      <Collapse
        type="vertical"
        collapseRef={collapseRef}
        isOpen={isOpen}
        className="md:hidden"
      >
        <div className="bg-white dark:bg-neutral-700 pt-1 py-2 lg:hidden ">
          <MenuBarMobile
            onHeightChange={(param) => {
              if (collapseRef.current) {
                collapseRef.current?.updateCollapseHeight(param);
              }
            }}
          />
        </div>
      </Collapse>

      {/* Navigation bar menu */}
      <div className="flex w-full h-14 shadow glassmorphism bg-white dark:bg-neutral-700 px-7 items-between">
        {/* Icon Logo on the left */}
        <LogoBar />

        {/* Collapse button, mobile only display */}
        <div className="mr-1 flex md:hidden justify-end items-center space-x-4 font-serif dark:text-neutral-200">
          <DarkModeButton className="flex text-md items-center h-full" />
          <div
            onClick={toggleMenuOpen}
            className="cursor-pointer text-lg hover:scale-110 duration-150"
          >
            {isOpen ? (
              <AlignRightIcon className="dark:text-[#f1efe9e2]" />
            ) : (
              <MenuIcon className="dark:text-[#f1efe9e2]" />
            )}
          </div>
        </div>

        {/* Desktop top menu */}
        <div className="hidden md:flex md:flex-row justify-center  py-2">
          {links &&
            links?.map((link, index) => (
              <MenuItemDrop key={index} link={link} />
            ))}
          <DarkModeButton className="flex flex-col justify-center items-center " />
        </div>
      </div>
    </div>
  );
};

export default TopNavBar;
