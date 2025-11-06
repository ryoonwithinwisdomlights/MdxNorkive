// "use client";
// import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
// import Catalog from "@/modules/common/toc/Catalog";
// import { XIcon } from "lucide-react";
// import { useEffect } from "react";
// import { useMediaQuery } from "usehooks-ts";

// /**
//  * Floating drawer catalog
//  * @param toc
//  * @param post
//  * @returns {JSX.Element}
//  * @constructor
//  */
// const TableOfContentsDrawerMobile = ({ page }: { page: any }) => {
//   const { locale, handleTOCVisible, tocVisible } = useGeneralSiteSettings();
//   const isMobile = useMediaQuery("(max-width: 768px");
//   // const [tocOn, setTocOn] = useState<boolean>(false);

//   useEffect(() => {
//     const tocAble = page?.tableOfContents?.length > 0;
//     if (!tocAble) {
//       handleTOCVisible();
//     }
//   }, []);

//   return (
//     page?.tableOfContents?.length > 0 &&
//     isMobile && (
//       <>
//         <div id="toc-float" className={"md:hidden fixed top-0 right-0  "}>
//           <div
//             className={
//               (tocVisible
//                 ? "animate__slideInRight "
//                 : " -mr-72 animate__slideOutRight") +
//               " overflow-y-hidden shadow-card w-60 duration-200 h-2/5 fixed right-1 bottom-24 rounded py-2 bg-white dark:bg-neutral-700"
//             }
//           >
//             <div
//               onClick={handleTOCVisible}
//               className="px-4 pb-2 flex justify-between items-center border-b font-bold"
//             >
//               <span>{locale.DOCS.TABLE_OF_CONTENTS}</span>
//               <XIcon className="p-1 cursor-pointer" />
//             </div>
//             <div className="dark:text-neutral-400 text-neutral-600 px-3">
//               <Catalog page={page} />
//             </div>
//           </div>
//         </div>
//         <div
//           id="right-drawer-background"
//           className={
//             (tocVisible ? "block" : "hidden") +
//             " fixed top-0 left-0 z-40 w-full h-full "
//           }
//           onClick={handleTOCVisible}
//         />
//       </>
//     )
//   );
// };
// export default TableOfContentsDrawerMobile;
