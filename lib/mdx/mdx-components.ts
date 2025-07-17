// // lib/mdx/mdx-components.ts
// import { cn } from "@/lib/utils/utils";
// import type { MDXComponents } from "mdx/types";

// // 향후 atom 형태로 나눌 예정
// export const mdxComponents: MDXComponents = {
//   h1: (props) =>     <h1 {...props} className={cn('mt-8 text-3xl font-bold', props.className)}>
//       {props.children}
//     </h1>,
//   h2: (props) => <h2 className="mt-6 text-2xl font-semibold" {...props} />,
//   h3: (props) => <h3 className="mt-4 text-xl font-medium" {...props} />,
//   p: (props) => <p className="my-4 leading-7 text-muted-foreground" {...props} />,
//   a: (props) => (
//     <a
//       className="text-blue-500 underline underline-offset-2 hover:text-blue-700 transition"
//       {...props}
//     />
//   ),
//   ul: (props) => <ul className="list-disc list-inside my-4" {...props} />,
//   ol: (props) => <ol className="list-decimal list-inside my-4" {...props} />,
//   blockquote: (props) => (
//     <blockquote className="border-l-4 border-gray-300 pl-4 italic text-muted-foreground" {...props} />
//   ),
//   code: (props) => (
//     <code className="px-1 py-0.5 rounded bg-muted text-sm font-mono" {...props} />
//   ),
// };
