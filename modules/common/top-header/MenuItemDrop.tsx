"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChevronDownIcon } from "lucide-react";
import { parseIcon } from "@/lib/utils/general";

export const MenuItemDrop = ({ menuData }) => {
  if (!menuData) {
    return null;
  }
  const [show, changeShow] = useState(false);
  const pathname = usePathname();
  const hasSubMenu = menuData?.subMenus?.length > 0;
  const selected = pathname === menuData.url;
  const router = useRouter();

  const onClickUrl = (data) => {
    if (data) {
      const href = data?.type === "SubMenuPages" ? data?.url : data?.slug;

      if (data?.slug?.includes("http")) {
        window.open(data.slug, "_blank");
      } else {
        // SubMenuPage의 경우 절대 경로로 처리
        const finalHref = data?.type === "SubMenuPages" ? `/${href}` : href;
        router.push(finalHref);
      }
    }
  };

  const renderMainMenus = () => {
    const icon = parseIcon(menuData.icon);
    return (
      <div
        className="p-2 h-full whitespace-nowrap duration-300 text-sm 
      justify-between  hover:text-black
       dark:hover:text-white  rounded-lg  
        hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 cursor-pointer 
        flex flex-nowrap items-center "
      >
        <div className="flex flex-row items-center gap-2">
          {icon && <FontAwesomeIcon icon={icon} className="w-3 h-3" />}
          <span className="text-sm ">{menuData?.title}</span>
          {hasSubMenu && (
            <ChevronDownIcon
              className={`p-1 duration-500 transition-all ${
                show ? " rotate-180" : ""
              }`}
            />
          )}
        </div>
      </div>
    );
  };

  const renderMainMenusWithNoSubMenus = () => {
    const icon = parseIcon(menuData.icon);

    return (
      <div
        className={
          "px-2 h-full  whitespace-nowrap duration-300 text-sm justify-between  ursor-pointer flex flex-nowrap items-center " +
          (selected
            ? "bg-neutral-100 rounded-lg h-4/5  hover:text-neutral-900  dark:hover:text-black "
            : " hover:text-black  dark:hover:text-[#ffffff]")
        }
      >
        <Link
          href={menuData?.slug}
          target={menuData?.slug?.indexOf("http") === 0 ? "_blank" : "_self"}
          className="flex flex-row items-center gap-2"
        >
          {icon && <FontAwesomeIcon icon={icon} className="w-3 h-3 " />}
          <span className="text-xs ">{menuData?.title}</span>
        </Link>
      </div>
    );
  };
  {
    /* 하위 메뉴 */
  }
  const renderSubmenus = () => {
    return (
      <ol
        className={`${
          show ? "visible top-12 " : "invisible opacity-0 top-10 "
        } border-neutral-100 bg-white dark:bg-neutral-800  dark:border-neutral-900 
        transition-all duration-300 z-20 absolute block drop-shadow-lg rounded-lg `}
      >
        {menuData?.subMenus?.map((sLink, index) => {
          const iconForRenderSubmenus = parseIcon(sLink.icon);

          return (
            <ol key={index} className="h-full w-full">
              <li
                className="not:last-child:border-b-0 border-b
            tracking-widest transition-all duration-200  dark:border-neutral-800 p-4"
              >
                <div
                  className="hover:bg-neutral-200/50 dark:hover:bg-neutral-600/50 p-2 hover:rounded-lg hover:h-4/5 w-full"
                  onClick={() => {
                    onClickUrl(sLink);
                  }}
                >
                  <span
                    className="text-xs 
                   hover:text-black dark:hover:text-white flex flex-row items-center gap-2"
                  >
                    {iconForRenderSubmenus && (
                      <FontAwesomeIcon
                        icon={iconForRenderSubmenus}
                        className="w-3 h-3 "
                      />
                    )}
                    <span className="text-xs ">{sLink.title}</span>
                  </span>
                </div>
              </li>
            </ol>
          );
        })}
      </ol>
    );
  };

  return (
    <li
      className="cursor-pointer dark:text-neutral-200  text-neutral-600 list-none hidden md:flex  md:flex-row justify-center items-center mx-2 "
      onMouseOver={() => changeShow(true)}
      onMouseOut={() => changeShow(false)}
    >
      {hasSubMenu && renderMainMenus()}

      {!hasSubMenu && renderMainMenusWithNoSubMenus()}

      {hasSubMenu && renderSubmenus()}
    </li>
  );
};
