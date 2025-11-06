import React, { lazy, Suspense } from "react";
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

const YoutubeWrapperLazy = lazy(() =>
  import("@norkive/mdx-ui").then((module) => ({
    default: module.YoutubeWrapper,
  }))
);

const EmbededWrapperLazy = lazy(() =>
  import("@norkive/mdx-ui").then((module) => ({
    default: module.EmbededWrapper,
  }))
);
const FileWrapperLazy = lazy(() =>
  import("@norkive/mdx-ui").then((module) => ({ default: module.FileWrapper }))
);
const GoogleDriveWrapperLazy = lazy(() =>
  import("@norkive/mdx-ui").then((module) => ({
    default: module.GoogleDriveWrapper,
  }))
);
const BookMarkWrapperLazy = lazy(() =>
  import("@norkive/mdx-ui").then((module) => ({
    default: module.BookMarkWrapper,
  }))
);

const EmbededWrapper = (props: any) => (
  <Suspense fallback={<div>Loading...</div>}>
    <EmbededWrapperLazy {...props} />
  </Suspense>
);
// Wrapper components that handle Suspense for lazy-loaded components
const YoutubeWrapper = (props: any) => (
  <Suspense fallback={<div>Loading...</div>}>
    <YoutubeWrapperLazy {...props} />
  </Suspense>
);

const FileWrapper = (props: any) => (
  <Suspense fallback={<div>Loading...</div>}>
    <FileWrapperLazy {...props} />
  </Suspense>
);

const GoogleDriveWrapper = (props: any) => (
  <Suspense fallback={<div>Loading...</div>}>
    <GoogleDriveWrapperLazy {...props} />
  </Suspense>
);

const BookMarkWrapper = (props: any) => (
  <Suspense fallback={<div>Loading...</div>}>
    <BookMarkWrapperLazy {...props} />
  </Suspense>
);
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
    Accordion: (props: any) => <Accordion {...props} />,
    Accordions: (props: any) => <Accordions {...props} />,
    ...CalloutComponents,
    ...HeadingComponents,
    TypeTable,
    ...CodeBlockComponents,
    ...ImageZoomComponents,
    ...InlineTOCComponents,
    a: CustomLinkComponent,
    YoutubeWrapper,
    EmbededWrapper,
    FileWrapper,
    GoogleDriveWrapper,
    BookMarkWrapper,
    ...components,
  } as MDXComponents;
}
