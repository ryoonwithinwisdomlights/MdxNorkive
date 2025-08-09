"use client";

import { cn } from "@/lib/utils/general";
import { RootProps } from "fumadocs-ui/layouts/docs/page";
import { useSidebar } from "fumadocs-ui/provider";
import { TOCProvider } from "../components/toc";

export function PageRoot({ toc, children, ...props }: RootProps) {
  const { collapsed } = useSidebar();

  return (
    <TOCProvider {...toc}>
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
