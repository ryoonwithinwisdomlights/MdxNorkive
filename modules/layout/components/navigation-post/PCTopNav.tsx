import { MenuItemDrop } from "@/modules/common/components/menu/MenuItemDrop";
import LogoBar from "@/modules/common/ui/LogoBar";
import DarkModeButton from "@/modules/shared/DarkModeButton";
import React from "react";

const PCTopNav = ({ links }) => {
  return (
    <div className="hidden md:flex w-full h-14 shadow bg-white dark:bg-neutral-800 px-7 items-between">
      <LogoBar />

      <div
        id="top-nav-pc"
        className="hidden md:flex md:flex-row justify-center py-2 bg-white dark:bg-neutral-800"
      >
        {links &&
          links?.map((link, index) => <MenuItemDrop key={index} link={link} />)}
        <DarkModeButton className="flex flex-col justify-center items-center " />
      </div>
    </div>
  );
};

export default PCTopNav;
