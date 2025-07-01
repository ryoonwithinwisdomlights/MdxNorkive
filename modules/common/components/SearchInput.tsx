/* eslint-disable no-unused-vars */
"use client";
import { useNorkiveTheme } from "@/lib/context/GeneralSiteSettingsProvider";
import { deepClone } from "@/lib/utils/utils";

import { SearchIcon, XIcon } from "lucide-react";
import { useEffect, useImperativeHandle, useRef, useState } from "react";

let lock = false;

const SearchInput = ({ cRef }) => {
  const [showClean, setShowClean] = useState(false);
  // 검색 키워드 상태
  const {
    locale,
    searchKeyword,
    setSearchKeyword,
    setFilteredNavPages,
    allNavPagesForLeftSideBar,
  } = useNorkiveTheme();

  // 입력 필드 참조
  const searchInputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(cRef, () => {
    return {
      focus: () => {
        searchInputRef?.current?.focus();
      },
    };
  });

  const handleSearch = () => {
    if (searchInputRef?.current) {
      setSearchKeyword(searchInputRef.current.value.trim());
    } else if (setFilteredNavPages && allNavPagesForLeftSideBar) {
      // undefined가 아닌 경우에만 실행
      setFilteredNavPages(allNavPagesForLeftSideBar);
    }
    const filterAllNavPages = deepClone(allNavPagesForLeftSideBar);

    for (let i = filterAllNavPages.length - 1; i >= 0; i--) {
      const record = filterAllNavPages[i];
      const ArchiveInfo = record.title + "";

      const hit =
        ArchiveInfo.toLowerCase().indexOf(searchKeyword.toLowerCase()) > -1;
      if (!hit) {
        // delete
        filterAllNavPages.splice(i, 1);
      }
    }

    // Updated
    if (setFilteredNavPages && allNavPagesForLeftSideBar) {
      setFilteredNavPages(filterAllNavPages);
    }
    // cleanSearch()
  };

  /**
   *
Enter key  // 키 입력 처리 함수
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

    setShowClean((prev) => !prev);
    handleSearch();
  };

  // 검색 키워드 변경 처리
  const updateSearchKey = (val) => {
    // if (lock) {
    //   return;
    // }
    if (searchInputRef.current) {
      searchInputRef.current.value = val;
    }

    if (val) {
      setShowClean(true);
    } else {
      setShowClean(false);
    }
  };

  // 입력 시작, 업데이트, 종료 이벤트를 처리하는 잠금/잠금 해제 함수
  function lockSearchInput() {
    lock = true;
  }

  function unLockSearchInput() {
    lock = false;
  }

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchInputRef, showClean]);
  // none of the modals are gonna be rendered unless we are fully on the client side.
  if (!isMounted) return null;

  return (
    <div
      className={
        "hidden md:flex w-full md:max-w-sm  h-full relative border-neutral-400 mr-4"
      }
    >
      {searchKeyword === "" && (
        <div
          className="absolute left-2 flex top-5 flex-row justify-start items-center   cursor-pointer float-left"
          onClick={() => {
            handleSearch();
          }}
        >
          <SearchIcon className="w-4 h-4  text-neutral-200  hover:text-neutral-400 dark:hover:text-neutral-400 cursor-pointer " />
        </div>
      )}

      <input
        name="searchInput"
        ref={searchInputRef}
        type="text"
        className={`my-3 pl-10 rounded-md border border-neutral-200 
           outline-none w-full placeholder:text-neutral-400 sm:text-sm
          transition-all focus:border-neutral-500 focus:ring-4 focus:ring-neutral-200 
           hover:text-neutral-400 dark:hover:text-neutral-400 cursor-pointer
           dark:bg-neutral-800`}
        onKeyUp={handleKeyUp}
        onFocus={() => {
          if (searchInputRef.current) {
            searchInputRef.current.placeholder = ""; // 포커스 시 placeholder 제거
            searchInputRef.current.value = "";
          }
        }}
        onBlur={() => {
          if (searchInputRef.current && searchInputRef.current.value === "") {
            searchInputRef.current.placeholder =
              locale.COMMON.ENTER_SEARCH_TERM;
            // 포커스 잃었을 때 비어있으면 placeholder 복구
          }
        }}
        //       onChange={(e) => {
        //   onChange(e.target.value);
        //   debounced(e.target.value);
        // }}
        onChange={(e) => updateSearchKey(e.target.value)}
        defaultValue={""}
        placeholder={locale.COMMON.ENTER_SEARCH_TERM}
        autoCapitalize="none"
      />

      {searchKeyword !== "" && (
        <button
          onClick={() => {
            cleanSearch();
            // handleSearch();
            //  onChange("");
            //   onChangeDebounced?.("");
          }}
          className="pointer-events-auto absolute inset-y-0 right-0 flex items-center pr-4"
        >
          <XIcon className="h-4 w-4 text-neutral-600" />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
