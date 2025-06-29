"use client";
import { useGlobal } from "@/lib/context/EssentialNavInfoProvider";
import { FolderIcon, FolderOpen } from "lucide-react";
import { useRouter } from "next/navigation";

const CategoryList = () => {
  const { categoryOptions } = useGlobal({});
  const router = useRouter();
  const onClickHandler = (categoryId) => {
    router.push(`/category/${encodeURIComponent(categoryId)}`);
  };
  return (
    <div className="  px-10 py-10">
      <div className="dark:text-neutral-200 flex flex-row text-center items-center text-neutral-700 mb-5">
        {/* <TagIcon/> */}
        <FolderOpen className="mr-2 h-5 text-neutral-700 dark:text-white fill-stone-900 " />
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
                  " flex flex-row items-center hover:text-black text-neutral-700 dark:hover:text-white dark:text-neutral-300 dark:hover:bg-neutral-600 px-5 cursor-pointer py-2 hover:bg-neutral-100"
                }
              >
                <FolderIcon
                  className={`mr-4 text-${category.color}-400 fill-stone-900 `}
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
