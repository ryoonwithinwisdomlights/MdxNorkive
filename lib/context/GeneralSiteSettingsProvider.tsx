"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { BLOG } from "@/blog.config";
import { GeneralSiteSettingsProps, TOCItemType } from "@/types";

import {
  generateLocaleDict,
  getFilteredDictionaryListKey,
  initLocale,
  saveLangToLocalStorage,
  initDarkMode,
  setThemeByLocalStorage,
} from "@/lib/utils";

import { toast } from "sonner";
import NextNProgress from "nextjs-progressbar";
const GeneralSiteSettings = createContext<GeneralSiteSettingsProps | null>(
  null
);

/**
 * Global variable Provider, including language localization, style theme, search terms
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */

export const GeneralSiteSettingsProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [lang, updateLang] = useState<string>(BLOG.LANG); // default language
  const [locale, updateLocale] = useState<any>(generateLocaleDict(BLOG.LANG));
  const [setting, SetSettingState] = useState<boolean>(false);
  const [isDarkMode, updateDarkMode] = useState<boolean>(
    BLOG.APPEARANCE === "dark"
  );

  const [rightSideInfoBarMode, changeRightSideInfoBarMode] = useState<
    "info" | "author"
  >("info");
  const [isMobileTopNavOpen, changeMobileTopNavOpen] = useState<boolean>(false);

  const [isMobileLeftSidebarOpen, changeMobileLeftSidebarOpen] =
    useState<boolean>(false);

  const [onLoading, setOnLoading] = useState<boolean>(false);

  const [tocContent, setTocContent] = useState<TOCItemType[]>([]);
  const [tocVisible, setTOCVisible] = useState<boolean>(true);
  const [pageNavVisible, setPageNavVisible] = useState<boolean>(false);

  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const isFirstRender = useRef(true);

  const toggleMobileLeftSidebarOpen = () => {
    changeMobileLeftSidebarOpen(!isMobileLeftSidebarOpen);
  };

  const toggleMobileTopNavOpen = () => {
    changeMobileTopNavOpen(!isMobileTopNavOpen);
  };

  const handleSetTocContent = (toc: TOCItemType[]) => {
    setTocContent(toc);
  };
  const handleTOCVisible = () => setTOCVisible(!tocVisible);

  const handleLeftNavVisible = () => setPageNavVisible(!pageNavVisible);

  function changeLang(lang) {
    if (lang) {
      saveLangToLocalStorage(lang);
      updateLang(lang);
      updateLocale(generateLocaleDict(lang));
    }
  }

  function changeOppositeLang() {
    const resLang = getFilteredDictionaryListKey(locale.LOCALE);

    if (resLang) {
      saveLangToLocalStorage(resLang);
      updateLang(resLang);
      updateLocale(generateLocaleDict(resLang));
    }
  }
  const handleChangeDarkMode = (newStatus = !isDarkMode) => {
    setThemeByLocalStorage(newStatus);
    updateDarkMode(newStatus);
    const htmlElement = document.getElementsByTagName("html")[0];
    htmlElement.classList?.remove(newStatus ? "light" : "dark");
    htmlElement.classList?.add(newStatus ? "dark" : "light");
  };
  const handleSettings = () => {
    SetSettingState((prev) => !prev);
  };
  const handleChangeRightSideInfoBarMode = (newMode: "info" | "author") => {
    changeRightSideInfoBarMode(newMode);
  };
  const value: GeneralSiteSettingsProps = {
    onLoading,
    setOnLoading,
    searchKeyword,
    setSearchKeyword,
    tocVisible,
    handleTOCVisible,
    pageNavVisible,
    handleLeftNavVisible,
    isDarkMode,
    handleChangeDarkMode,
    locale,
    updateLocale,
    lang,
    changeLang,
    changeOppositeLang,
    setting,
    handleSettings,
    isMobileTopNavOpen,
    toggleMobileTopNavOpen,
    rightSideInfoBarMode,
    handleChangeRightSideInfoBarMode,
    tocContent,
    handleSetTocContent,
    isMobileLeftSidebarOpen,
    toggleMobileLeftSidebarOpen,
  };

  useEffect(() => {
    initDarkMode(updateDarkMode);
    initLocale(lang, locale, updateLang, updateLocale);
    setOnLoading(false);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    initLocale(lang, locale, updateLang, updateLocale);
    setOnLoading(false);
    toast.success(`${locale.SITE.LANG_CHANGE_SUCCESS_MSG} `);
  }, [lang]);

  return (
    <GeneralSiteSettings.Provider value={value}>
      {children}
      <NextNProgress />
    </GeneralSiteSettings.Provider>
  );
};

export const useGeneralSiteSettings = (): GeneralSiteSettingsProps => {
  const context = useContext(GeneralSiteSettings);
  if (!context) {
    throw new Error(
      "useGeneralSiteSettings must be used within a GeneralSiteSettingsProvider"
    );
  }
  return context;
};
