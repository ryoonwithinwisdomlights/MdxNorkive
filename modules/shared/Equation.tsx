import * as React from "react";
import { getPost } from "@/lib/data/notion/getNotionData";
import Katex from "@/modules/shared/KatexReact";
import { getBlockTitle } from "notion-utils";
import { BLOG } from "@/blog.config";

const katexSettings = {
  throwOnError: false,
  strict: false,
};

/**
 * mathematical formula
 * @param {} param0
 * @returns
 */
export async function Equation({
  block,
  math,
  inline = false,
  className,
  ...rest
}) {
  const recordMap = await getPost(BLOG.NOTION_PAGE_ID);
  math = math || getBlockTitle(block, recordMap?.blockMap);
  if (!math) return null;

  return (
    <span
      role="button"
      tabIndex={0}
      className={`notion-equation ${
        inline ? "notion-equation-inline" : "notion-equation-block"
      }`}
    >
      <Katex math={math} settings={katexSettings} {...rest} />
    </span>
  );
}
