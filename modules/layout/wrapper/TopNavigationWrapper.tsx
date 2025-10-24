"use client";

import NavigationForMobile from "../../common/top-header/NavigationForMobile";
import NavigationForPC from "../../common/top-header/NavigationForPC";

const TopNavigationWrapper = () => {
  return (
    <div
      id="top-nav"
      className={"fixed top-0 w-full z-40 bg-white dark:bg-neutral-900 "}
    >
      <NavigationForPC />
      <NavigationForMobile />
    </div>
  );
};

export default TopNavigationWrapper;
