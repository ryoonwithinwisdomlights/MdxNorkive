/* eslint-disable no-unused-vars */
"use client";
import { useGlobal } from "@/context/globalProvider";
import { useNorkiveTheme } from "@/context/NorkiveThemeProvider";
import { deepClone } from "@/lib/utils/utils";

import { SearchIcon, XIcon } from "lucide-react";
import { useEffect, useImperativeHandle, useRef, useState } from "react";

let lock = false;

const SearchInput = ({ cRef, className }) => {
  const [showClean, setShowClean] = useState(false);
  // 검색 키워드 상태
  const { searchKeyword, setSearchKeyword } = useGlobal({});
  const { locale } = useNorkiveTheme();
  // 입력 필드 참조
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { setFilteredNavPages, allNavPagesForLeftSiedBar } = useGlobal({
    from: "index",
  });

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
    } else if (setFilteredNavPages && allNavPagesForLeftSiedBar) {
      // undefined가 아닌 경우에만 실행
      setFilteredNavPages(allNavPagesForLeftSiedBar);
    }
    const filterAllNavPages = deepClone(allNavPagesForLeftSiedBar);

    for (let i = filterAllNavPages.length - 1; i >= 0; i--) {
      const post = filterAllNavPages[i];
      const articleInfo = post.title + "";

      const hit =
        articleInfo.toLowerCase().indexOf(searchKeyword.toLowerCase()) > -1;
      if (!hit) {
        // delete
        filterAllNavPages.splice(i, 1);
      }
    }

    // Updated
    if (setFilteredNavPages && allNavPagesForLeftSiedBar) {
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
    <div className={"flex w-full border-neutral-400"}>
      <input
        name="searchInput"
        ref={searchInputRef}
        type="text"
        className={`my-3 rounded-md border border-[#f1efe9e2] dark:border-none outline-none w-full text-sm pl-2 transition focus:shadow-lg font-light leading-10 text-black bg-[#f1efe9e2] dark:bg-neutral-700  dark:text-white`}
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
        // onCompositionStart={lockSearchInput}
        // onCompositionUpdate={lockSearchInput}
        // onCompositionEnd={unLockSearchInput}
        onChange={(e) => updateSearchKey(e.target.value)}
        defaultValue={""}
        placeholder={locale.COMMON.ENTER_SEARCH_TERM}
      />
      {searchKeyword === "" && (
        <div
          className="flex -ml-8 cursor-pointer float-right items-center justify-center py-2"
          onClick={() => {
            handleSearch();
          }}
        >
          <SearchIcon className=" w-4 hover:text-neutral-400 transform duration-200 text-neutral-200  dark:hover:text-neutral-400 cursor-pointer " />
        </div>
      )}

      {searchKeyword !== "" && (
        <div
          onClick={() => {
            cleanSearch();
            // handleSearch();
          }}
          className="flex -ml-8 cursor-pointer float-right justify-center items-center py-4"
        >
          <XIcon className="w-4 hover:text-neutral-400 transform duration-200 text-neutral-200  dark:hover:text-neutral-400 cursor-pointer " />
        </div>
      )}
    </div>
  );
};

export default SearchInput;
