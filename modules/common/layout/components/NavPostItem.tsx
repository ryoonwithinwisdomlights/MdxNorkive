"use client";
import { BLOG } from "@/blog.config";
import SubstringedTitleNav from "@/modules/common/layout/components/SubstringedTitleNav";
import Collapse from "@/modules/shared/Collapse";
import { ChevronLeftIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

/**
 * navigation list
 * @param records
 * @param tags
 * @returns {JSX.Element}
 * @constructor
 */
const NavPostItem = (props) => {
  const { group } = props;
  const pathname = usePathname();
  const [isOpen, changeIsOpen] = useState(group?.selected);
  const toggleOpenSubMenu = () => {
    changeIsOpen(!isOpen);
  };

  if (group?.category) {
    return (
      <div>
        <div
          onClick={toggleOpenSubMenu}
          className="select-none flex  justify-between text-sm hover:dark:text-white 
           font-sans cursor-pointer p-2 hover:bg-neutral-100/50  rounded-md dark:hover:bg-neutral-800/50"
          key={group?.category}
        >
          <span>{group?.category}</span>
          <div className="inline-flex items-center select-none pointer-events-none ">
            <ChevronLeftIcon
              className={`px-1 transition-all duration-200 ${
                isOpen ? "rotate-90" : ""
              }`}
            />
          </div>
        </div>
        <Collapse isOpen={isOpen} onHeightChange={props.onHeightChange}>
          {group?.items?.map((record) => {
            const currentSelected = pathname.split("/")[2] === record.id;
            return (
              <div
                key={record.id}
                className={`${
                  currentSelected
                    ? "bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 text-neutral-600 font-semibold"
                    : "hover:bg-neutral-200/40  dark:hover:bg-neutral-800/50"
                } rounded-lg pl-3  flex flex-col `}
              >
                <div
                  className={`border-l py-1 ${
                    currentSelected ? "border-neutral-600" : ""
                  }`}
                >
                  <SubstringedTitleNav
                    record={record}
                    className="text-sm ml-1 py-1"
                    substr={true}
                    substrNumber={BLOG.RECORD_SUBSTR_NAVBAR_NUMBER}
                  />
                </div>
              </div>
            );
          })}
        </Collapse>
      </div>
    );
  } else {
    return (
      <div>
        {group?.items?.map((record) => (
          <div key={record.id}>
            <SubstringedTitleNav className="text-sm py-2" record={record} />
          </div>
        ))}
      </div>
    );
  }
};

export default NavPostItem;
