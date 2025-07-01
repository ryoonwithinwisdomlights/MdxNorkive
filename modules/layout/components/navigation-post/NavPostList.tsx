"use client";
import { MENU_MOBILE } from "@/lib/constants/menu-mobile.constansts";
import { usePathname } from "next/navigation";
import NavPostItem from "@/modules/layout/components/navigation-post/NavPostItem";
import NavPostListEmpty from "@/modules/layout/components/navigation-post/NavPostListEmpty";
import NoRecordFound from "@/modules/blog/records/NoRecordFound";
import { useNorkiveTheme } from "@/lib/context/GeneralSiteSettingsProvider";

/**
 * Blog list scrolling paging
 * @param records All articles
 * @param tags All tags
 * @returns {JSX.Element}
 * @constructor
 */
const NavPostList = (props) => {
  const { searchKeyword, filteredNavPages } = useNorkiveTheme();
  if (filteredNavPages !== undefined) {
    if (filteredNavPages.length < 0) {
      return <NoRecordFound />;
    }
  }

  const pathname = usePathname();
  let selectedSth = false;
  const groupedArray = filteredNavPages?.reduce((groups: any, item: any) => {
    const categoryName = item?.category ? item?.category : ""; // Convert category to string

    let existingGroup: any = null;
    // Turn on automatic group sorting
    if (JSON.parse(MENU_MOBILE.AUTO_SORT.toString())) {
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
    for (const record of group?.items) {
      if (pathname.split("?")[0] === "/" + record.slug) {
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
      <div id="records-wrapper" className="flex-grow w-full h-full  ">
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
