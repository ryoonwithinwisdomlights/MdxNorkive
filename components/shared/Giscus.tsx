"use client";
import { useGlobal } from "@/lib/providers/globalProvider";
import { useEffect, useRef } from "react";

/**
 * Giscus Reviews @see https://giscus.app/ko
 * Contribute by @txs
 * @returns {JSX.Element}
 * @constructor
 */
const GiscusComponent = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useGlobal({ from: "index" });
  const theme = isDarkMode ? "dark" : "light";

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;

    const repo = process.env.NEXT_PUBLIC_COMMENT_GISCUS_REPONAME as string;
    const repoId = process.env.NEXT_PUBLIC_COMMENT_GISCUS_REPO_ID as string;
    const category = process.env.NEXT_PUBLIC_COMMENT_GISCUS_CATEGORY as string;
    const categoryId = process.env
      .NEXT_PUBLIC_COMMENT_GISCUS_CATEGORY_ID as string;
    const lang = process.env.NEXT_PUBLIC_COMMENT_GISCUS_LANG as string;
    const pathname = process.env.NEXT_PUBLIC_COMMENT_GISCUS_MAPPING as string;
    // 환경 변수 값이 없으면 return
    if (!repo || !repoId || !category || !categoryId || !lang) {
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
    scriptElem.setAttribute("data-category", category);
    scriptElem.setAttribute("data-category-id", categoryId);
    scriptElem.setAttribute("data-mapping", pathname);
    scriptElem.setAttribute("data-strict", "0");
    scriptElem.setAttribute("data-reactions-enabled", "1");
    scriptElem.setAttribute("data-emit-metadata", "0");
    scriptElem.setAttribute("data-input-position", "bottom");
    scriptElem.setAttribute("data-theme", theme);
    scriptElem.setAttribute("data-lang", lang);
    scriptElem.setAttribute("data-loading", "lazy");
    ref.current.appendChild(scriptElem);
  }, [theme]);

  // https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md#isetconfigmessage
  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>(
      "iframe.giscus-frame"
    );
    iframe?.contentWindow?.postMessage(
      { giscus: { setConfig: { theme } } },
      "https://giscus.app"
    );
  }, [theme]);

  return <section ref={ref} />;
};

export default GiscusComponent;
