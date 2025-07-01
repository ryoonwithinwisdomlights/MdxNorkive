import React from "react";
import MobileLeftNavButton from "./MobileLeftNavButton";
import MobileTOCButton from "./MobileTOCButton";

const MobileBottomMenuBar = () => {
  //md:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-neutral-200 dark:bg-neutral-700 dark:border-neutral-600
  return (
    <div className="grid w-full max-w-lg mx-auto font-medium grid-cols-2  dark:bg-neutral-700">
      <MobileLeftNavButton />
      <MobileTOCButton />
    </div>
  );
};

export default MobileBottomMenuBar;
