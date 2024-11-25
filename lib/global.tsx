import { generateLocaleDict, initLocale } from "./lang";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";
import { BLOG } from "@/blog.config";
import { THEMES, initDarkMode } from "@/themes/theme";
import NProgress from "nprogress";
import { getQueryVariable, isBrowser } from "./utils";
import loadGlobalNotionData from "@/app/api/load-globalNotionData";
import { getGlobalData } from "./notion/getNotionData";

interface globalValueInferface {
  children?: React.ReactNode;
  onLoading: boolean;
  setOnLoading: any;
  locale: any;
  updateLocale: any;
  isDarkMode: boolean;
  updateDarkMode: any;
  theme: string;
  setTheme: any;
  switchTheme: any;
  siteInfo: string;
  categoryOptions: any[];
  subTypeOptions: any[];
  tagOptions: any[];
  filteredNavPages: any[];
  setFilteredNavPages: any;
  allNavPagesForGitBook: any[];
  className: string;
  customNav: [];
  customMenu: [];
  allNavPages: [];
}

type globalState = globalValueInferface;
const GlobalContext = createContext<globalState>(undefined);

/**
 * Global variable Provider, including language localization, style theme, search terms
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export async function GlobalContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const from = "index";
  const props = await getGlobalData({ from });
  // const globalValue = await loadGlobalNotionData();
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
  } = props;
  const router = useRouter();
  const [lang, updateLang] = useState(BLOG.LANG); // default language
  const [locale, updateLocale] = useState(generateLocaleDict(BLOG.LANG)); // default language
  const [theme, setTheme] = useState(BLOG.THEME); // Default blog theme
  const [isDarkMode, updateDarkMode] = useState(BLOG.APPEARANCE === "dark"); // Default dark mode
  const [onLoading, setOnLoading] = useState(false); // Fetch article data
  const [filteredNavPages, setFilteredNavPages] = useState(
    allNavPagesForGitBook
  );

  const showTocButton = post?.toc?.length > 1;

  useEffect(() => {
    setFilteredNavPages(allNavPagesForGitBook);
  }, [post]);

  useEffect(() => {
    initLocale(lang, locale, updateLang, updateLocale);
    initDarkMode(updateDarkMode);
    initTheme();
  }, []);

  useEffect(() => {
    const handleStart = (url) => {
      NProgress.start();
      const { theme } = router.query;
      if (theme && !url.includes(`theme=${theme}`)) {
        const newUrl = `${url}${url.includes("?") ? "&" : "?"}theme=${theme}`;
        router.push(newUrl);
      }
      setOnLoading(true);
    };
    const handleStop = () => {
      NProgress.done();
      setOnLoading(false);
    };
    const queryTheme = getQueryVariable("theme") || BLOG.THEME;
    setTheme(queryTheme);
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeError", handleStop);
    router.events.on("routeChangeComplete", handleStop);
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  // switch theme
  function switchTheme() {
    const currentIndex = THEMES.indexOf(theme);
    const newIndex = currentIndex < THEMES.length - 1 ? currentIndex + 1 : 0;
    const newTheme = THEMES[newIndex];
    const query = router.query;
    query.theme = newTheme;
    router.push({ pathname: router.pathname, query });
    return newTheme;
  }

  return (
    <GlobalContext.Provider
      value={{
        onLoading,
        setOnLoading,
        locale,
        updateLocale,
        isDarkMode,
        updateDarkMode,
        theme,
        setTheme,
        switchTheme,
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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

/**
 * Special handling when switching themes
 * @param {*} setTheme
 */
const initTheme = () => {
  if (isBrowser) {
    setTimeout(() => {
      const elements = document.querySelectorAll('[id^="theme-"]');
      if (elements?.length > 1) {
        elements[elements.length - 1].scrollIntoView();
        // Delete the previous elements and keep only the last element
        for (let i = 0; i < elements.length - 1; i++) {
          elements[i].parentNode.removeChild(elements[i]);
        }
      }
    }, 500);
  }
};

export const useGlobal = () => useContext(GlobalContext);
