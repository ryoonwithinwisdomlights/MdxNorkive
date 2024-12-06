"use client";
import TagItemMini from "./TagItemMini";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";

// 사전에 사용할 아이콘 추가
library.add(faTag);

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
        <FontAwesomeIcon className="mr-2" icon={faTag} />
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
