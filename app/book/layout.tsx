import { bookSource } from "@/lib/source";
import RightSideNavWrapper from "@/modules/layout/wrapper/RightSideNavWrapper";
import { DocsLayout } from "@/modules/layout/templates/docs-layout";
import { basicDocsClass } from "@/styles/layout.styles";
import { DocsLayoutProps } from "fumadocs-ui/layouts/docs";

const baseOptions: Partial<DocsLayoutProps> = {
  nav: {
    title: <></>,
  },
  links: [],
};
const pageOptions: DocsLayoutProps = {
  ...baseOptions,
  tree: bookSource.pageTree,
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
      sidebar={{ defaultOpenLevel: 0, collapsible: false }}
    >
      <div className={basicDocsClass}>{children}</div>
      <RightSideNavWrapper />
    </DocsLayout>
  );
}
