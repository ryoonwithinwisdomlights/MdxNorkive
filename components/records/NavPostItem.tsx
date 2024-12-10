"use client";
import AllRecordsPostCard from "./AllRecordsPostCard";
import React, { useState } from "react";
import Collapse from "@/components/shared/Collapse";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
// 사전에 사용할 아이콘 추가
library.add(faChevronLeft);
/**
 * navigation list
 * @param posts
 * @param tags
 * @returns {JSX.Element}
 * @constructor
 */
const NavPostItem = (props) => {
  const { group } = props;
  // const [isOpen, changeIsOpen] = useState(false);
  const [isOpen, changeIsOpen] = useState(group?.selected);
  // 언제나 접어져있는 상태로 유지

  const toggleOpenSubMenu = () => {
    changeIsOpen(!isOpen);
  };

  if (group?.category) {
    return (
      <div>
        <div
          onClick={toggleOpenSubMenu}
          className="select-none flex justify-between text-sm hover:dark:text-white   font-sans cursor-pointer p-2 hover:bg-neutral-100 rounded-md dark:hover:bg-neutral-600"
          key={group?.category}
        >
          <span>{group?.category}</span>
          <div className="inline-flex items-center select-none pointer-events-none ">
            <FontAwesomeIcon
              className={`px-2 transition-all duration-200 ${
                isOpen ? "rotate-90" : ""
              }`}
              icon={faChevronLeft}
            />
          </div>
        </div>
        <Collapse isOpen={isOpen} onHeightChange={props.onHeightChange}>
          {group?.items?.map((post) => (
            <div key={post.id} className="ml-3 border-l">
              <AllRecordsPostCard className="text-sm ml-3" post={post} />
            </div>
          ))}
        </Collapse>
      </div>
    );
  } else {
    return (
      <div>
        {group?.items?.map((post) => (
          <div key={post.id}>
            <AllRecordsPostCard className="text-sm py-2" post={post} />
          </div>
        ))}
      </div>
    );
  }
};

export default NavPostItem;
