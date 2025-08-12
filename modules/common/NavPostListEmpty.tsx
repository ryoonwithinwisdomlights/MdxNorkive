"use client";

import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";

/**
 * Blank Blog List
 * @returns {JSX.Element}
 * @constructor
 */
const NavPostListEmpty = ({
  searchKeyword = "none",
}: {
  searchKeyword?: string;
}) => {
  const { locale } = useGeneralSiteSettings();
  return (
    <div className="text-neutral-500 dark:text-neutral-300 flex flex-col w-full items-center justify-center min-h-screen mx-auto md:-mt-20">
      {searchKeyword && (
        <div className="text-lg ">
          {locale.SEARCH.SEARCH_TERM}:{" "}
          <span className="font-semibold">"{searchKeyword}"</span>
        </div>
      )}
      <div className="pt-4  items-center justify-center text-center">
        {" "}
        {locale.COMMON.NO_RECORD_FOUND}{" "}
      </div>
    </div>
  );
};
export default NavPostListEmpty;
