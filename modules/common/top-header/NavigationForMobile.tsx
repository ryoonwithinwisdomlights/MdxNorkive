"use client";
/* eslint-disable multiline-ternary */
import { MobileMenuBar } from "@/modules/common/top-header/MobileMenuBar";
import Collapse from "@/modules/shared/Collapse";
import LogoBar from "@/modules/common/top-header/LogoBar";

import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import { SearchToggle } from "../../layout/components/search-toggle";
import SettingToggle from "../../layout/components/setting-toggle";

interface NavigationForMobileProps {
  collapseRef: React.RefObject<{
    updateCollapseHeight: (params: {
      height: number;
      increase: boolean;
    }) => void;
  } | null>;
}

const NavigationForMobile = ({ collapseRef }: NavigationForMobileProps) => {
  const { isMobileTopNavOpen } = useGeneralSiteSettings();

  return (
    <div className="bg-neutral-50 dark:bg-neutral-800">
      <Collapse
        type="vertical"
        collapseRef={collapseRef}
        isOpen={isMobileTopNavOpen}
        className="md:hidden "
      >
        <div className=" pt-1 py-2 lg:hidden ">
          <MobileMenuBar
            onHeightChange={(param: { height: number; increase: boolean }) => {
              if (collapseRef.current) {
                collapseRef.current?.updateCollapseHeight(param);
              }
            }}
          />
        </div>
      </Collapse>
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
