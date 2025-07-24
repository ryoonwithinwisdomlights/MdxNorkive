import { DocsLayout } from "@/modules/layout/docs-min";
import { recordOptions } from "@/app/layout.config";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <DocsLayout {...recordOptions}>{children}</DocsLayout>;
}
