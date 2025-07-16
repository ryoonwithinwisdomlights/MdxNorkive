// 1️⃣ 새로운 markdownToHtml 함수 만들기 (shiki 적용)
// lib/utils/markdownToHtml.ts

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeShiki from "@shikijs/rehype"; // 이게 최신 shiki 사용 방식

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeShiki, { theme: "github-dark" }) // 이렇게 쓰는 게 맞아
    .use(rehypeStringify)
    .process(markdown);

  return result.toString();
}
