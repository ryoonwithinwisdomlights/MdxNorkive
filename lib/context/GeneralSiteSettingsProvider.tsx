"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
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
  >("author");
  const [isMobileTopNavOpen, changeMobileTopNavOpen] = useState<boolean>(false);

  const [isMobileLeftSidebarOpen, changeMobileLeftSidebarOpen] =
    useState<boolean>(false);

  const [onLoading, setOnLoading] = useState<boolean>(false);

  const [tocContent, setTocContent] = useState<TOCItemType[]>([]);
  const [tocVisible, setTOCVisible] = useState<boolean>(true);
  const [pageNavVisible, setPageNavVisible] = useState<boolean>(false);

  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const isFirstRender = useRef(true);

  // 모든 함수들을 useCallback으로 최적화
  const toggleMobileLeftSidebarOpen = useCallback(() => {
    changeMobileLeftSidebarOpen((prev) => !prev);
  }, []);

  const toggleMobileTopNavOpen = useCallback(() => {
    changeMobileTopNavOpen((prev) => !prev);
  }, []);

  const handleSetTocContent = useCallback((toc: TOCItemType[]) => {
    setTocContent(toc);
  }, []);

  const handleTOCVisible = useCallback(() => {
    setTOCVisible((prev) => !prev);
  }, []);

  const handleLeftNavVisible = useCallback(() => {
    setPageNavVisible((prev) => !prev);
  }, []);

  const changeLang = useCallback((lang) => {
    if (lang) {
      saveLangToLocalStorage(lang);
      updateLang(lang);
      updateLocale(generateLocaleDict(lang));
    }
  }, []);

  const changeOppositeLang = useCallback(() => {
    const resLang = getFilteredDictionaryListKey(locale.LOCALE);

    if (resLang) {
      saveLangToLocalStorage(resLang);
      updateLang(resLang);
      updateLocale(generateLocaleDict(resLang));
    }
  }, [locale.LOCALE]);

  const handleChangeDarkMode = useCallback(
    (newStatus = !isDarkMode) => {
      setThemeByLocalStorage(newStatus);
      updateDarkMode(newStatus);
      const htmlElement = document.getElementsByTagName("html")[0];
      htmlElement.classList?.remove(newStatus ? "light" : "dark");
      htmlElement.classList?.add(newStatus ? "dark" : "light");
    },
    [isDarkMode]
  );

  const handleSettings = useCallback(() => {
    SetSettingState((prev) => !prev);
  }, []);

  const handleChangeRightSideInfoBarMode = useCallback(
    (newMode: "info" | "author") => {
      changeRightSideInfoBarMode(newMode);
    },
    []
  );

  // value 객체를 useMemo로 최적화하여 불필요한 리렌더링 방지
  const value: GeneralSiteSettingsProps = useMemo(
    () => ({
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
    }),
    [
      onLoading,
      searchKeyword,
      tocVisible,
      pageNavVisible,
      isDarkMode,
      locale,
      lang,
      setting,
      isMobileTopNavOpen,
      rightSideInfoBarMode,
      tocContent,
      isMobileLeftSidebarOpen,
      // 함수들은 useCallback으로 이미 최적화되어 있어서 의존성 배열에 포함하지 않음
    ]
  );

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
  }, [lang, locale]);

  return (
    <GeneralSiteSettings.Provider value={value}>
      {children}
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
