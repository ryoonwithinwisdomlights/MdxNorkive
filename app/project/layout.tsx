import { projectSource } from "@/lib/source";
import { DocsLayout } from "@/modules/layout/templates/docs-layout";
import RightSideInfoBar from "@/modules/layout/components/RightSideInfoBar";
import { DocsLayoutProps } from "fumadocs-ui/layouts/docs";
import { basicDocsClass } from "@/styles/layout.styles";

const baseOptions: Partial<DocsLayoutProps> = {
  nav: {
    title: <></>,
  },
  links: [],
};
const pageOptions: DocsLayoutProps = {
  ...baseOptions,
  tree: projectSource.pageTree,
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
      <RightSideInfoBar />
    </DocsLayout>
  );
}
