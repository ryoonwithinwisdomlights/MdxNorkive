// ThemeGlobalGitbookProvider.tsx
import React, { useState, ReactNode } from "react";
import ThemeGlobalGitbook, { GitBookGlobalContext } from "./ThemeGlobalGitbook";
interface Props {
  children: ReactNode;
}

const ThemeGlobalGitbookProvider: React.FC<Props> = ({ children }) => {
  const [tocVisible, setTocVisible] = useState<boolean>(false);
  const [pageNavVisible, setPageNavVisible] = useState<boolean>(false);

  const [allNavPages, setAllNavPages] = useState<any[]>([]); // Replace `any[]` with actual type
  const [allNavPagesForGitBook, setAllNavPagesForGitBook] = useState<any[]>([]); // Replace `any[]` with actual type
  const [filteredNavPages, setFilteredNavPages] = useState<any[]>([]); // Replace `any[]` with actual type

  const changeTocVisible = (visible: boolean) => setTocVisible(visible);
  const changePageNavVisible = (visible: boolean) => setPageNavVisible(visible);

  const value: GitBookGlobalContext = {
    tocVisible,
    changeTocVisible,
    pageNavVisible,
    changePageNavVisible,
    allNavPages,
    allNavPagesForGitBook,
    setFilteredNavPages,
  };

  return (
    <ThemeGlobalGitbook.Provider value={value}>
      {children}
    </ThemeGlobalGitbook.Provider>
  );
};

export default ThemeGlobalGitbookProvider;
