"use client";
import { useRouter } from "next/navigation";
import { FolderIcon, FolderOpenIcon } from "lucide-react";

export default function CategoryItem(props) {
  const { selected, category, categoryCount } = props;
  const router = useRouter();
  const onClick = (category: string) => {
    router.push(`/category/${category}`);
  };

  return (
    <div
      onClick={(e) => {
        onClick(category);
      }}
      className={
        (selected
          ? "hover:text-white dark:hover:text-white bg-neutral-600 text-white "
          : "dark:text-neutral-400 text-neutral-500 hover:text-white dark:hover:text-white hover:bg-neutral-600") +
        " flex text-sm items-center duration-300 cursor-pointer py-1 font-light px-2 whitespace-nowrap"
      }
    >
      <div className="flex flex-row items-center">
        {selected ? (
          <FolderIcon className="mr-2 w-5 h-5" />
        ) : (
          <FolderOpenIcon className="mr-2 w-5 h-5" />
        )}
        {category} {categoryCount && `(${categoryCount})`}
      </div>
    </div>
  );
}
