import { engineeringSource } from "@/lib/source";
import RightSideInfoBar from "@/modules/layout/components/RightSideInfoBar";
import { DocsLayout } from "@/modules/layout/templates/docs-min";
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
  tree: engineeringSource.pageTree,
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
