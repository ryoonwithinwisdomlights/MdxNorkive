"use client";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFolder, faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";

library.add(faFolder, faFolderOpen);

export default function CategoryItem(props) {
  const { selected, category, categoryCount } = props;
  const router = useRouter();
  const onClick = (category: string) => {
    router.push(`/category/${category}`);
  };
  return (
    <div
      // href={`/category/${category}`}
      // passHref
      onClick={(e) => {
        onClick(category);
      }}
      className={
        (selected
          ? "hover:text-white dark:hover:text-white bg-stone-600 text-white "
          : "dark:text-stone-400 text-neutral-500 hover:text-white dark:hover:text-white hover:bg-stone-600") +
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
    </div>
  );
}
