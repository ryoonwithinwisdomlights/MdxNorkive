import { recordOptions } from "@/app/layout.config";
import LeftSidebar from "@/modules/layout/components/menu/LeftSidebar";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { ReactNode } from "react";
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      {...recordOptions}
      searchToggle={{ enabled: false }}
      themeSwitch={{ enabled: false }}
      sidebar={{ enabled: false, defaultOpenLevel: 0 }}
    >
      {children}
    </DocsLayout>
  );
}
