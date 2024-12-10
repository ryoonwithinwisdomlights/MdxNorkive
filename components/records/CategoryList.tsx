"use client";
import { useGlobal } from "@/lib/providers/globalProvider";
import Link from "next/link";
import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTh, faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
library.add(faTh, faFolder);

const CategoryList = () => {
  const { categoryOptions } = useGlobal({});
  const router = useRouter();
  const onClickHandler = (categoryId) => {
    router.push(`/category/${encodeURIComponent(categoryId)}`);
  };
  return (
    <div className="  px-10 py-10">
      <div className="dark:text-neutral-200 text-neutral-700 mb-5">
        <FontAwesomeIcon
          className="mr-4 text-neutral-700 dark:text-white"
          icon={faTh}
        />
        <span className="text-xl ">Category</span>
      </div>
      <div id="category-list" className="duration-200 flex flex-wrap">
        {categoryOptions?.map((category: any) => {
          return (
            <div
              key={category.name}
              onClick={() => {
                onClickHandler(category.name);
              }}
            >
              <div
                className={
                  "hover:text-black text-neutral-700 dark:hover:text-white dark:text-neutral-300 dark:hover:bg-neutral-600 px-5 cursor-pointer py-2 hover:bg-neutral-100"
                }
              >
                <FontAwesomeIcon
                  className={`mr-4 text-${category.color}-400 `}
                  icon={faFolder}
                />
                {category.name}({category.count})
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryList;
