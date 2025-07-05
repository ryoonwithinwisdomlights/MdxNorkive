"use client";
import AllRecordsPostCard from "@/modules/blog/records/AllRecordsPostCard";
import Collapse from "@/modules/common/components/shared/Collapse";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { ChevronLeftIcon } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";
// 사전에 사용할 아이콘 추가
library.add(faChevronLeft);
/**
 * navigation list
 * @param records
 * @param tags
 * @returns {JSX.Element}
 * @constructor
 */
const NavPostItem = (props) => {
  const { group } = props;
  // const [isOpen, changeIsOpen] = useState(false);
  const [isOpen, changeIsOpen] = useState(group?.selected);

  const params = useParams();
  const currPageId = params?.pageId ? (params?.pageId as string) : "";
  // console.log("params:", params);
  // 언제나 접어져있는 상태로 유지

  const toggleOpenSubMenu = () => {
    changeIsOpen(!isOpen);
  };

  if (group?.category) {
    return (
      <div>
        <div
          onClick={toggleOpenSubMenu}
          className="select-none flex justify-between text-sm hover:dark:text-white 
           font-sans cursor-pointer p-2 hover:bg-norkive-light rounded-md dark:hover:bg-neutral-600"
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
          {group?.items?.map((record) => (
            <div key={record.id} className="pl-2 ml-3 border-l flex flex-col ">
              <AllRecordsPostCard
                record={record}
                className="text-sm ml-1 py-1"
              />
            </div>
          ))}
        </Collapse>
      </div>
    );
  } else {
    return (
      <div>
        {group?.items?.map((record) => (
          <div key={record.id}>
            <AllRecordsPostCard className="text-sm py-2" record={record} />
          </div>
        ))}
      </div>
    );
  }
};

export default NavPostItem;
