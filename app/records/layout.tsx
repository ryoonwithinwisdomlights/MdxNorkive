import { recordSource } from "@/lib/source";
import { pageOptionsGenerator } from "@/lib/utils";
import { DocsLayout } from "@/modules/layout/templates/docs-layout";
import RightSideNavWrapper from "@/modules/layout/wrapper/RightSideNavWrapper";
import { basicDocsClass } from "@/styles/layout.styles";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pageOptions = pageOptionsGenerator(recordSource);
  return (
    <DocsLayout
      {...pageOptions}
      searchToggle={{ enabled: false }}
      themeSwitch={{ enabled: false }}
      sidebar={{ defaultOpenLevel: 0, collapsible: false }}
    >
      <div className={basicDocsClass({ className: "" })}>{children}</div>
      <RightSideNavWrapper />
    </DocsLayout>
  );
}
