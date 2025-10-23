"use client"; // 클라이언트 컴포넌트
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";

/**
 * Collapse menu
 * @param {*} param0
 * @returns
 */
export const RightSidebarItemDrop = (props) => {
  const { menuData } = props;
  const { toggleMobileLeftSidebarOpen } = useGeneralSiteSettings();
  const router = useRouter();
  const hasSubMenu = menuData?.subMenus?.length > 0;

  const onClickUrl = (sLink) => {
    if (sLink) {
      const href = sLink?.type === "SubMenuPages" ? sLink?.url : sLink?.slug;
      if (sLink?.slug?.includes("http")) {
        window.open(sLink.slug, "_blank");
      } else {
        // SubMenuPage의 경우 절대 경로로 처리
        const finalHref = sLink?.type === "SubMenuPages" ? `/${href}` : href;
        router.push(finalHref);
      }
      toggleMobileLeftSidebarOpen();
    }
  };

  const renderMainMenus = () => {
    // const icon = parseIcon(menuData.icon);
    return (
      <div
        className="p-2  rounded-lg  flex justify-start cursor-pointer 
      flex-row items-center gap-2
       hover:bg-neutral-200/50 dark:hover:bg-neutral-700"
      >
        <span className="text-sm">{menuData.title}</span>
      </div>
    );
  };
  const renderMainMenusWithNoSubMenus = () => {
    // const icon = parseIcon(menuData.icon);
    return (
      <Link
        href={menuData?.slug}
        target={menuData?.slug?.indexOf("http") === 0 ? "_blank" : "_self"}
        className="p-2  rounded-lg  w-full my-auto items-center justify-between flex  "
      >
        <div className="flex flex-row items-center gap-2">
          <span className="text-sm">{menuData.title}</span>
        </div>
      </Link>
    );
  };

  const renderSubmenus = () => {
    return (
      <div className={`overflow-hidden duration-200 flex flex-col gap-2 `}>
        {menuData?.subMenus?.map((sLink, index) => {
          // const icon = parseIcon(sLink.icon);
          return (
            <div
              key={index}
              style={{ paddingInlineStart: "20px", paddingInlineEnd: "0px" }}
              className=" text-left justify-start  transition-all duration-200
              rounded-lg  cursor-pointer p-2
               hover:bg-neutral-200/50 dark:hover:bg-neutral-700"
            >
              <div
                onClick={() => {
                  onClickUrl(sLink);
                }}
              >
                <div className="flex flex-row gap-2 items-center justify-start">
                  <span className="text-sm">{sLink.title}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <div className="flex flex-col gap-2  dark:text-neutral-200  text-neutral-600">
      <div className={" w-full text-left duration-200 dark:border-black"}>
        {!hasSubMenu && renderMainMenusWithNoSubMenus()}

        {hasSubMenu && renderMainMenus()}
      </div>

      {/* Collapse submenu */}
      {hasSubMenu && renderSubmenus()}
    </div>
  );
};
