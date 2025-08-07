"use client";
import { parseIcon } from "@/lib/utils/general";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export const MenuItemDrop = ({ link }) => {
  const [show, changeShow] = useState(false);
  const pathname = usePathname();
  // console.log("link:::", link);
  if (!link) {
    return null;
  }
  const hasSubMenu = link?.subMenus?.length > 0;
  const selected = pathname === link.url;
  const router = useRouter();
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
    }
  };

  const renderMainMenus = () => {
    // console.log("renderMainMenus:::", link);
    const icon = parseIcon(link.icon);
    return (
      <div
        className={
          "px-2 h-full whitespace-nowrap duration-300 text-sm justify-between text-neutral-700  dark:text-neutral-300 cursor-pointer flex flex-nowrap items-center " +
          (selected
            ? "bg-neutral-100 rounded-lg h-4/5 text-neutral-700 hover:text-neutral-700 dark:text-neutral-700  dark:hover:text-black "
            : "hover:text-black dark:hover:text-[#ffffff]")
        }
      >
        <div className="flex flex-row items-center ">
          {icon && <FontAwesomeIcon icon={icon} className="mr-1" />}{" "}
          {link?.title}
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
    const icon = parseIcon(link.icon);

    return (
      <div
        className={
          "px-2 h-full  whitespace-nowrap duration-300 text-sm justify-between text-neutral-700  dark:text-neutral-300 cursor-pointer flex flex-nowrap items-center " +
          (selected
            ? "bg-neutral-100 rounded-lg h-4/5 text-neutral-700 hover:text-neutral-900 dark:text-neutral-700 dark:hover:text-black "
            : " hover:text-black  dark:hover:text-[#ffffff]")
        }
      >
        <Link
          href={link?.slug}
          target={link?.slug?.indexOf("http") === 0 ? "_blank" : "_self"}
        >
          {icon && <FontAwesomeIcon icon={icon} className="mr-1" />} &nbsp;
          {link?.title}
        </Link>
      </div>
    );
  };
  {
    /* 하위 메뉴 */
  }
  const renderSubmenus = () => {
    return (
      <ul
        className={`${
          show ? "visible top-12 " : "invisible opacity-0 top-10 "
        } border-neutral-100 bg-white dark:bg-neutral-700  dark:border-neutral-900 
        transition-all duration-300 z-20 absolute block drop-shadow-lg rounded-lg `}
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
                <div
                  className="hover:bg-neutral-100  px-2 hover:rounded-lg hover:h-4/5 w-full"
                  onClick={() => {
                    onClickUrl(sLink);
                  }}
                >
                  <span className="text-xs  hover:text-black   ">
                    {iconForRenderSubmenus && (
                      <FontAwesomeIcon
                        icon={iconForRenderSubmenus}
                        className="mr-1"
                      />
                    )}
                    &nbsp;{sLink.title}
                  </span>
                </div>
              </li>
            </div>
          );
        })}
      </ul>
    );
  };

  return (
    <li
      className="cursor-pointer list-none hidden md:flex  md:flex-row justify-center items-center mx-2 bg-white dark:bg-neutral-900"
      onMouseOver={() => changeShow(true)}
      onMouseOut={() => changeShow(false)}
    >
      {hasSubMenu && renderMainMenus()}

      {!hasSubMenu && renderMainMenusWithNoSubMenus()}

      {hasSubMenu && renderSubmenus()}
    </li>
  );
};
