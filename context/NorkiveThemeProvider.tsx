"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { initDarkMode, setThemeByLocalStorage } from "@/lib/utils/theme";
import { NorKiveThemeProviderContext } from "@/types/provider.model";
import { BLOG } from "@/blog.config";
import {
  generateLocaleDict,
  getFilteredLangListKey,
  initLocale,
  saveLangToLocalStorage,
} from "@/lib/utils/lang";
import { toast } from "sonner";

const NorKiveTheme = createContext<NorKiveThemeProviderContext | null>(null);

/**
 * Global Theme variable Provider
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */

export const NorkiveThemeProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [lang, updateLang] = useState<string>(BLOG.LANG); // default language
  const [locale, updateLocale] = useState<any>(generateLocaleDict(BLOG.LANG)); // default language

  const [isDarkMode, updateDarkMode] = useState<boolean>(
    BLOG.APPEARANCE === "dark"
  );
  const [onLoading, setOnLoading] = useState<boolean>(false);
  const [pageNavVisible, setPageNavVisible] = useState<boolean>(false);

  const [searchKeyword, setSearchKeyword] = useState<string>(""); //
  const changePageNavVisible = () => setPageNavVisible(!pageNavVisible);

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
  const handleChangeDarkMode = (newStatus = !isDarkMode) => {
    setThemeByLocalStorage(newStatus);
    updateDarkMode(newStatus);
    const htmlElement = document.getElementsByTagName("html")[0];
    htmlElement.classList?.remove(newStatus ? "light" : "dark");
    htmlElement.classList?.add(newStatus ? "dark" : "light");
    console.log("localStorage.theme:", localStorage.darkMode);
  };

  const value: NorKiveThemeProviderContext = {
    onLoading,
    setOnLoading,
    searchKeyword,
    setSearchKeyword,
    pageNavVisible,
    changePageNavVisible,
    isDarkMode,
    handleChangeDarkMode,
    locale,
    updateLocale,
    lang,
    changeLang,
    changeOppositeLang,
  };
  useEffect(() => {
    initLocale(lang, locale, updateLang, updateLocale);
  }, []);
  useEffect(() => {
    initDarkMode(updateDarkMode);
    initLocale(lang, locale, updateLang, updateLocale);
  }, [lang]);

  useEffect(() => {}, []);
  return (
    <NorKiveTheme.Provider value={value}>{children}</NorKiveTheme.Provider>
  );
};

export const useNorkiveTheme = (): NorKiveThemeProviderContext => {
  const context = useContext(NorKiveTheme);
  if (!context) {
    throw new Error(
      "useNorkiveTheme must be used within a NorkiveThemeProvider"
    );
  }
  return context;
};
