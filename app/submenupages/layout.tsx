import { submenuPageSource } from "@/lib/source";
import { DocsLayout } from "@/modules/layout/templates/docs-layout";
import { DocsLayoutProps } from "fumadocs-ui/layouts/docs";
import RightSideNavWrapper from "@/modules/layout/wrapper/RightSideNavWrapper";
import { basicDocsClass } from "@/styles/layout.styles";

const baseOptions: Partial<DocsLayoutProps> = {
  nav: {
    title: <></>,
  },
  links: [],
};
const pageOptions: DocsLayoutProps = {
  ...baseOptions,
  tree: submenuPageSource.pageTree,
  nav: {
    ...baseOptions.nav,
    transparentMode: "none",
  },
};
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DocsLayout
      {...pageOptions}
      searchToggle={{ enabled: false }}
      themeSwitch={{ enabled: false }}
      sidebar={{ defaultOpenLevel: 0, collapsible: false, enabled: false }}
    >
      <div className={basicDocsClass}>{children}</div>
      <RightSideNavWrapper />
    </DocsLayout>
  );
}
