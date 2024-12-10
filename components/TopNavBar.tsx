"use client";
/* eslint-disable multiline-ternary */

import { BLOG } from "@/blog.config";
import CONFIG from "@/components/config";
import Collapse from "@/components/shared/Collapse";
import DarkModeButton from "@/components/shared/DarkModeButton";
import { useGlobal } from "@/lib/providers/globalProvider";
import { CustomNavList } from "@/lib/providers/provider";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEllipsisVertical, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import LogoBar from "./LogoBar";
import { MenuBarMobile } from "./MenuBarMobile";
import { MenuItemDrop } from "./MenuItemDrop";

// 사전에 사용할 아이콘 추가
library.add(faEllipsisVertical, faTimes);

const TopNavBar = () => {
  const { customNav, customMenu, locale } = useGlobal({ from: "index" });
  const [isOpen, changeShow] = useState(false);
  const collapseRef = useRef<any>(null);

  const defaultLinks: CustomNavList[] = [
    {
      icon: "fa-solid fa-wand-magic-sparkles",
      name: locale.COMMON.CATEGORY,
      to: "/category",
      show: CONFIG.MENU_CATEGORY,
    },
    {
      icon: "fas fa-tag",
      name: locale.COMMON.TAGS,
      to: "/tag",
      show: CONFIG.MENU_TAG,
    },
    {
      icon: "fa-solid fa-folder-closed",
      name: locale.NAV.RECORD,
      to: "/records",
      show: CONFIG.MENU_RECORDS,
    },
    {
      icon: "fa-solid fa-hand-sparkles",
      name: locale.NAV.SIDEPROJECT,
      to: "/devproject",
      show: CONFIG.MENU_SIDEPROJECT,
    },
    // {
    //   icon: 'fas fa-search',
    //   name: locale.NAV.SEARCH,
    //   to: '/search',
    //   show: CONFIG.MENU_SEARCH
    // },
  ];

  // let links: any[] = defaultLinks.concat(customNav);
  let links: any[] = BLOG.CUSTOM_MENU ? customMenu : defaultLinks;
  const toggleMenuOpen = () => {
    changeShow(!isOpen);
  };

  // if (BLOG.CUSTOM_MENU) {
  //   links = customMenu;
  // }

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
              <FontAwesomeIcon icon={faTimes} className="text-[#f1efe9e2]" />
            ) : (
              <FontAwesomeIcon
                icon={faEllipsisVertical}
                className="text-[#f1efe9e2]"
              />
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
