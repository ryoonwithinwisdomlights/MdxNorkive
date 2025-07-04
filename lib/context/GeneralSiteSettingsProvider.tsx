"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";
import { BLOG } from "@/blog.config";
import {
  LeftSideBarNavItem,
  GeneralSiteSettingsProviderContext,
} from "@/types";

import { initDarkMode, setThemeByLocalStorage } from "@/lib/utils/theme";
import {
  generateLocaleDict,
  getFilteredDictionaryListKey,
  initLocale,
  saveLangToLocalStorage,
} from "@/lib/utils/lang";
import { toast } from "sonner";

const GeneralSiteSettings =
  createContext<GeneralSiteSettingsProviderContext | null>(null);

/**
 * Global Theme variable Provider
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */

export const GeneralSiteSettingsProvider: React.FC<{
  children: ReactNode;
  allNavPagesForLeftSideBar: LeftSideBarNavItem[];
}> = ({ children, allNavPagesForLeftSideBar }) => {
  const [lang, updateLang] = useState<string>(BLOG.LANG); // default language
  const [locale, updateLocale] = useState<any>(generateLocaleDict(BLOG.LANG)); // 로케일은 사용자 인터페이스에서 사용되는 언어, 지역 설정, 출력 형식 등을 정의하는 문자열
  const [setting, SetSettingState] = useState<boolean>(false);
  const [isDarkMode, updateDarkMode] = useState<boolean>(
    BLOG.APPEARANCE === "dark"
  );
  const [onLoading, setOnLoading] = useState<boolean>(false);

  const [tocVisible, setTOCVisible] = useState<boolean>(false);
  const [pageNavVisible, setPageNavVisible] = useState<boolean>(false);

  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [filteredNavPages, setFilteredNavPages] = useState<
    LeftSideBarNavItem[]
  >(allNavPagesForLeftSideBar);

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
      toast.success(`Language set to be ${resLang} `);
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
  const value: GeneralSiteSettingsProviderContext = {
    onLoading,
    setOnLoading,
    searchKeyword,
    setSearchKeyword,
    filteredNavPages,
    setFilteredNavPages,
    allNavPagesForLeftSideBar,
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
  };

  useEffect(() => {
    initDarkMode(updateDarkMode);
    initLocale(lang, locale, updateLang, updateLocale);
    setOnLoading(false);
  }, []);

  useEffect(() => {
    initLocale(lang, locale, updateLang, updateLocale);
    setOnLoading(false);
    toast.success(`${locale.SITE.LANG_CHANGE_SUCCESS_MSG} `);
  }, [lang]);

  return (
    <GeneralSiteSettings.Provider value={value}>
      {children}
    </GeneralSiteSettings.Provider>
  );
};

export const useGeneralSiteSettings =
  (): GeneralSiteSettingsProviderContext => {
    const context = useContext(GeneralSiteSettings);
    if (!context) {
      throw new Error(
        "useGeneralSiteSettings must be used within a GeneralSiteSettingsProvider"
      );
    }
    return context;
  };
