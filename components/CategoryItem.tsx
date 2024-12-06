"use client";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFolder, faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

library.add(faFolder, faFolderOpen);

export default function CategoryItem(props) {
  const { selected, category, categoryCount } = props;
  return (
    <Link
      href={`/category/${category}`}
      passHref
      className={
        (selected
          ? "hover:text-white dark:hover:text-white bg-yellow-600 text-white "
          : "dark:text-yellow-400 text-neutral-500 hover:text-white dark:hover:text-white hover:bg-yellow-600") +
        " flex text-sm items-center duration-300 cursor-pointer py-1 font-light px-2 whitespace-nowrap"
      }
    >
      <div>
        <FontAwesomeIcon
          className="mr-2"
          icon={selected ? faFolderOpen : faFolder}
        />
        {category} {categoryCount && `(${categoryCount})`}
      </div>
    </Link>
  );
}
