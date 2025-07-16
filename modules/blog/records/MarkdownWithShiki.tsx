// ✅ MarkdownWithShiki.tsx — 최종 버전 (수식, TOC, lazy 이미지 처리까지 포함)

import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkToc from "remark-toc";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import rehypeShiki from "@shikijs/rehype";
import rehypeImgSize from "rehype-img-size";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import * as jsxRuntime from "react/jsx-runtime";
import type { Root } from "hast";
import type { VFile } from "vfile";
import "katex/dist/katex.min.css";

interface MarkdownProps {
  children: string | VFile;
  theme?: string;
  components?: Record<string, React.ElementType>;
}

export async function MarkdownWithShiki({
  children,
  theme = "github-dark",
  components = {},
}: MarkdownProps) {
  const file = await remark()
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkToc, { heading: "목차", maxDepth: 3 })
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeKatex)
    .use(rehypeRaw)
    .use(rehypeImgSize, { dir: ".public" })
    .use(rehypeShiki, { theme })
    .process(children);

  const result = toJsxRuntime(file.result as Root, {
    components: {
      img: (props) => (
        <img
          loading="lazy"
          decoding="async"
          {...props}
          className="rounded-lg my-4"
        />
      ),
      ...components,
    },
    ...jsxRuntime,
  });

  return result;
}
