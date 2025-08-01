import { recordOptions } from "@/app/layout.config";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { ReactNode } from "react";
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      {...recordOptions}
      searchToggle={{ enabled: false }}
      themeSwitch={{ enabled: false }}
      sidebar={{ enabled: false }}
    >
      {children}
    </DocsLayout>
  );
}
