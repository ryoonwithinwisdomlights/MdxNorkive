"use client"; // 클라이언트 컴포넌트
import { parseIcon } from "@/lib/utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// 사전에 사용할 아이콘 추가

/**
 * Collapse menu
 * @param {*} param0
 * @returns
 */
export const LefitSidebarItemDrop = (props) => {
  const { menuData } = props;
  console.log("menuData:::", menuData);
  const router = useRouter();
  const hasSubMenu = menuData?.subMenus?.length > 0;
  const onClickUrl = (sLink) => {
    if (sLink) {
      const href = sLink?.type === "SubMenuPage" ? sLink?.url : sLink?.slug;
      if (sLink?.slug?.includes("http")) {
        window.open(sLink.slug, "_blank");
      } else {
        // SubMenuPage의 경우 절대 경로로 처리
        const finalHref = sLink?.type === "SubMenuPage" ? `/${href}` : href;
        router.push(finalHref);
      }
    }
  };

  const renderMainMenus = () => {
    const icon = parseIcon(menuData.icon);
    return (
      <div className="py-2 flex justify-between cursor-pointer  no-underline tracking-widest">
        <div>
          <div className={`${menuData.icon} text-center w-4 mr-4`} />
          {icon && <FontAwesomeIcon icon={icon} />} {menuData.title}
        </div>
        <div className="inline-flex items-center ">
          <ChevronRightIcon
            className={`w-3 h-3 transition-all duration-200 dark:text-norkive-light rotate-90`}
          />
        </div>
      </div>
    );
  };
  const renderMainMenusWithNoSubMenus = () => {
    const icon = parseIcon(menuData.icon);
    return (
      <Link
        href={menuData?.slug}
        target={menuData?.slug?.indexOf("http") === 0 ? "_blank" : "_self"}
        className="py-2 w-full my-auto items-center justify-between flex  "
      >
        <div>
          <div className={`${menuData.icon} text-center w-4 mr-4`} />
          {icon && <FontAwesomeIcon icon={icon} />} {menuData.title}
        </div>
      </Link>
    );
  };

  const renderSubmenus = () => {
    return (
      <div className={`overflow-hidden duration-200 flex flex-col gap-2 `}>
        {menuData?.subMenus?.map((sLink, index) => {
          const icon = parseIcon(sLink.icon);
          return (
            <div
              key={index}
              style={{ paddingInlineStart: "1rem", paddingInlineEnd: "1rem" }}
              className=" text-left justify-start tracking-widest transition-all duration-200
              rounded-xl mx-4  p-2 cursor-pointer
               hover:bg-neutral-200/50 dark:hover:bg-neutral-700"
            >
              <div
                onClick={() => {
                  onClickUrl(sLink);
                }}
              >
                <div className="flex flex-row gap-2 items-center justify-start text-sm">
                  <div className={`${sLink.icon} text-center mr-3 text-xs`} />
                  {icon && (
                    <FontAwesomeIcon icon={icon} className="text-xs w-3 h-3" />
                  )}
                  {sLink.title}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <div className="bg-neutral-50 dark:bg-neutral-800 dark:text-neutral-200  text-neutral-600  h- ">
      <div className={" px-7 w-full text-left duration-200 dark:border-black"}>
        {!hasSubMenu && renderMainMenusWithNoSubMenus()}

        {hasSubMenu && renderMainMenus()}
      </div>

      {/* Collapse submenu */}
      {hasSubMenu && renderSubmenus()}
    </div>
  );
};
