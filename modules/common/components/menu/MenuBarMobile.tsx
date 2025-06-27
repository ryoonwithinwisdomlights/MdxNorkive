"use client"; // 클라이언트 컴포넌트
import React from "react";
import { MENU_MOBILE } from "@/lib/constants/menu-mobile.constansts";
import { BLOG } from "@/blog.config";
import { MenuItemCollapse } from "@/modules/common/components/menu/MenuItemCollapse";
import { useGlobal } from "@/context/globalProvider";
import { useNorkiveTheme } from "@/context/NorkiveThemeProvider";

export const MenuBarMobile = (props) => {
  const { customMenu } = useGlobal({ from: "index" });
  const { locale } = useNorkiveTheme();
  let links = [
    {
      name: locale.COMMON.CATEGORY,
      to: "/category",
      show: MENU_MOBILE.MENU_CATEGORY,
    },
    { name: locale.COMMON.TAGS, to: "/tag", show: MENU_MOBILE.MENU_TAG },
    { name: locale.NAV.RECORD, to: "/records", show: MENU_MOBILE.MENU_RECORDS },
    {
      name: locale.NAV.DEVPROJECT,
      to: "/devproject",
      show: MENU_MOBILE.MENU_DEVPROJECT,
    },
    {
      name: locale.NAV.ENGINEERING,
      to: "/eengineering",
      show: MENU_MOBILE.MENU_ENGINEERING,
    },
    // { name: locale.NAV.SEARCH, to: '/search', show: MENU_MOBILE.MENU_SEARCH }
  ];

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
  return (
    <nav id="nav" className=" text-md">
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
