// import { calculateReadingTime } from "@/lib/utils/utils";
// import React from "react";
// import ReactMarkdown from "react-markdown";
// import { components } from "@/modules/common/components/mdx-component";
// import remarkGfm from "remark-gfm";
// const MarkDownTest = (props) => {
//   const { page, wordCount } = props;
//   return (
//     <div
//       id="main-scroll-container"
//       className="dark:bg-black dark:text-neutral-100 text-neutral-800 md:px-20
//     md:w-[60%] flex flex-col overflow-y-auto h-full  scrollbar-hide overscroll-contain "
//     >
//       <div className="mb-8">
//         <div className="flex items-center gap-4 text-muted-foreground mb-4">
//           <time>{page.publishDate}</time>
//           {page.author && <span>By {page.author}</span>}
//           <span>{calculateReadingTime(wordCount)}</span>
//           <span>{wordCount} words</span>
//         </div>

//         <h1 className="text-4xl font-bold mb-4 text-foreground">
//           {page.title}
//         </h1>
//       </div>

//       <div className="max-w-none">
//         <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
//           {page
//             .content!.replace(/\n/gi, "\n\n")
//             .replace(/\*\*/gi, "@$_%!^")
//             .replace(/@\$_%!\^/gi, "**")
//             .replace(/<\/?u>/gi, "*")}
//         </ReactMarkdown>
//       </div>
//     </div>
//   );
// };

// export default MarkDownTest;
