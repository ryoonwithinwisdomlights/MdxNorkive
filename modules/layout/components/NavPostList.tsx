"use client";
import { useGlobal } from "@/lib/context/EssentialNavInfoProvider";
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import { ARCHIVE_CONFIG } from "@/constants/archive-config";
import NoRecordFound from "@/modules/blog/records/NoRecordFound";
import NavPostItem from "@/modules/layout/components/NavPostItem";
import NavPostListEmpty from "@/modules/layout/components/NavPostListEmpty";
import { usePathname } from "next/navigation";
/**
 * Blog list scrolling paging
 * @param records All articles
 * @param tags All tags
 * @returns {JSX.Element}
 * @constructor
 */
const NavPostList = (props) => {
  const { searchKeyword } = useGeneralSiteSettings();
  const { filteredNavPages } = useGlobal({ from: "NavPostList" });
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
    if (JSON.parse(ARCHIVE_CONFIG.AUTO_SORT.toString())) {
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
      <div id="records-wrapper" className="flex-grow w-full h-full ">
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
