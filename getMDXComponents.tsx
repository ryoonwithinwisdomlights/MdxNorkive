import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import * as CalloutComponents from "fumadocs-ui/components/callout";
import * as CodeBlockComponents from "fumadocs-ui/components/codeblock";
import * as FilesComponents from "fumadocs-ui/components/files";
import * as HeadingComponents from "fumadocs-ui/components/heading";
import * as ImageZoomComponents from "fumadocs-ui/components/image-zoom";
import * as InlineTOCComponents from "fumadocs-ui/components/inline-toc";
import * as TabsComponents from "fumadocs-ui/components/tabs";
import { TypeTable } from "fumadocs-ui/components/type-table";
import defaultMdxComponents from "fumadocs-ui/mdx";
import * as icons from "lucide-react";
import type { MDXComponents } from "mdx/types";
import { StyledLink } from "@/components/ui/StyledLink";

// 커스텀 링크 컴포넌트 - 중첩된 <a> 태그 문제 해결
const CustomLink = ({ href, children, ...props }) => {
  // 외부 링크인지 확인
  const isExternal = href?.startsWith("http");

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 underline"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      className="text-blue-600 hover:text-blue-800 underline"
      {...props}
    >
      {children}
    </a>
  );
};

// use this function to get MDX components, you will need it for rendering MDX
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...(icons as unknown as MDXComponents),
    ...defaultMdxComponents,
    ...TabsComponents,
    ...FilesComponents,
    Accordion,
    Accordions,
    ...CalloutComponents,
    ...HeadingComponents,
    TypeTable,
    ...CodeBlockComponents,
    // ...DynamicCodeBlockComponents,
    ...ImageZoomComponents,
    ...InlineTOCComponents,
    // 커스텀 링크 컴포넌트 추가
    a: CustomLink,
    StyledLink,
    ...components,
  };
}
