/* eslint-disable no-unused-vars */
"use client";
import { useGlobal } from "@/lib/providers/globalProvider";
import { deepClone } from "@/lib/utils/utils";
import { useImperativeHandle, useRef, useState } from "react";
let lock = false;

const SearchInput = ({ currentSearch, cRef, className }) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { setFilteredNavPages, allNavPages, allNavPagesForGitBook } = useGlobal(
    { from: "index" }
  );

  useImperativeHandle(cRef, () => {
    return {
      focus: () => {
        searchInputRef?.current?.focus();
      },
    };
  });

  const handleSearch = () => {
    let keyword: string = "";
    if (searchInputRef.current) {
      keyword = searchInputRef.current.value.trim();
    } else if (setFilteredNavPages && allNavPagesForGitBook) {
      // undefined가 아닌 경우에만 실행
      setFilteredNavPages(allNavPagesForGitBook);
    }
    const filterAllNavPages = deepClone(allNavPagesForGitBook);

    for (let i = filterAllNavPages.length - 1; i >= 0; i--) {
      const post = filterAllNavPages[i];
      const articleInfo = post.title + "";

      const hit = articleInfo.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
      if (!hit) {
        // delete
        filterAllNavPages.splice(i, 1);
      }
    }

    // Updated
    if (setFilteredNavPages && allNavPagesForGitBook) {
      setFilteredNavPages(filterAllNavPages);
    }
  };

  /**
   *
Enter key
   * @param {*} e
   */
  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      // 입력
      handleSearch();
    } else if (e.keyCode === 27) {
      // ESC
      cleanSearch();
    }
  };

  /**
   * Clean search
   */
  const cleanSearch = () => {
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }

    handleSearch();
  };

  const [showClean, setShowClean] = useState(false);
  const updateSearchKey = (val) => {
    if (lock) {
      return;
    }
    if (searchInputRef.current) {
      searchInputRef.current.value = val;
    }

    if (val) {
      setShowClean(true);
    } else {
      setShowClean(false);
    }
  };
  function lockSearchInput() {
    lock = true;
  }

  function unLockSearchInput() {
    lock = false;
  }

  return (
    <div className={"flex w-full border-neutral-400"}>
      <input
        ref={searchInputRef}
        type="text"
        className={`my-3 rounded-md border border-neutral-100 dark:border-none outline-none w-full text-sm pl-2 transition focus:shadow-lg font-light leading-10 text-black bg-neutral-100  dark:bg-neutral-900  dark:text-white`}
        onKeyUp={handleKeyUp}
        onCompositionStart={lockSearchInput}
        onCompositionUpdate={lockSearchInput}
        onCompositionEnd={unLockSearchInput}
        onChange={(e) => updateSearchKey(e.target.value)}
        defaultValue={currentSearch}
      />

      <div
        className="flex -ml-8 cursor-pointer float-right items-center justify-center py-2"
        onClick={handleSearch}
      >
        <i
          className={
            "hover:text-neutral-400 transform duration-200 text-neutral-200  dark:hover:text-neutral-400 cursor-pointer fas fa-search"
          }
        />
      </div>

      {showClean && (
        <div className="-ml-14 cursor-pointer float-right items-end px-4   justify-center py-4">
          <i
            className="fas fa-times hover:text-neutral-400 items-center justify-center transform duration-200 text-neutral-200 cursor-pointer py-2  dark:hover:text-neutral-300"
            onClick={cleanSearch}
          />
        </div>
      )}
    </div>
  );
};

export default SearchInput;
