"use client";
import { BLOG } from "@/blog.config";
import {
  generateLocaleDict,
  getFilteredLangListKey,
  initLocale,
  saveLangToLocalStorage,
} from "@/lib/lang";
import { initDarkMode, saveDarkModeToLocalStorage } from "@/lib/utils/theme";
import NextNProgress from "nextjs-progressbar";
import { toast } from "sonner";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  GbP,
  AllNavPages,
  GlobalValueInferface,
  InitGlobalNotionData,
} from "@/types/provider.model";

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

  const [lang, updateLang] = useState<string>(BLOG.LANG); // default language
  const [locale, updateLocale] = useState<any>(generateLocaleDict(BLOG.LANG)); // default language
  const [isDarkMode, updateDarkMode] = useState<boolean>(
    BLOG.APPEARANCE === "dark"
  ); // Default dark mode
  const [onLoading, setOnLoading] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState<string>(""); //
  const [filteredNavPages, setFilteredNavPages] = useState<AllNavPages[]>(
    allNavPagesForLeftSiedBar
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

  function changeOppositeLang() {
    const resLang = getFilteredLangListKey(locale.LOCALE);
    // console.log("changeOppositeLang[locale]:", resLang);
    if (resLang) {
      saveLangToLocalStorage(resLang);
      updateLang(resLang);
      updateLocale(generateLocaleDict(resLang));
      toast.success(`Language set to be ${resLang} `);
    }
  }

  useEffect(() => {
    setFilteredNavPages(allNavPagesForLeftSiedBar);
  }, [post]);

  useEffect(() => {
    initLocale(lang, locale, updateLang, updateLocale);
    initDarkMode(updateDarkMode);
  }, [lang]);

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
        lang,
        changeLang,
        changeOppositeLang,
        isDarkMode,
        updateDarkMode,
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

export const useGlobal = ({ from }: GbP): GlobalValueInferface => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used within a GlobalContext.Provider");
  }
  return context;
};
