// "use client";

// import Prism from "prismjs";

// import "prismjs/plugins/toolbar/prism-toolbar";
// import "prismjs/plugins/toolbar/prism-toolbar.min.css";
// import "prismjs/plugins/line-numbers/prism-line-numbers";
// import "prismjs/plugins/line-numbers/prism-line-numbers.css";
// import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard";
// import "prismjs/plugins/show-language/prism-show-language";
// import { useEffect } from "react";

// import { BLOG } from "@/blog.config";
// import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
// import { loadExternalResource } from "@/lib/utils/utils";
// import { useRouter } from "next/navigation";

// const PrismMac = (): JSX.Element => {
//   const router = useRouter();
//   const { isDarkMode } = useGeneralSiteSettings();

//   const prismThemeSwitch = BLOG.PRISM_THEME_SWITCH;
//   const prismThemeDarkPath = BLOG.PRISM_THEME_DARK_PATH;
//   const prismThemeLightPath = BLOG.PRISM_THEME_LIGHT_PATH;
//   const prismThemePrefixPath = BLOG.PRISM_THEME_PREFIX_PATH;
//   useEffect(() => {
//     if (BLOG.CODE_MAC_BAR) {
//       loadExternalResource("/css/prism/prism-mac-style.css", "css");
//     }

//     loadPrismThemeCSS(
//       isDarkMode,
//       prismThemeSwitch,
//       prismThemeDarkPath,
//       prismThemeLightPath,
//       prismThemePrefixPath
//     );

//     loadExternalResource(BLOG.PRISM_JS_AUTO_LOADER, "js").then(() => {
//       if (window?.Prism?.plugins?.autoloader) {
//         window.Prism.plugins.autoloader.languages_path = BLOG.PRISM_JS_PATH;
//       }

//       renderPrismMac();
//       renderMermaid();
//       renderCollapseCode();
//     });
//   }, [router, isDarkMode]);

//   return <></>;
// };

// const loadPrismThemeCSS = (
//   isDarkMode,
//   prismThemeSwitch,
//   prismThemeDarkPath,
//   prismThemeLightPath,
//   prismThemePrefixPath
// ) => {
//   let PRISM_THEME;
//   let PRISM_PREVIOUS;
//   if (prismThemeSwitch) {
//     if (isDarkMode) {
//       PRISM_THEME = prismThemeDarkPath;
//       PRISM_PREVIOUS = prismThemeLightPath;
//     } else {
//       PRISM_THEME = prismThemeLightPath;
//       PRISM_PREVIOUS = prismThemeDarkPath;
//     }
//     const previousTheme = document.querySelector(
//       `link[href="${PRISM_PREVIOUS}"]`
//     );
//     if (
//       previousTheme &&
//       previousTheme.parentNode &&
//       previousTheme.parentNode.contains(previousTheme)
//     ) {
//       previousTheme.parentNode.removeChild(previousTheme);
//     }
//     loadExternalResource(PRISM_THEME, "css");
//   } else {
//     loadExternalResource(prismThemePrefixPath, "css");
//   }
// };
// const renderCollapseCode = (): void => {
//   if (!BLOG.CODE_COLLAPSE) return;

//   const codeBlocks = document.querySelectorAll(".code-toolbar");
//   codeBlocks.forEach((codeBlock) => {
//     if (codeBlock.closest(".collapse-wrapper")) return;

//     const code = codeBlock.querySelector("code");
//     const language = code?.getAttribute("class")?.match(/language-(\w+)/)?.[1];

//     if (!code || !language) return;

//     const collapseWrapper = document.createElement("div");
//     collapseWrapper.className = "collapse-wrapper w-full py-2";

//     const panelWrapper = document.createElement("div");
//     panelWrapper.className =
//       "border dark:border-neutral-600 rounded-md duration-200 transition-colors bg-neutral-50 dark:bg-neutral-800";

//     const header = document.createElement("div");
//     header.className =
//       "flex flex-row text-neutral-400 text-xs rounded-t-[14px] leading-6 font-medium pl-4 pr-2.5 py-1 justify-between ";
//     header.innerHTML = `
//     <div class="flex-none flex items-center gap-1.5  text-neutral-700 dark:text-neutral-300">${language}</div>
//     <div class="flex-1 flex items-center justify-end gap-1.5">

//       <div id="collapse_prismac_code">
//         <svg class="transition-all duration-200 w-5 h-5 transform rotate-0" viewBox="0 0 20 20" fill="currentColor">
//           <path fill-rule="evenodd" d="M6.293 6.293a1 1 0 0 1 1.414 0L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z" clip-rule="evenodd"/>
//         </svg>
//       </div>
//     </div>
//    `;

//     // <div class="z-10 relative">
//     //   <button class="h-[26px] w-[26px] flex items-center justify-center rounded-md backdrop-blur peer group/copy-button" class="copy-to-clipboard-button" type="button" data-copy-state="copy" aria-label="Copy the contents from the code block">
//     //     <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-neutral-400 group-hover/copy-button:text-neutral-500 dark:text-white/40 dark:group-hover/copy-button:text-white/60">
//     //     <path d="M14.25 5.25H7.25C6.14543 5.25 5.25 6.14543 5.25 7.25V14.25C5.25 15.3546 6.14543 16.25 7.25 16.25H14.25C15.3546 16.25 16.25 15.3546 16.25 14.25V7.25C16.25 6.14543 15.3546 5.25 14.25 5.25Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
//     //     <path d="M2.80103 11.998L1.77203 5.07397C1.61003 3.98097 2.36403 2.96397 3.45603 2.80197L10.38 1.77297C11.313 1.63397 12.19 2.16297 12.528 3.00097" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
//     //     </svg>
//     //   </button>
//     //   <div aria-hidden="true" class="absolute top-11 left-1/2 transform whitespace-nowrap -translate-x-1/2 -translate-y-1/2 peer-hover:opacity-100 opacity-0 text-white rounded-lg px-1.5 py-0.5 text-xs bg-neutral-800">
//     //   Copy
//     //   </div>
//     // </div>
//     const panel = document.createElement("div");
//     panel.className = "invisible h-0 transition-transform duration-200 ";

//     panelWrapper.appendChild(header);
//     panelWrapper.appendChild(panel);
//     collapseWrapper.appendChild(panelWrapper);

//     codeBlock.parentNode?.insertBefore(collapseWrapper, codeBlock);
//     panel.appendChild(codeBlock);

//     const collapseCode = () => {
//       panel.classList.toggle("invisible");
//       panel.classList.toggle("h-0");
//       panel.classList.toggle("h-auto");
//       header.querySelector("svg")?.classList.toggle("rotate-180");
//       panelWrapper.classList.toggle("border-neutral-300");
//     };

//     // header.addEventListener("click", collapseCode);
//     const collapseDiv = document.getElementById("collapse_prismac_code")!;
//     collapseDiv.addEventListener("click", collapseCode);
//     if (BLOG.CODE_COLLAPSE_EXPAND_DEFAULT) {
//       collapseDiv.click();
//     }
//   });
// };

// const renderMermaid = async (): Promise<void> => {
//   const observer = new MutationObserver(async (mutationsList) => {
//     for (const m of mutationsList) {
//       if (
//         m.target instanceof HTMLElement &&
//         m.target.className === "notion-code language-mermaid"
//       ) {
//         const chart = m.target.querySelector("code")?.textContent;
//         if (chart && !m.target.querySelector(".mermaid")) {
//           const mermaidChart = document.createElement("div");
//           mermaidChart.className = "mermaid";
//           mermaidChart.innerHTML = chart;
//           m.target.appendChild(mermaidChart);
//         }

//         const mermaidsSvg = document.querySelectorAll(".mermaid");
//         if (mermaidsSvg.length > 0) {
//           let needLoad = false;
//           mermaidsSvg.forEach((e) => {
//             if (e?.firstChild?.nodeName !== "svg") {
//               needLoad = true;
//             }
//           });

//           if (needLoad) {
//             await loadExternalResource(BLOG.MERMAID_CDN, "js");
//             setTimeout(() => {
//               const mermaid = (window as any).mermaid;
//               mermaid?.contentLoaded();
//             }, 100);
//           }
//         }
//       }
//     }
//   });

//   const notionArticle = document.querySelector("#notion-article");
//   if (notionArticle) {
//     observer.observe(notionArticle, {
//       attributes: true,
//       subtree: true,
//     });
//   }
// };

// const renderPrismMac = (): void => {
//   const container = document?.getElementById("notion-article");

//   if (BLOG.CODE_LINE_NUMBERS) {
//     const codeBlocks = container?.getElementsByTagName("pre");
//     Array.from(codeBlocks ?? []).forEach((item) => {
//       if (!item.classList.contains("line-numbers")) {
//         item.classList.add("line-numbers");
//         item.style.whiteSpace = "pre-wrap";
//       }
//     });
//   }

//   try {
//     Prism.highlightAll();
//   } catch (err) {
//     console.error("code rendering", err);
//   }

//   const codeToolBars = container?.getElementsByClassName("code-toolbar");
//   Array.from(codeToolBars ?? []).forEach((item) => {
//     if (item.getElementsByClassName("pre-mac").length === 0) {
//       const preMac = document.createElement("div");
//       preMac.classList.add("pre-mac");
//       preMac.innerHTML = "<span></span><span></span><span></span>";
//       item.appendChild(preMac);
//     }
//   });

//   const justToolBars = container?.getElementsByClassName("toolbar");
//   if (BLOG.CODE_LINE_NUMBERS) {
//     fixCodeLineStyle();
//   }
// };

// const fixCodeLineStyle = (): void => {
//   const observer = new MutationObserver((mutationsList) => {
//     for (const m of mutationsList) {
//       if (m.target instanceof HTMLElement && m.target.nodeName === "DETAILS") {
//         const preCodes = m.target.querySelectorAll("pre.notion-code");
//         preCodes.forEach((preCode) => {
//           Prism.plugins.lineNumbers.resize(preCode);
//         });
//       }
//     }
//   });

//   const notionArticle = document.querySelector("#notion-article");
//   if (notionArticle) {
//     observer.observe(notionArticle, {
//       attributes: true,
//       subtree: true,
//     });
//   }

//   setTimeout(() => {
//     const preCodes = document.querySelectorAll("pre.notion-code");
//     preCodes.forEach((preCode) => {
//       Prism.plugins.lineNumbers.resize(preCode);
//     });
//   }, 10);
// };

// export default PrismMac;
