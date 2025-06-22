"use client";
import TagItemMini from "@/modules/blog/tag/TagItemMini";
import { useGlobal } from "@/context/globalProvider";
import { TagIcon } from "lucide-react";

const TagList = () => {
  const { tagOptions } = useGlobal({});
  return (
    <div className=" px-10 py-10">
      <div className=" items-center  flex flex-row dark:hover:text-white dark:text-neutral-200 mb-5  ">
        <TagIcon className="w-5 text-neutral-700  mr-2 dark:text-neutral-200 fill-stone-900" />
        <span className="text-xl ">Tags</span>
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
