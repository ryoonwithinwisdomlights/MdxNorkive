"use client";
import { useNorkiveTheme } from "@/context/NorkiveThemeProvider";
import { useEffect, useRef } from "react";

/**
 * Giscus Reviews @see https://giscus.app/ko
 * Contribute by @txs
 * @returns {JSX.Element}
 * @constructor
 */
const GiscusComponent = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { isDarkMode, lang, locale } = useNorkiveTheme();
  const theme = isDarkMode ? "dark" : "light";
  const giscusLang = lang === "kr-KR" ? "ko" : "en";
  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;

    const repo = process.env.NEXT_PUBLIC_comment_giscus_reponame as string;
    const repoId = process.env.NEXT_PUBLIC_comment_giscus_repo_id as string;
    const category = process.env
      .NEXT_PUBLIC_comment_giscus_category_id as string;
    const categoryId = process.env
      .NEXT_PUBLIC_comment_giscus_category_id_ID as string;

    const mapping = process.env.NEXT_PUBLIC_comment_giscus_mapping as string;
    // 환경 변수 값이 없으면 return
    if (!repo || !repoId || !category || !categoryId || !giscusLang) {
      console.log("Giscus not found");
      return;
    } else {
      console.log(
        `repo::${repo}, repoId:${repoId}, category: ${category}, categoryId:${categoryId}`
      );
    }

    const scriptElem = document.createElement("script");

    scriptElem.src = "https://giscus.app/client.js";
    scriptElem.async = true;
    scriptElem.crossOrigin = "anonymous";

    scriptElem.setAttribute("data-repo", repo);
    scriptElem.setAttribute("data-repo-id", repoId);
    // scriptElem.setAttribute("data-category", category);
    scriptElem.setAttribute("data-category-id", categoryId);
    scriptElem.setAttribute("data-mapping", mapping);
    scriptElem.setAttribute("data-strict", "0");
    scriptElem.setAttribute("data-reactions-enabled", "1");
    scriptElem.setAttribute("data-emit-metadata", "0");
    scriptElem.setAttribute("data-input-position", "bottom");
    scriptElem.setAttribute("data-theme", theme);
    scriptElem.setAttribute("data-lang", giscusLang);
    scriptElem.setAttribute("data-loading", "lazy");
    ref.current.appendChild(scriptElem);
  }, [theme, locale]);

  // https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md#isetconfigmessage
  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>(
      "iframe.giscus-frame"
    );
    iframe?.contentWindow?.postMessage(
      { giscus: { setConfig: { theme } } },
      "https://giscus.app"
    );
  }, [theme, locale]);

  return <section ref={ref} />;
};

export default GiscusComponent;
