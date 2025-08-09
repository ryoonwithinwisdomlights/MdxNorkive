import { engineeringSource } from "@/lib/source";
import { LargeSearchToggle } from "@/modules/layout/components/search-toggle";
import { DocsLayout } from "@/modules/layout/templates/docs-layout";
import RightSideNavWrapper from "@/modules/layout/wrapper/RightSideNavWrapper";
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
      searchToggle={{
        enabled: true,
        components: {
          lg: (
            <div className="flex gap-1.5 max-md:hidden">
              <LargeSearchToggle className="flex-1" />
            </div>
          ),
        },
      }}
      themeSwitch={{ enabled: false }}
      sidebar={{ defaultOpenLevel: 0, collapsible: false }}
    >
      <div className={basicDocsClass}>{children}</div>
      <RightSideNavWrapper />
    </DocsLayout>
  );
}
