"use client";
import * as Icons from "@fortawesome/free-solid-svg-icons"; // 모든 아이콘을 가져옴
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { parseIcon } from "@/lib/utils/utils";

export const MenuItemDrop = ({ link }) => {
  console.log("link:::: ", link);
  const [show, changeShow] = useState(false);
  const pathname = usePathname();

  if (!link || !link.show) {
    return null;
  }
  const hasSubMenu = link?.subMenus?.length > 0;
  // const selected = pathname === link.to;
  const selected = pathname === link.to;
  console.log(
    "pathname:",
    pathname,
    " , link.slug:",
    link.slug,
    " , link.to:",
    link.to
  );
  const renderMainMenus = () => {
    const icon = parseIcon(link.icon);
    return (
      <div
        className={
          "px-2 h-full whitespace-nowrap duration-300 text-sm justify-between dark:text-neutral-300 cursor-pointer flex flex-nowrap items-center " +
          (selected ? " text-black hover:text-white " : "hover:text-[#ffd500]")
        }
      >
        <div>
          {icon && <FontAwesomeIcon icon={icon} />} {link?.title}
          {hasSubMenu && (
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`px-2 duration-500 transition-all ${
                show ? " rotate-180" : ""
              }`}
            />
          )}
        </div>
      </div>
    );
  };

  const renderMainMenusWithNoSubMenus = () => {
    const icon = parseIcon(link.icon);

    return (
      <div
        className={
          "px-2 h-full whitespace-nowrap duration-300 text-sm justify-between dark:text-neutral-300 cursor-pointer flex flex-nowrap items-center " +
          (selected
            ? "bg-[#ffd500] rounded-lg h-4/5 text-black dark:text-neutral-700 hover:text-white "
            : "hover:text-[#ffd500] dark:hover:text-[#ffffff]")
        }
      >
        <Link
          href={link?.slug}
          target={link?.slug?.indexOf("http") === 0 ? "_blank" : "_self"}
        >
          {icon && <FontAwesomeIcon icon={icon} />} &nbsp;{link?.title}
        </Link>
      </div>
    );
  };
  {
    /* 하위 메뉴 */
  }
  const renderSubmenus = (submenus: any[]) => {
    // console.log("submenus::", submenus)
    // console.log("sLinksLink::", sLink);
    return (
      <ul
        className={`${
          show ? "visible opacity-100 top-12 " : "invisible opacity-0 top-10 "
        } border-neutral-100  bg-white  dark:bg-neutral-600 dark:border-neutral-800 transition-all duration-300 z-20 absolute block drop-shadow-lg rounded-lg dark:hover:text-[#ffffff]`}
      >
        {link?.subMenus?.map((sLink, index) => {
          const iconForRenderSubmenus = parseIcon(sLink.icon);
          return (
            <div key={index} className="h-full w-full">
              <li
                className="not:last-child:border-b-0 border-b
           text-neutral-700 dark:text-neutral-200
            tracking-widest transition-all duration-200  dark:border-neutral-800 py-3 pr-6 pl-3"
              >
                <Link
                  className="hover:bg-[#ffd500] dark:hover:text-[#ffffff] px-2 hover:rounded-lg hover:h-4/5 w-full"
                  href={sLink.slug}
                  target={sLink?.slug?.includes("http") ? "_blank" : "_self"}
                >
                  <span className="text-xs font-extralight dark:hover:text-neutral-900">
                    {iconForRenderSubmenus && (
                      <FontAwesomeIcon icon={iconForRenderSubmenus} />
                    )}
                    &nbsp;{sLink.title}
                  </span>
                </Link>
              </li>
            </div>
          );
        })}
      </ul>
    );
  };

  return (
    <li
      className="cursor-pointer list-none items-center flex mx-2"
      onMouseOver={() => changeShow(true)}
      onMouseOut={() => changeShow(false)}
    >
      {hasSubMenu && renderMainMenus()}

      {!hasSubMenu && renderMainMenusWithNoSubMenus()}

      {hasSubMenu && renderSubmenus(link?.subMenus)}
    </li>
  );
};
