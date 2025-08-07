"use client"; // 클라이언트 컴포넌트
import { parseIcon } from "@/lib/utils/general";
import Collapse from "@/modules/shared/Collapse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

// 사전에 사용할 아이콘 추가

/**
 * Collapse menu
 * @param {*} param0
 * @returns
 */
export const MobileMenuItemDrop = (props) => {
  const { link } = props;

  const [show, changeShow] = useState(false);
  const hasSubMenu = link?.subMenus?.length > 0;

  const [isOpen, changeIsOpen] = useState(true);

  const router = useRouter();

  const onClickUrl = (sLink) => {
    if (sLink) {
      const href = sLink?.type === "SubMenuPage" ? sLink?.url : sLink?.slug;
      // console.log("sLink?.type:::", sLink?.type);
      // console.log("href:::", href);
      if (sLink?.slug?.includes("http")) {
        window.open(sLink.slug, "_blank");
      } else {
        // SubMenuPage의 경우 절대 경로로 처리
        const finalHref = sLink?.type === "SubMenuPage" ? `/${href}` : href;
        router.push(finalHref);
      }
    }
  };

  // if (!link || !link.show) {
  //   return null;
  // }

  const toggleShow = () => {
    changeShow(!show);
  };

  const toggleOpenSubMenu = () => {
    changeIsOpen(!isOpen);
  };

  const renderMainMenus = () => {
    const icon = parseIcon(link.icon);
    return (
      <div
        onClick={toggleOpenSubMenu}
        className="py-2 font-extralight flex justify-between cursor-pointer  no-underline tracking-widest"
      >
        <div>
          <div className={`${link.icon} text-center w-4 mr-4`} />
          {icon && <FontAwesomeIcon icon={icon} />} {link.name}
        </div>
        <div className="inline-flex items-center ">
          <ChevronRightIcon
            className={`w-3 h-3 transition-all duration-200 dark:text-norkive-light ${
              isOpen ? "rotate-90" : ""
            }`}
          />
        </div>
      </div>
    );
  };
  const renderMainMenusWithNoSubMenus = () => {
    const icon = parseIcon(link.icon);
    return (
      <Link
        href={link?.slug}
        target={link?.slug?.indexOf("http") === 0 ? "_blank" : "_self"}
        className="py-2 w-full my-auto items-center justify-between flex  "
      >
        <div>
          <div className={`${link.icon} text-center w-4 mr-4`} />
          {icon && <FontAwesomeIcon icon={icon} />} {link.name}
        </div>
      </Link>
    );
  };

  const renderSubmenus = () => {
    return (
      <Collapse isOpen={isOpen} onHeightChange={props.onHeightChange}>
        {link?.subMenus?.map((sLink, index) => {
          const icon = parseIcon(sLink.icon);
          return (
            <div
              key={index}
              className="
        not:last-child:border-b-0 border-b dark:border-neutral-800  dark:bg-neutral-600   py-2 px-14 cursor-pointer
        font-extralight text-left justify-start tracking-widest transition-all duration-200"
            >
              <div
                onClick={() => {
                  onClickUrl(sLink);
                }}
              >
                <div>
                  <div
                    className={`${sLink.icon} text-center w-3 mr-3 text-xs`}
                  />
                  {icon && <FontAwesomeIcon icon={icon} />} {sLink.title}
                </div>
              </div>
            </div>
          );
        })}
      </Collapse>
    );
  };
  return (
    <div className="bg-neutral-50 dark:bg-neutral-800 dark:text-neutral-200  text-neutral-600  ">
      <div
        className={" px-7 w-full text-left duration-200 dark:border-black"}
        onClick={toggleShow}
      >
        {!hasSubMenu && renderMainMenusWithNoSubMenus()}

        {hasSubMenu && renderMainMenus()}
      </div>

      {/* Collapse submenu */}
      {hasSubMenu && renderSubmenus()}
    </div>
  );
};
