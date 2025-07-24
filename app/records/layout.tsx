import { recordOptions } from "@/app/layout.config";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <DocsLayout {...recordOptions}>{children}</DocsLayout>;
}
