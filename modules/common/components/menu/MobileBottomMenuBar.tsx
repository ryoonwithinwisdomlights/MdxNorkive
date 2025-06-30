import React from "react";
import MobileLeftNavButton from "./MobileLeftNavButton";
import MobileTOCButton from "./MobileTOCButton";

const MobileBottomMenuBar = () => {
  return (
    <div className="flex items-center justify-end cursor-pointer">
      <MobileLeftNavButton />
      <MobileTOCButton />
    </div>
  );
};

export default MobileBottomMenuBar;
