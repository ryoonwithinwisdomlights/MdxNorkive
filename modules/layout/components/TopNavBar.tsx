"use client";
/* eslint-disable multiline-ternary */

import { useGlobal } from "@/lib/context/EssentialNavInfoProvider";
import { useRef, useState } from "react";
import TopNavMobile from "./TopNavMobile";
import TopNavPC from "./TopNavPC";

const TopNavBar = () => {
  const { oldNav, customMenu } = useGlobal({ from: "TopNavBar" });
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
