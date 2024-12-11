"use client";

import { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/plugins/toolbar/prism-toolbar";
import "prismjs/plugins/toolbar/prism-toolbar.min.css";
import "prismjs/plugins/show-language/prism-show-language";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

import { BLOG } from "@/blog.config";
import { loadExternalResource } from "@/lib/utils/utils";
import { useRouter } from "next/navigation";
import { useGlobal } from "@/lib/providers/globalProvider";

const PrismMac = (): JSX.Element => {
  const router = useRouter();
  const { isDarkMode } = useGlobal({ from: "index" });

  useEffect(() => {
    if (BLOG.CODE_MAC_BAR) {
      loadExternalResource("/css/prism-mac-style.css", "css");
    }

    loadPrismThemeCSS(isDarkMode);

    loadExternalResource(BLOG.PRISM_JS_AUTO_LOADER, "js").then(() => {
      if (window?.Prism?.plugins?.autoloader) {
        window.Prism.plugins.autoloader.languages_path = BLOG.PRISM_JS_PATH;
      }

      renderPrismMac();
      renderMermaid();
      renderCollapseCode();
    });
  }, [router, isDarkMode]);

  return <></>;
};

const loadPrismThemeCSS = (isDarkMode: boolean): void => {
  loadExternalResource(BLOG.PRISM_THEME_PREFIX_PATH, "css");
};

const renderCollapseCode = (): void => {
  if (!BLOG.CODE_COLLAPSE) return;

  const codeBlocks = document.querySelectorAll(".code-toolbar");
  codeBlocks.forEach((codeBlock) => {
    if (codeBlock.closest(".collapse-wrapper")) return;

    const code = codeBlock.querySelector("code");
    const language = code?.getAttribute("class")?.match(/language-(\w+)/)?.[1];

    if (!code || !language) return;

    const collapseWrapper = document.createElement("div");
    collapseWrapper.className = "collapse-wrapper w-full py-2";

    const panelWrapper = document.createElement("div");
    panelWrapper.className =
      "border dark:border-neutral-600 rounded-md hover:border-neutral-500 duration-200 transition-colors";

    const header = document.createElement("div");
    header.className =
      "flex justify-between items-center px-4 py-2 cursor-pointer select-none";
    header.innerHTML = `<h3 class="text-lg font-medium">${language}</h3><svg class="transition-all duration-200 w-5 h-5 transform rotate-0" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M6.293 6.293a1 1 0 0 1 1.414 0L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z" clip-rule="evenodd"/></svg>`;

    const panel = document.createElement("div");
    panel.className =
      "invisible h-0 transition-transform duration-200 border-t border-neutral-300";

    panelWrapper.appendChild(header);
    panelWrapper.appendChild(panel);
    collapseWrapper.appendChild(panelWrapper);

    codeBlock.parentNode?.insertBefore(collapseWrapper, codeBlock);
    panel.appendChild(codeBlock);

    const collapseCode = () => {
      panel.classList.toggle("invisible");
      panel.classList.toggle("h-0");
      panel.classList.toggle("h-auto");
      header.querySelector("svg")?.classList.toggle("rotate-180");
      panelWrapper.classList.toggle("border-neutral-300");
    };

    header.addEventListener("click", collapseCode);

    if (BLOG.CODE_COLLAPSE_EXPAND_DEFAULT) {
      header.click();
    }
  });
};

const renderMermaid = async (): Promise<void> => {
  const observer = new MutationObserver(async (mutationsList) => {
    for (const m of mutationsList) {
      if (
        m.target instanceof HTMLElement &&
        m.target.className === "notion-code language-mermaid"
      ) {
        const chart = m.target.querySelector("code")?.textContent;
        if (chart && !m.target.querySelector(".mermaid")) {
          const mermaidChart = document.createElement("div");
          mermaidChart.className = "mermaid";
          mermaidChart.innerHTML = chart;
          m.target.appendChild(mermaidChart);
        }

        const mermaidsSvg = document.querySelectorAll(".mermaid");
        if (mermaidsSvg.length > 0) {
          let needLoad = false;
          mermaidsSvg.forEach((e) => {
            if (e?.firstChild?.nodeName !== "svg") {
              needLoad = true;
            }
          });

          if (needLoad) {
            await loadExternalResource(BLOG.MERMAID_CDN, "js");
            setTimeout(() => {
              const mermaid = (window as any).mermaid;
              mermaid?.contentLoaded();
            }, 100);
          }
        }
      }
    }
  });

  const notionArticle = document.querySelector("#notion-article");
  if (notionArticle) {
    observer.observe(notionArticle, {
      attributes: true,
      subtree: true,
    });
  }
};

const renderPrismMac = (): void => {
  const container = document?.getElementById("notion-article");

  if (BLOG.CODE_LINE_NUMBERS) {
    const codeBlocks = container?.getElementsByTagName("pre");
    Array.from(codeBlocks ?? []).forEach((item) => {
      if (!item.classList.contains("line-numbers")) {
        item.classList.add("line-numbers");
        item.style.whiteSpace = "pre-wrap";
      }
    });
  }

  try {
    Prism.highlightAll();
  } catch (err) {
    console.error("code rendering", err);
  }

  const codeToolBars = container?.getElementsByClassName("code-toolbar");
  Array.from(codeToolBars ?? []).forEach((item) => {
    if (item.getElementsByClassName("pre-mac").length === 0) {
      const preMac = document.createElement("div");
      preMac.classList.add("pre-mac");
      preMac.innerHTML = "<span></span><span></span><span></span>";
      item.appendChild(preMac);
    }
  });

  if (BLOG.CODE_LINE_NUMBERS) {
    fixCodeLineStyle();
  }
};

const fixCodeLineStyle = (): void => {
  const observer = new MutationObserver((mutationsList) => {
    for (const m of mutationsList) {
      if (m.target instanceof HTMLElement && m.target.nodeName === "DETAILS") {
        const preCodes = m.target.querySelectorAll("pre.notion-code");
        preCodes.forEach((preCode) => {
          Prism.plugins.lineNumbers.resize(preCode);
        });
      }
    }
  });

  const notionArticle = document.querySelector("#notion-article");
  if (notionArticle) {
    observer.observe(notionArticle, {
      attributes: true,
      subtree: true,
    });
  }

  setTimeout(() => {
    const preCodes = document.querySelectorAll("pre.notion-code");
    preCodes.forEach((preCode) => {
      Prism.plugins.lineNumbers.resize(preCode);
    });
  }, 10);
};

export default PrismMac;
