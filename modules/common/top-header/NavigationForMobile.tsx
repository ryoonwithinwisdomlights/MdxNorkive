"use client";
/* eslint-disable multiline-ternary */
import LogoBar from "@/modules/common/top-header/LogoBar";

import { SearchToggle } from "@/modules/layout/components/search-toggle";
import SettingToggle from "@/modules/layout/components/setting-toggle";

const NavigationForMobile = () => {
  return (
    <div className="bg-neutral-50 dark:bg-neutral-800">
      <div className="md:hidden flex flex-row justify-between w-full h-14 shadow  px-7 items-between  bg-neutral-50 dark:bg-neutral-800">
        <LogoBar />
        <div className="mr-1 flex justify-end items-center space-x-4 font-serif dark:text-neutral-200">
          <SearchToggle className="cursor-pointer rounded-lg bg-fd-secondary/50 p-1.5 text-sm transition-colors hover:bg-fd-accent text-neutral-800 dark:text-neutral-200" />
          <SettingToggle />
        </div>
      </div>
    </div>
  );
};

export default NavigationForMobile;
