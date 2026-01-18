"use client";

import { cn } from "@/lib/utils/general";
import type { TOCItemType } from "@/types";
import { useSidebar } from "fumadocs-ui/provider";
import { TOCProvider } from "../components/toc";
import type { ComponentProps, ReactNode } from "react";

type PageRootProps = Omit<ComponentProps<"div">, "children"> & {
  toc?:
    | {
        toc?: TOCItemType[];
        single?: boolean;
      }
    | false;
  children?: ReactNode;
};

export function PageRoot({ toc, children, ...props }: PageRootProps) {
  let collapsed = false;
  try {
    collapsed = useSidebar().collapsed;
  } catch {
    // When rendered outside <DocsLayout />, fallback to non-collapsed layout.
  }
  const anchorProps = typeof toc === "object" && toc !== null ? toc : undefined;

  return (
    <TOCProvider
      {...anchorProps}
      toc={(anchorProps?.toc ?? []) as TOCItemType[]}
      single={anchorProps?.single}
    >
      <div
        id="nd-page"
        {...props}
        className={cn("flex flex-1 mx-auto w-full", props.className)}
        style={{
          maxWidth: collapsed
            ? "var(--fd-page-width)"
            : "min(var(--fd-page-width),calc(var(--fd-layout-width) - var(--fd-sidebar-width)))",
          ...props.style,
        }}
      >
        {children}
      </div>
    </TOCProvider>
  );
}
