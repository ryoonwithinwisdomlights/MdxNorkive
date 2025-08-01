"use client";
/* eslint-disable multiline-ternary */

import { useRef, useState } from "react";
import TopNavMobile from "./TopNavMobile";
import TopNavPC from "./TopNavPC";

const TopNavBar = () => {
  const [isOpen, changeShow] = useState(false);
  const collapseRef = useRef<any>(null);

  const toggleMenuOpen = () => {
    changeShow(!isOpen);
  };

  return (
    <div
      id="top-nav"
      className={"fixed top-0 w-full z-40 bg-white dark:bg-neutral-900 "}
    >
      <TopNavPC />
      <TopNavMobile
        collapseRef={collapseRef}
        isOpen={isOpen}
        toggleMenuOpen={toggleMenuOpen}
      />
      {/* <NavbarSidebarTrigger className="md:hidden" /> */}
    </div>
  );
};

export default TopNavBar;
