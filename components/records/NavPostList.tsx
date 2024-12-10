"use client";
import CONFIG from "@/components/config";
import { usePathname } from "next/navigation";
import NavPostItem from "./NavPostItem";
import NavPostListEmpty from "./NavPostListEmpty";
import { useGlobal } from "@/lib/providers/globalProvider";
import NoRecordFound from "../NoRecordFound";

/**
 * Blog list scrolling paging
 * @param posts All articles
 * @param tags All tags
 * @returns {JSX.Element}
 * @constructor
 */
const NavPostList = (props) => {
  const { filteredNavPages } = useGlobal({ from: "index" });
  if (filteredNavPages.length < 0) {
    return <NoRecordFound />;
  }
  const { searchKeyword, setSearchKeyword } = useGlobal({});
  const pathname = usePathname();
  let selectedSth = false;
  const groupedArray = filteredNavPages?.reduce((groups: any, item: any) => {
    const categoryName = item?.category ? item?.category : ""; // Convert category to string

    let existingGroup: any = null;
    // Turn on automatic group sorting
    if (JSON.parse(CONFIG.AUTO_SORT.toString())) {
      existingGroup = groups.find(
        (group: any) => group.category === categoryName
      ); // Search for the last group with the same name
    } else {
      existingGroup = groups[groups.length - 1]; // Get the last group
    }

    // adding data
    if (existingGroup && existingGroup.category === categoryName) {
      existingGroup.items.push(item);
    } else {
      groups.push({ category: categoryName, items: [item] });
    }
    return groups;
  }, []);

  // Handle whether selected
  groupedArray?.map((group) => {
    let groupSelected = false;
    for (const post of group?.items) {
      if (pathname.split("?")[0] === "/" + post.slug) {
        groupSelected = true;
        selectedSth = true;
      }
    }
    group.selected = groupSelected;
    return null;
  });

  // If none are selected, the first one will be opened by default.
  if (!selectedSth && groupedArray && groupedArray?.length > 0) {
    groupedArray[0].selected = true;
  }

  if (!groupedArray || groupedArray.length === 0) {
    return <NavPostListEmpty searchKeyword={searchKeyword} />;
  } else {
    return (
      <div id="posts-wrapper" className="w-full flex-grow ">
        {/* Article list */}
        {groupedArray?.map((group, index) => (
          <NavPostItem
            key={index}
            group={group}
            onHeightChange={props.onHeightChange}
          />
        ))}
      </div>
    );
  }
};

export default NavPostList;
