"use client";
import { parseIcon } from "@/lib/utils/utils";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export const MenuItemDrop = ({ link }) => {
  const [show, changeShow] = useState(false);
  const pathname = usePathname();

  if (!link || !link.show) {
    return null;
  }
  const hasSubMenu = link?.subMenus?.length > 0;
  const selected = pathname === link.to;
  const router = useRouter();
  const onClickUrl = (sLink) => {
    if (sLink) {
      const href =
        sLink?.type === "SubMenuPage" ? `/intro/${sLink?.id}` : sLink?.slug;
      if (sLink?.slug?.includes("http")) {
        window.open(sLink.slug, "_blank");
      } else {
        router.push(href);
      }
    }
  };

  const renderMainMenus = () => {
    const icon = parseIcon(link.icon);
    return (
      <div
        className={
          "px-2 h-full whitespace-nowrap duration-300 text-sm justify-between text-neutral-700  dark:text-neutral-300 cursor-pointer flex flex-nowrap items-center " +
          (selected
            ? "bg-[#f1efe9e2] rounded-lg h-4/5 text-neutral-700 hover:text-neutral-700 dark:text-neutral-700  dark:hover:text-black "
            : "hover:text-black dark:hover:text-[#ffffff]")
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
          "px-2 h-full  whitespace-nowrap duration-300 text-sm justify-between text-neutral-700  dark:text-neutral-300 cursor-pointer flex flex-nowrap items-center " +
          (selected
            ? "bg-[#f1efe9e2] rounded-lg h-4/5 text-neutral-700 hover:text-neutral-900 dark:text-neutral-700 dark:hover:text-black "
            : " hover:text-black  dark:hover:text-[#ffffff]")
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
  const renderSubmenus = () => {
    return (
      <ul
        className={`${
          show ? "visible opacity-100 top-12 " : "invisible opacity-0 top-10 "
        } border-neutral-100  bg-white  dark:bg-neutral-600 dark:border-neutral-800 
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
                  className="hover:bg-[#f1efe9e2]  px-2 hover:rounded-lg hover:h-4/5 w-full"
                  onClick={() => {
                    onClickUrl(sLink);
                  }}
                >
                  <span className="text-xs  hover:text-black   ">
                    {iconForRenderSubmenus && (
                      <FontAwesomeIcon icon={iconForRenderSubmenus} />
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
      className="cursor-pointer list-none flex flex-row justify-center items-center mx-2"
      onMouseOver={() => changeShow(true)}
      onMouseOut={() => changeShow(false)}
    >
      {hasSubMenu && renderMainMenus()}

      {!hasSubMenu && renderMainMenusWithNoSubMenus()}

      {hasSubMenu && renderSubmenus()}
    </li>
  );
};
