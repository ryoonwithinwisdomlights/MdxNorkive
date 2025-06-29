"use client"; // 클라이언트 컴포넌트
import { useGlobal } from "@/lib/context/EssentialNavInfoProvider";
import { useNorkiveTheme } from "@/lib/context/GeneralSiteSettingsProvider";
import { MenuItemCollapse } from "@/modules/common/components/menu/MenuItemCollapse";

export const MenuBarMobile = (props) => {
  const { customMenu } = useGlobal({ from: "index" });
  const { locale } = useNorkiveTheme();
  // let links = [
  //   {
  //     name: locale.COMMON.CATEGORY,
  //     to: "/category",
  //     show: MENU_MOBILE.MENU_CATEGORY,
  //   },
  //   { name: locale.COMMON.TAGS, to: "/tag", show: MENU_MOBILE.MENU_TAG },
  //   { name: locale.NAV.RECORD, to: "/records", show: MENU_MOBILE.MENU_RECORDS },
  //   {
  //     name: locale.NAV.DEVPROJECT,
  //     to: "/devproject",
  //     show: MENU_MOBILE.MENU_DEVPROJECT,
  //   },
  //   {
  //     name: locale.NAV.ENGINEERING,
  //     to: "/eengineering",
  //     show: MENU_MOBILE.MENU_ENGINEERING,
  //   },
  //   // { name: locale.NAV.SEARCH, to: '/search', show: MENU_MOBILE.MENU_SEARCH }
  // ];

  //   links = BLOG.CUSTOM_MENU ? customMenu || [] : [];
  // }

  const links = customMenu;
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
