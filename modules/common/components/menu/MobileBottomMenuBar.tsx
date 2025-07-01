import React from "react";
import MobileLeftNavButton from "./MobileLeftNavButton";
import MobileTOCButton from "./MobileTOCButton";

const MobileBottomMenuBar = () => {
  return (
    <div className="flex  flex-row items-center justify-center  cursor-pointer bg-red-200">
      <MobileLeftNavButton />
      {/* <MobileTOCButton /> */}
    </div>
  );
};

export default MobileBottomMenuBar;
