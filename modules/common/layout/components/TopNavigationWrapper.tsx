"use client";
/* eslint-disable multiline-ternary */

import { useRef, useState } from "react";
import NavigationForMobile from "./NavigationForMobile";
import NavigationForPC from "./NavigationForPC";

const TopNavigationWrapper = () => {
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
      <NavigationForPC />
      <NavigationForMobile
        collapseRef={collapseRef}
        isOpen={isOpen}
        toggleMenuOpen={toggleMenuOpen}
      />
    </div>
  );
};

export default TopNavigationWrapper;
