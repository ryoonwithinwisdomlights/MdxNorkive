"use client";
/* eslint-disable multiline-ternary */

import { useGlobal } from "@/lib/context/EssentialNavInfoProvider";
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEllipsisVertical, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import TopNavMobile from "./TopNavMobile";
import TopNavPC from "./TopNavPC";

library.add(faEllipsisVertical, faTimes);

const TopNavBar = () => {
  const { oldNav, customMenu } = useGlobal({ from: "index" });
  const [isOpen, changeShow] = useState(false);
  const collapseRef = useRef<any>(null);

  const links = customMenu;
  const toggleMenuOpen = () => {
    changeShow(!isOpen);
  };

  return (
    <div id="top-nav" className={"fixed top-0 w-full z-40 "}>
      <TopNavPC links={links} />
      <TopNavMobile
        collapseRef={collapseRef}
        isOpen={isOpen}
        toggleMenuOpen={toggleMenuOpen}
      />
    </div>
  );
};

export default TopNavBar;
