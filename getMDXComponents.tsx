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

const CustomLinkComponent = ({ href, children, ...props }) => {
  // PDF 링크인지 확인
  const isPdfLink = (url: string) => {
    if (!url) return false;
    const cleanUrl = url.toLowerCase().split("?")[0]; // query parameter 제거
    return cleanUrl.endsWith(".pdf") || url.toLowerCase().includes(".pdf");
  };

  const isGoogleDriveLink = (url: string) => {
    if (!url) return false;
    return url.toLowerCase().includes("drive.google.com");
  };

  const isGoogleDrivePdf = isGoogleDriveLink(href);
  const isPdf = isPdfLink(href);
  const isExternal = href?.startsWith("http");

  if (isPdf) {
    return (
      <a
        id="pdf-link"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="pdf-link relative group"
        {...props}
      >
        <icons.FileTextIcon className="w-4 h-4" />
        {children || "PDF 보기"}
      </a>
    );
  } else if (isGoogleDrivePdf) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="google-drive text-sm 
        rounded-md text-neutral-600 
          relative group
          dark:bg-neutral-800  dark:border-neutral-700
          border-neutral-500
          "
        {...props}
      >
        <icons.HardDrive className="w-4 h-4" />
        {children}
      </a>
    );
  }

  // 일반 링크인 경우 기존 CustomLink와 동일하게 처리
  if (isExternal) {
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
    a: CustomLinkComponent, // PDF 링크 자동 감지
    StyledLink,
    ...components,
  };
}
