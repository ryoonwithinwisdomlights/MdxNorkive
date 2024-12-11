"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";

type GitBookGlobalContext = {
  tocVisible: boolean;
  changeTocVisible: () => void; // 토글 함수
  pageNavVisible: boolean;
  changePageNavVisible: () => void; // 토글 함수
};

// Create the context with an initial value of undefined
/**
 *  createContext는 기본값을 설정해야 하므로, 초기값을 undefined로 설정하면 타입스크립트에서 오류가 발생합니다.
 *  이를 해결하기 위해 컨텍스트 초기값에 적절한 기본값을 제공하거나 null을 허용하도록 설정해야 합니다.
 */
const ThemeGlobalGitbook = createContext<GitBookGlobalContext | null>(null);

export const useGitBookGlobal = (): GitBookGlobalContext => {
  const context = useContext(ThemeGlobalGitbook);
  if (!context) {
    throw new Error(
      "useGitBookGlobal must be used within a ThemeGlobalGitbook.Provider"
    );
  }
  return context;
};

/**
 * Global Theme variable Provider
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */

export const ThemeGitbookProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [tocVisible, setTocVisible] = useState<boolean>(false);
  const [pageNavVisible, setPageNavVisible] = useState<boolean>(false);

  const changeTocVisible = () => setTocVisible(!tocVisible);
  const changePageNavVisible = () => setPageNavVisible(!pageNavVisible);

  const value: GitBookGlobalContext = {
    tocVisible,
    changeTocVisible,
    pageNavVisible,
    changePageNavVisible,
  };

  return (
    <ThemeGlobalGitbook.Provider value={value}>
      {children}
    </ThemeGlobalGitbook.Provider>
  );
};
