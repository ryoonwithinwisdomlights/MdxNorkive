"use client"; // 클라이언트 컴포넌트
import Collapse from "@/components/shared/Collapse";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

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

  if (!link || !link.show) {
    return null;
  }

  const selected = pathname === link.to;

  const toggleShow = () => {
    changeShow(!show);
  };

  const toggleOpenSubMenu = () => {
    changeIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className={
          (selected
            ? "bg-yellow-500 text-white hover:text-white"
            : "hover:text-yellow-500") +
          " px-7 w-full text-left duration-200 dark:bg-neutral-700 dark:border-black"
        }
        onClick={toggleShow}
      >
        {!hasSubMenu && (
          <Link
            href={link?.to}
            target={link?.to?.indexOf("http") === 0 ? "_blank" : "_self"}
            className="py-2 w-full my-auto items-center justify-between flex  "
          >
            <div>
              <div className={`${link.icon} text-center w-4 mr-4`} />
              {link.name}
            </div>
          </Link>
        )}

        {hasSubMenu && (
          <div
            onClick={hasSubMenu && toggleOpenSubMenu}
            className="py-2 font-extralight flex justify-between cursor-pointer  dark:text-neutral-200 no-underline tracking-widest"
          >
            <div>
              <div className={`${link.icon} text-center w-4 mr-4`} />
              {link.name}
            </div>
            <div className="inline-flex items-center ">
              <FontAwesomeIcon
                className={`px-2 transition-all duration-200 ${
                  isOpen ? "rotate-90" : ""
                }`}
                icon={faChevronRight}
              />
              {/* <i
                className={`px-2 fas fa-chevron-right transition-all duration-200 ${
                  isOpen ? "rotate-90" : ""
                }`}
              ></i> */}
            </div>
          </div>
        )}
      </div>

      {/* Collapse submenu */}
      {hasSubMenu && (
        <Collapse isOpen={isOpen} onHeightChange={props.onHeightChange}>
          {link?.subMenus?.map((sLink, index) => {
            return (
              <div
                key={index}
                className="
              not:last-child:border-b-0 border-b dark:border-neutral-800  dark:bg-neutral-600 dark:hover:bg-neutral-700 dark:text-neutral-200  py-2 px-14 cursor-pointer
              font-extralighttext-left justify-start bg-neutral-50  text-neutral-600 hover:bg-neutral-100  tracking-widest transition-all duration-200"
              >
                <Link
                  href={sLink.to}
                  target={link?.to?.indexOf("http") === 0 ? "_blank" : "_self"}
                >
                  <div>
                    <div
                      className={`${sLink.icon} text-center w-3 mr-3 text-xs`}
                    />
                    {sLink.title}
                  </div>
                </Link>
              </div>
            );
          })}
        </Collapse>
      )}
    </>
  );
};
