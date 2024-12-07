"use client";
import { BLOG } from "@/blog.config";
import { generateLocaleDict, initLocale } from "@/lib/lang";
import { initDarkMode } from "@/lib/utils/theme";
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
    allPages,
    allNavPages,
    latestPosts,
  } = initGlobalNotionData;
  // const router = useRouter();
  // const pathname = usePathname();
  /**
   *   // on /dashboard/[team] where pathname is /dashboard/nextjs
  const { team } = useParams() // team === "nextjs"
   */
  // const params = useParams();
  // const searchParams = useSearchParams();
  const [lang, updateLang] = useState<string>(BLOG.LANG); // default language
  const [locale, updateLocale] = useState<string>(
    generateLocaleDict(BLOG.LANG)
  ); // default language
  const [theme, setTheme] = useState<string>(BLOG.THEME); // Default blog theme
  const [isDarkMode, updateDarkMode] = useState<boolean>(
    BLOG.APPEARANCE === "dark"
  ); // Default dark mode
  const [onLoading, setOnLoading] = useState<boolean>(false); // Fetch article data
  const [filteredNavPages, setFilteredNavPages] = useState<AllNavPages[]>(
    allNavPagesForGitBook
  );
  const [currentTime, setCurrentTime] = useState<number>(0);
  const showTocButton = post?.toc?.length > 1;

  useEffect(() => {
    setFilteredNavPages(allNavPagesForGitBook);
  }, [post]);

  useEffect(() => {
    initLocale(lang, locale, updateLang, updateLocale);
    initDarkMode(updateDarkMode);
    const now = Date.now();
    setCurrentTime(now);
  }, []);

  // useEffect(() => {
  //   const handleStart = () => {
  //     const url = `${pathname}?${searchParams}`;
  //     const { theme } = params;
  //     if (theme && !url.includes(`theme=${theme}`)) {
  //       const newUrl = `${url}${url.includes("?") ? "&" : "?"}theme=${theme}`;
  //       router.push(newUrl);
  //     }
  //     setOnLoading(true);
  //   };
  //   const handleStop = () => {
  //     // NProgress.done();
  //     setOnLoading(false);
  //   };
  //   const queryTheme = getQueryVariable("theme") || BLOG.THEME;
  //   setTheme(queryTheme);
  //   // router.events.on("routeChangeStart", handleStart);
  //   // router.events.on("routeChangeError", handleStop);
  //   // router.events.on("routeChangeComplete", handleStop);
  //   return () => {
  //     // router.events.off("routeChangeStart", handleStart);
  //     // router.events.off("routeChangeComplete", handleStop);
  //     // router.events.off("routeChangeError", handleStop);
  //   };
  // }, [router]);

  return (
    <GlobalContext.Provider
      value={{
        onLoading,
        setOnLoading,
        locale,
        updateLocale,
        isDarkMode,
        updateDarkMode,
        notice,
        theme,
        setTheme,
        siteInfo,
        categoryOptions,
        subTypeOptions,
        tagOptions,
        filteredNavPages,
        setFilteredNavPages,
        allPages,
        allNavPagesForGitBook,
        className,
        customNav,
        customMenu,
        allNavPages,
        showTocButton,
        post,
        latestPosts,
        currentTime,
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
// export const useGlobal = ({ from }: GbP):globalValueInferface => useContext(GlobalContext);
//
/**
 * Type error: Property 'allPages' does not exist on type 'globalValueInferface | undefined'.
 * 이렇게 하면, useGlobal을 사용할 때 항상 GlobalContext.Provider 내부에서 호출되어야 함을 보장하며, 컴파일 에러를 방지합니
 */

export const useGlobal = ({ from }: GbP): GlobalValueInferface => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used within a GlobalContext.Provider");
  }
  return context;
};
