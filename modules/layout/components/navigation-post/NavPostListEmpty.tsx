"use client";

import { useGlobal } from "@/context/globalProvider";

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
  const { locale } = useGlobal({ from: "index" });
  return (
    <div className="text-neutral-500 dark:text-neutral-300 flex flex-col w-full items-center justify-center min-h-screen mx-auto md:-mt-20">
      {searchKeyword && (
        <div className="text-lg ">
          {locale.COMMON.SEARCH_TERM}:&nbsp;{" "}
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
