import { BLOG } from "@/blog.config";
import { getRecordBlockMapWithRetry } from "@/lib/data/data";
import Katex from "@/modules/common/components/shared/KatexReact";
import { getBlockTitle } from "notion-utils";

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
  const recordMap = await getRecordBlockMapWithRetry({
    pageId: BLOG.NOTION_DATABASE_ID as string,
    from: "equation",
  });
  if (!recordMap) {
    return null;
  }
  math = math || getBlockTitle(block, recordMap);
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
