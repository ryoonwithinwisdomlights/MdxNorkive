import React from "react";
import CONFIG from "@/themes/gitbook/config";
import { BLOG } from "@/blog.config";
import { MenuItemCollapse } from "./MenuItemCollapse";
import { useGlobal } from "@/lib/providers/globalProvider";

export const MenuBarMobile = (props) => {
  const { customMenu, customNav, locale } = useGlobal();

  let links = [
    // { name: locale.NAV.INDEX, to: '/' || '/', show: true },
    {
      name: locale.COMMON.CATEGORY,
      to: "/category",
      show: CONFIG.MENU_CATEGORY,
    },
    { name: locale.COMMON.TAGS, to: "/tag", show: CONFIG.MENU_TAG },
    { name: locale.NAV.ARCHIVE, to: "/archive", show: CONFIG.MENU_ARCHIVE },
    {
      name: locale.NAV.WRITING,
      to: "/writing-records",
      show: CONFIG.MENU_WRITING,
    },
    {
      name: locale.NAV.GENERAL,
      to: "/general-records",
      show: CONFIG.MENU_GENERAL,
    },
    {
      name: locale.NAV.ENGINEERING,
      to: "/engineering-records",
      show: CONFIG.MENU_ENGINEERING,
    },
    {
      name: locale.NAV.SIDEPROJECT,
      to: "/sideproject",
      show: CONFIG.MENU_SIDEPROJECT,
    },
    // { name: locale.NAV.SEARCH, to: '/search', show: CONFIG.MENU_SEARCH }
  ];

  if (customNav) {
    links = links.concat(customNav);
  }

  // If the custom menu is enabled, Page will no longer be used to generate the menu.
  if (BLOG.CUSTOM_MENU) {
    links = customMenu;
  }

  if (!links || links.length === 0) {
    return null;
  }

  return (
    <nav id="nav" className=" text-md">
      {/* {links.map(link => <NormalMenu key={link?.id} link={link}/>)} */}
      {links?.map((link, index) => (
        <MenuItemCollapse
          onHeightChange={props?.onHeightChange}
          key={index}
          link={link}
        />
      ))}
    </nav>
  );
};
