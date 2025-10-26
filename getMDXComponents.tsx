import React, { lazy } from "react";
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

// import FileWrapper from "@/modules/mdx/FileWrapper";
// import GoogleDriveWrapper from "@/modules/mdx/GoogleDriveWrapper";
// import YoutubeWrapper from "@/modules/mdx/YoutubeWrapper";
// import EmbededWrapper from "@/modules/mdx/EmbededWrapper";
// import BookMarkWrapper from "@/modules/mdx/BookMarkWrapper";
const YoutubeWrapper = lazy(() => import("@/modules/mdx/YoutubeWrapper"));
const EmbededWrapper = lazy(() => import("@/modules/mdx/EmbededWrapper"));
const FileWrapper = lazy(() => import("@/modules/mdx/FileWrapper"));
const GoogleDriveWrapper = lazy(
  () => import("@/modules/mdx/GoogleDriveWrapper")
);
const BookMarkWrapper = lazy(() => import("@/modules/mdx/BookMarkWrapper"));
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
    a: CustomLinkComponent,
    YoutubeWrapper,
    EmbededWrapper,
    FileWrapper,
    GoogleDriveWrapper,
    BookMarkWrapper,
    ...components,
  };
}
