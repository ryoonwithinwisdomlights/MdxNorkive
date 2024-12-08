"use client";
import { useGlobal } from "@/lib/providers/globalProvider";
import Link from "next/link";
import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTh, faFolder, faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TagItemMini from "@/components/TagItemMini";
library.add(faTh, faFolder);

const TagList = () => {
  const { tagOptions } = useGlobal({});
  return (
    <div className="bg-white dark:bg-neutral-700  px-10 py-10">
      <div className=" items-center  flex flex-row dark:text-neutral-200 mb-5  ">
        {/* {locale.COMMON.TAGS}: */}
        <FontAwesomeIcon
          className=" text-neutral-700  mr-2 dark:text-neutral-200 "
          icon={faTag}
        />
        <span>Tags</span>
      </div>
      <div id="tags-list" className="duration-200 flex flex-wrap">
        {tagOptions?.map((tag: any) => {
          return (
            <div key={tag.name} className="p-2">
              <TagItemMini key={tag.name} tag={tag} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TagList;
