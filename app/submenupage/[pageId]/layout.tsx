import { DocsLayout } from "@/modules/layout/docs-min";
import { DocsLayoutProps } from "fumadocs-ui/layouts/docs";
// import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { submenuPageSource } from "@/lib/source";
import { ReactNode } from "react";

const baseOptions: Partial<DocsLayoutProps> = {
  nav: {
    // title: (
    //   <>
    //     <svg
    //       width="24"
    //       height="24"
    //       xmlns="http://www.w3.org/2000/svg"
    //       aria-label="Logo"
    //     >
    //       <circle cx={12} cy={12} r={12} fill="currentColor" />
    //     </svg>
    //     My App
    //   </>
    // ),
  },
  // see https://fumadocs.dev/docs/ui/navigation/links
  links: [],
};
export const submenuPageOptions: DocsLayoutProps = {
  ...baseOptions,
  tree: submenuPageSource.pageTree,
  nav: {
    ...baseOptions.nav,
    transparentMode: "none",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      {...submenuPageOptions}
      searchToggle={{ enabled: false }}
      themeSwitch={{ enabled: false }}
      sidebar={{ enabled: false }}
    >
      {children}
    </DocsLayout>
  );
}
