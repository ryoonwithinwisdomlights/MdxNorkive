"use client"; // 클라이언트 컴포넌트
import Collapse from "@/components/shared/Collapse";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { parseIcon } from "@/lib/utils/utils";

// 사전에 사용할 아이콘 추가
library.add(faChevronRight);

/**
 * Collapse menu
 * @param {*} param0
 * @returns
 */
export const MenuItemCollapse = (props) => {
  const { link } = props;
  const pathname = usePathname();
  const [show, changeShow] = useState(false);
  const hasSubMenu = link?.subMenus?.length > 0;

  const [isOpen, changeIsOpen] = useState(false);

  const router = useRouter();

  const onClickUrl = (sLink) => {
    if (sLink) {
      //경로 앞에 슬래시(/)를 추가하여 절대 경로로 변경
      //절대 경로는 루트(root) 디렉토리에서부터 시작하는 경로이며, 현재 URL과 관계없이 동일한 위치를 가리키게 된다.
      const href =
        sLink?.type === "SubMenuPage" ? `/intro/${sLink?.id}` : sLink?.slug;
      if (sLink?.slug?.includes("http")) {
        window.open(sLink.slug, "_blank");
      } else {
        router.push(href);
      }
    }
  };

  if (!link || !link.show) {
    return null;
  }

  const selected = pathname === link.slug;
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
        className="py-2 font-extralight flex justify-between cursor-pointer  dark:text-neutral-200 no-underline tracking-widest"
      >
        <div>
          <div className={`${link.icon} text-center w-4 mr-4`} />
          {icon && <FontAwesomeIcon icon={icon} />} {link.name}
        </div>
        <div className="inline-flex items-center ">
          <FontAwesomeIcon
            className={`px-2 transition-all duration-200 text-[#f1efe9e2] ${
              isOpen ? "rotate-90" : ""
            }`}
            icon={faChevronRight}
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
        not:last-child:border-b-0 border-b dark:border-neutral-800  dark:bg-neutral-600 dark:hover:bg-neutral-700 dark:text-neutral-200  py-2 px-14 cursor-pointer
        font-extralight text-left justify-start bg-neutral-50  text-neutral-600 hover:bg-neutral-100  tracking-widest transition-all duration-200"
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
    <>
      <div
        className={
          (selected
            ? "bg-neutral-500 text-white hover:text-white"
            : "hover:text-neutral-500") +
          " px-7 w-full text-left duration-200 dark:bg-neutral-700 dark:border-black"
        }
        onClick={toggleShow}
      >
        {!hasSubMenu && renderMainMenusWithNoSubMenus()}

        {hasSubMenu && renderMainMenus()}
      </div>

      {/* Collapse submenu */}
      {hasSubMenu && renderSubmenus()}
    </>
  );
};
