import { engineeringSource } from "@/lib/source";
import { pageOptionsGenerator } from "@/lib/utils";
import { LargeSearchToggle } from "@/modules/layout/components/search-toggle";
import { DocsLayout } from "@/modules/layout/templates/docs-layout";
import RightSideNavWrapper from "@/modules/layout/wrapper/RightSideNavWrapper";
import { basicDocsClass } from "@/lib/styles/card.styles";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pageOptions = pageOptionsGenerator(engineeringSource);
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
      <div className={basicDocsClass({ className: "" })}>{children}</div>
      <RightSideNavWrapper />
    </DocsLayout>
  );
}
