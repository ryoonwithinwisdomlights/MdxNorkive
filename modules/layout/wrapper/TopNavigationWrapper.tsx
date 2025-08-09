"use client";
/* eslint-disable multiline-ternary */

import { useRef } from "react";
import NavigationForMobile from "../../common/top-header/NavigationForMobile";
import NavigationForPC from "../../common/top-header/NavigationForPC";

const TopNavigationWrapper = () => {
  const collapseRef = useRef<any>(null);

  return (
    <div
      id="top-nav"
      className={"fixed top-0 w-full z-40 bg-white dark:bg-neutral-900 "}
    >
      <NavigationForPC />
      <NavigationForMobile collapseRef={collapseRef} />
    </div>
  );
};

export default TopNavigationWrapper;
