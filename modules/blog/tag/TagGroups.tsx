"use client";
import TagItemMini from "./TagItemMini";
import { TagIcon } from "lucide-react";

/**
 * tag group
 * @param tags
 * @param currentTag
 * @returns {JSX.Element}
 * @constructor
 */
const TagGroups = ({ tagOptions, currentTag }) => {
  if (!tagOptions) return <></>;
  return (
    <div id="tags-group" className="dark:border-neutral-600 py-4">
      <div className="mb-2">
        <TagIcon className="mr-2" />
        Label
      </div>
      <div className="space-y-2">
        {tagOptions?.map((tag) => {
          const selected = tag.name === currentTag;
          return <TagItemMini key={tag.name} tag={tag} selected={selected} />;
        })}
      </div>
    </div>
  );
};

export default TagGroups;
