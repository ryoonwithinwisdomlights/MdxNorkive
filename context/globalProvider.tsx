"use client";
import { InitGlobalNotionData, LeftSideBarNavItem } from "@/types";
import { GlobalValueInferface } from "@/types/provider.model";
import NextNProgress from "nextjs-progressbar";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type globalState = GlobalValueInferface;
const GlobalContext = createContext<globalState | undefined>(undefined);
/**
 * Global variable Provider, including language localization, style theme, search terms
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export function GlobalContextProvider({
  children,
  from = "index",
  initGlobalNotionData,
}: {
  children: ReactNode;
  from?: string;
  initGlobalNotionData: InitGlobalNotionData;
}) {
  const {
    siteInfo,
    categoryOptions,
    allNavPagesForLeftSiedBar,
    subTypeOptions,
    tagOptions,
    className,
    oldNav,
    customMenu,
    post,
    notice,
    latestPosts,
  } = initGlobalNotionData;

  const [searchKeyword, setSearchKeyword] = useState<string>(""); //
  const [filteredNavPages, setFilteredNavPages] = useState<
    LeftSideBarNavItem[]
  >(allNavPagesForLeftSiedBar); // Fetch article data

  useEffect(() => {
    setFilteredNavPages(allNavPagesForLeftSiedBar);
  }, [post]);

  return (
    <GlobalContext.Provider
      value={{
        notice,
        siteInfo,
        categoryOptions,
        subTypeOptions,
        tagOptions,
        filteredNavPages,
        setFilteredNavPages,
        allNavPagesForLeftSiedBar,
        className,
        oldNav,
        customMenu,
        post,
        latestPosts,
        searchKeyword,
        setSearchKeyword,
      }}
    >
      {children}
      <NextNProgress />
    </GlobalContext.Provider>
  );
}

export const useGlobal = ({
  from,
}: {
  from?: string;
}): GlobalValueInferface => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used within a GlobalContext.Provider");
  }
  return context;
};
