// "use client";

// import { throttle } from "lodash-es";

// import { useCallback, useEffect, useState } from "react";

// import { uuidToId } from "@/lib/utils/general";
// /**
//  * @param toc
//  * @returns {JSX.Element}
//  * @constructor
//  */
// const Catalog = ({ page }: { page: any }) => {
//   const toc = page?.tableOfContents;

//   if (toc.length < 1) {
//     return null;
//   }

//   // Synchronize selected directory events
//   const [activeSection, setActiveSection] = useState<string | null>(null);

//   // listen for scroll events
//   useEffect(() => {
//     window.addEventListener("scroll", actionSectionScrollSpy);
//     actionSectionScrollSpy();
//     return () => {
//       window.removeEventListener("scroll", actionSectionScrollSpy);
//     };
//   }, [page]);

//   const throttleMs = 200;
//   const actionSectionScrollSpy = useCallback(
//     throttle(() => {
//       const sections = document.getElementsByClassName("notion-h");
//       let prevBBox;
//       let currentSectionId;
//       for (let i = 0; i < sections.length; ++i) {
//         const section = sections[i];
//         if (!section || !(section instanceof Element)) continue;
//         if (!currentSectionId) {
//           currentSectionId = section.getAttribute("data-id");
//         }
//         const bbox = section.getBoundingClientRect();
//         const prevHeight = prevBBox ? bbox.top - prevBBox.bottom : 0;
//         const offset = Math.max(150, prevHeight / 4);
//         // GetBoundingClientRect returns values relative to viewport
//         if (bbox.top - offset < 0) {
//           currentSectionId = section.getAttribute("data-id");
//           prevBBox = bbox;
//           continue;
//         }
//         // No need to continue loop, if last element has been detected
//         break;
//       }
//       setActiveSection(currentSectionId ?? null);
//       const tocIds =
//         page?.tableOfContents?.map((t: any) => uuidToId(t.id)) || [];
//       const index = tocIds.indexOf(currentSectionId) || 0;
//       if (tocIds?.length > 0) {
//         for (const tocWrapper of document?.getElementsByClassName(
//           "toc-wrapper-mobile"
//         )) {
//           tocWrapper?.scrollTo({ top: 28 * index, behavior: "smooth" });
//         }
//       }
//     }, throttleMs),
//     [page]
//   );

//   return (
//     <div
//       id="toc-wrapper-mobile"
//       className="toc-wrapper-mobile overflow-y-auto my-2 max-h-80 overscroll-none scroll-hidden"
//     >
//       <nav className="h-full  ">
//         {toc.map((tocItem: any) => {
//           const id = uuidToId(tocItem.id);
//           return (
//             <a
//               key={id}
//               href={`#${id}`}
//               className={`notion-table-of-contents-item duration-300 transform font-light dark:text-neutral-300
//               notion-table-of-contents-item-indent-level-${tocItem.indentLevel} catalog-item `}
//             >
//               <span
//                 style={{
//                   display: "inline-block",
//                   marginLeft: tocItem.indentLevel * 16,
//                 }}
//                 className={`truncate ${
//                   activeSection === id
//                     ? " text-neutral-800 dark:text-white underline"
//                     : "text-neutral-500 dark:text-neutral-200"
//                 }`}
//               >
//                 {tocItem.text}
//               </span>
//             </a>
//           );
//         })}
//       </nav>
//     </div>
//   );
// };

// export default Catalog;
