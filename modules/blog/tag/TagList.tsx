"use client";
import { useGlobal } from "@/lib/context/EssentialNavInfoProvider";
import TagItemMini from "@/modules/blog/tag/TagItemMini";
import { TagIcon } from "lucide-react";

const TagList = () => {
  const { tagOptions } = useGlobal({});
  if (!tagOptions) {
    return <div>No tag options</div>;
  }
  return (
    <div
      className="dark:bg-black dark:text-neutral-300 
  w-full  flex flex-col overflow-y-auto h-screen  scrollbar-hide overscroll-contain "
    >
      <div className=" items-center  flex flex-row dark:hover:text-white dark:text-neutral-200 mb-5  ">
        <TagIcon className="w-5 text-neutral-700  mr-2 dark:text-neutral-200 fill-stone-900" />
        <span className="text-xl ">Tags</span>
      </div>
      <div id="tags-list" className="duration-200 flex flex-wrap">
        {tagOptions?.map((tag: any) => {
          return (
            <div key={tag.name} className="p-2">
              <TagItemMini key={tag.name} data={tag} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TagList;
