"use client";
/* eslint-disable multiline-ternary */
import { MobileMenuBar } from "@/modules/common/menu/MobileMenuBar";
import LogoBar from "@/modules/shared/LogoBar";
import Collapse from "@/modules/shared/Collapse";

import SettingButton from "@/modules/shared/SettingButton";
import { AlignRightIcon, MenuIcon } from "lucide-react";

const NavigationForMobile = ({ collapseRef, isOpen, toggleMenuOpen }) => {
  return (
    <div className="bg-neutral-50 dark:bg-neutral-800">
      <Collapse
        type="vertical"
        collapseRef={collapseRef}
        isOpen={isOpen}
        className="md:hidden "
      >
        <div className=" pt-1 py-2 lg:hidden ">
          <MobileMenuBar
            onHeightChange={(param) => {
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
          <div
            onClick={toggleMenuOpen}
            className="cursor-pointer text-lg hover:scale-110 duration-150"
          >
            {isOpen ? (
              <AlignRightIcon className="dark:text-norkive-light" />
            ) : (
              <MenuIcon className="dark:text-norkive-light" />
            )}
          </div>
          <SettingButton />
        </div>
      </div>
    </div>
  );
};

export default NavigationForMobile;
