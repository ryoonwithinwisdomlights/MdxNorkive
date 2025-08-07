"use client";
/* eslint-disable multiline-ternary */

import { useRef } from "react";
import NavigationForMobile from "./NavigationForMobile";
import NavigationForPC from "./NavigationForPC";

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
