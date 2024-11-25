"use client";
import React, { useState, ReactNode } from "react";
import { createContext, useContext, Dispatch, SetStateAction } from "react";
import { useGlobal } from "./globalProvider";

interface GitBookGlobalContext {
  tocVisible: boolean;
  changeTocVisible: Dispatch<SetStateAction<boolean>>;
  pageNavVisible: boolean;
  changePageNavVisible: Dispatch<SetStateAction<boolean>>;
  // filteredNavPages: any[];
  // allNavPages: any[]; // Replace `any` with the actual type of navigation pages
  // allNavPagesForGitBook: any[]; // Replace `any` with the actual type if known
  // setFilteredNavPages: Dispatch<SetStateAction<any[]>>; // Replace `any[]` with the specific type of navigation pages if known
}

// Create the context with an initial value of undefined
const ThemeGlobalGitbook = createContext<GitBookGlobalContext | undefined>(
  undefined
);

interface Props {
  children: ReactNode;
}

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

  // const [allNavPages, setAllNavPages] = useState<any[]>([]); // Replace `any[]` with actual type
  // const [allNavPagesForGitBook, setAllNavPagesForGitBook] = useState<any[]>([]); // Replace `any[]` with actual type
  //const [filteredNavPages, setFilteredNavPages] = useState<any[]>([]); // Replace `any[]` with actual type

  const {
    allNavPages,
    filteredNavPages,
    setFilteredNavPages,
    allNavPagesForGitBook,
  } = useGlobal();

  const changeTocVisible = (visible: boolean) => setTocVisible(visible);
  const changePageNavVisible = (visible: boolean) => setPageNavVisible(visible);

  const value: GitBookGlobalContext = {
    tocVisible,
    changeTocVisible,
    pageNavVisible,
    changePageNavVisible,
    // allNavPages,
    // allNavPagesForGitBook,
    // filteredNavPages,
    // setFilteredNavPages,
  };

  return (
    <ThemeGlobalGitbook.Provider value={value}>
      {children}
    </ThemeGlobalGitbook.Provider>
  );
};

// export function ThemeGitbookProvider;

export const useGitBookGlobal = (): GitBookGlobalContext => {
  const context = useContext(ThemeGlobalGitbook);
  if (!context) {
    throw new Error(
      "useGitBookGlobal must be used within a ThemeGlobalGitbook.Provider"
    );
  }
  return context;
};
