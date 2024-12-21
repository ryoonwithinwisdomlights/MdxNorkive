"use client";
import { BLOG } from "@/blog.config";
import {
  generateLocaleDict,
  initLocale,
  saveLangToLocalStorage,
} from "@/lib/lang";
import { initDarkMode, saveDarkModeToLocalStorage } from "@/lib/utils/theme";
import NextNProgress from "nextjs-progressbar";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  AllNavPages,
  GlobalValueInferface,
  InitGlobalNotionData,
} from "./provider";

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
    allNavPagesForGitBook,
    subTypeOptions,
    tagOptions,
    className,
    customNav,
    customMenu,
    post,
    notice,
    allNavPages,
    latestPosts,
  } = initGlobalNotionData;

  const [lang, updateLang] = useState<string>(BLOG.LANG); // default language
  const [locale, updateLocale] = useState<string>(
    generateLocaleDict(BLOG.LANG)
  ); // default language
  const [isDarkMode, updateDarkMode] = useState<boolean>(
    BLOG.APPEARANCE === "dark"
  ); // Default dark mode
  const [onLoading, setOnLoading] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState<string>(""); //
  const [filteredNavPages, setFilteredNavPages] = useState<AllNavPages[]>(
    allNavPagesForGitBook
  ); // Fetch article data

  const showTocButton = post?.toc?.length > 1;

  const handleChangeDarkMode = (newStatus = !isDarkMode) => {
    saveDarkModeToLocalStorage(newStatus);
    updateDarkMode(newStatus);
    const htmlElement = document.getElementsByTagName("html")[0];
    htmlElement.classList?.remove(newStatus ? "light" : "dark");
    htmlElement.classList?.add(newStatus ? "dark" : "light");
  };

  function changeLang(lang) {
    if (lang) {
      saveLangToLocalStorage(lang);
      updateLang(lang);
      updateLocale(generateLocaleDict(lang));
    }
  }

  useEffect(() => {
    setFilteredNavPages(allNavPagesForGitBook);
  }, [post]);

  useEffect(() => {
    initLocale(lang, locale, updateLang, updateLocale);
    initDarkMode(updateDarkMode);
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        onLoading,
        setOnLoading,
        locale,
        updateLocale,
        changeLang,
        isDarkMode,
        updateDarkMode,
        notice,
        siteInfo,
        categoryOptions,
        subTypeOptions,
        tagOptions,
        filteredNavPages,
        setFilteredNavPages,
        allNavPagesForGitBook,
        className,
        customNav,
        customMenu,
        allNavPages,
        showTocButton,
        post,
        latestPosts,
        searchKeyword,
        setSearchKeyword,
        handleChangeDarkMode,
      }}
    >
      {children}
      <NextNProgress />
    </GlobalContext.Provider>
  );
}

type GbP = {
  from?: string;
};

export const useGlobal = ({ from }: GbP): GlobalValueInferface => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used within a GlobalContext.Provider");
  }
  return context;
};
