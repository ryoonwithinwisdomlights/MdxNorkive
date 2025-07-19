// components/mdx/organisms/MDXContent.tsx

"use client";

import type { ParsedMDX } from "@content-collections/mdx";
import { compileMDX, parseFrontmatter } from "@fumadocs/mdx-remote";
import * as atoms from "@/components/mdx/atoms";
import * as molecules from "@/components/mdx/molecules";
import * as organisms from "@/components/mdx/organisms";
import { cn } from "@/lib/utils/utils";

import type { MDXComponents } from "mdx/types";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    // ...defaultMdxComponents, // for Fumadocs UI
    ...components,
  };
}

export const useMDXComponents = getMDXComponents;

interface MDXContentProps extends ParsedMDX {
  className?: string;
}

/**
 * MDXContent (Organism Level)
 *
 * 1. MDX 코드를 HTML로 컴파일 후 SSR-safe하게 렌더링
 * 2. 아톰/몰큘/오거나이즘 컴포넌트를 mapping하여 스타일링 유지
 * 3. TOC 및 구조화된 데이터 추출된 상태에서 사용 가능
 * 4. rehype-shiki 기반 코드블럭 하이라이팅 및 SEO-safe
 */
export function MDXContent({ Content, className }: MDXContentProps) {
  const MDX = useMDXComponents(Content);

  return (
    <div
      className={cn(
        "mdx prose prose-neutral dark:prose-invert max-w-none w-full",
        className
      )}
    >
      <MDX
        components={{
          ...atoms,
          ...molecules,
          ...organisms,
        }}
      />
    </div>
  );
}
