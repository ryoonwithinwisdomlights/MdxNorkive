import React from "react";
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

import PdfWrapper from "./components/ui/PdfWrapper";
import GoogleDriveWrapper from "./components/ui/GoogleDriveWrapper";
import YoutubeWrapper from "./components/ui/YoutubeWrapper";
import EmbededWrapper from "./components/ui/EmbededWrapper";
import BookMarkWrapper from "./components/ui/BookMarkWrapper";

// 일반 링크를 위한 컴포넌트 (PDF, Google Drive, 외부 링크)
const CustomLinkComponent = ({
  href,
  children,
  ...props
}: {
  href?: string;
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200 underline"
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
    ...ImageZoomComponents,
    ...InlineTOCComponents,
    // 커스텀 링크 컴포넌트 추가 - a 태그를 오버라이드
    a: CustomLinkComponent, // PDF, Google Drive 링크 자동 감지
    YoutubeWrapper,
    EmbededWrapper,
    PdfWrapper,
    GoogleDriveWrapper,
    BookMarkWrapper,
    ...components,
  };
}
