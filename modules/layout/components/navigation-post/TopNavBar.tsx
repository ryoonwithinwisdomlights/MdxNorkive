"use client";
/* eslint-disable multiline-ternary */

import { useGlobal } from "@/lib/context/EssentialNavInfoProvider";
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEllipsisVertical, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import MobileTopNav from "./MobileTopNav";
import PCTopNav from "./PCTopNav";

library.add(faEllipsisVertical, faTimes);

const TopNavBar = () => {
  const { oldNav, customMenu } = useGlobal({ from: "index" });
  const { locale } = useGeneralSiteSettings();
  const [isOpen, changeShow] = useState(false);
  const collapseRef = useRef<any>(null);

  // const defaultLinks: OldNavItem[] = [
  //   {
  //     icon: "fa-solid fa-wand-magic-sparkles",
  //     name: locale.COMMON.CATEGORY,
  //     to: "/category",
  //     show: MENU_MOBILE.MENU_CATEGORY,
  //   },
  //   {
  //     icon: "fas fa-tag",
  //     name: locale.COMMON.TAGS,
  //     to: "/tag",
  //     show: MENU_MOBILE.MENU_TAG,
  //   },
  //   {
  //     icon: "fa-solid fa-folder-closed",
  //     name: locale.NAV.RECORD,
  //     to: "/records",
  //     show: MENU_MOBILE.MENU_RECORDS,
  //   },
  //   {
  //     icon: "fa-solid fa-hand-sparkles",
  //     name: locale.NAV.PROJECT,
  //     to: "/project",
  //     show: MENU_MOBILE.MENU_PROJECT,
  //   },
  //   {
  //     icon: "fa-solid fa-hand-sparkles",
  //     name: locale.NAV.ENGINEERING,
  //     to: "/engineering",
  //     show: MENU_MOBILE.MENU_ENGINEERING,
  //   },
  // ];

  const links = customMenu;
  const toggleMenuOpen = () => {
    changeShow(!isOpen);
  };

  return (
    <div id="top-nav" className={"fixed top-0 w-full z-40 "}>
      <PCTopNav links={links} />
      <MobileTopNav
        collapseRef={collapseRef}
        isOpen={isOpen}
        toggleMenuOpen={toggleMenuOpen}
      />
    </div>
  );
};

export default TopNavBar;
