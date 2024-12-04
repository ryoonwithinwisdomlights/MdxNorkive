"use client"; // 클라이언트 컴포넌트
import React from "react";
import CONFIG from "@/components/gitbook-config";
import { BLOG } from "@/blog.config";
import { MenuItemCollapse } from "./MenuItemCollapse";
import { useGlobal } from "@/lib/providers/globalProvider";

export const MenuBarMobile = (props) => {
  const { customMenu, customNav, locale } = useGlobal({ from: "index" });
  // console.log("customMenu::::", customMenu);
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
    // links = customMenu;
    //     1. customMenu가 undefined일 경우, 빈 배열을 기본값으로 설정합니다.
    //     2. 타입 단언 사용 (주의 필요)
    // customMenu가 절대 undefined가 될 수 없다고 보장할 수 있다면, 타입 단언을 사용하여 타입스크립트 에러를 무시할 수 있습니다. 이는 런타임 에러의 위험이 있으므로 조심해야 합니다:
    //links = BLOG.CUSTOM_MENU ? (customMenu as { name: any; to: string; show: boolean }[]) : [];
    links = BLOG.CUSTOM_MENU ? customMenu || [] : [];
  }

  if (!links || links.length === 0) {
    return null;
  }
  // console.log("links:::::", links);
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
