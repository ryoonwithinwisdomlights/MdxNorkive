import { engineeringSource } from "@/lib/source";
import { LargeSearchToggle } from "@/modules/layout/components/layout/search-toggle";
import RightSideInfoBar from "@/modules/layout/components/RightSideInfoBar";
import { DocsLayout } from "@/modules/layout/templates/docs-layout";
import { basicDocsClass } from "@/styles/layout.styles";
import { DocsLayoutProps } from "fumadocs-ui/layouts/docs";
import { Sparkles } from "lucide-react";

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
      <RightSideInfoBar />
    </DocsLayout>
  );
}
