import { generalsSource } from "@/lib/source";
import { pageOptionsGenerator } from "@/lib/utils";
import { DocsLayout } from "@/modules/layout/templates/docs-layout";
import RightSideNavWrapper from "@/modules/layout/wrapper/RightSideNavWrapper";
import { basicDocsClass } from "@/lib/styles/card.styles";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pageOptions = pageOptionsGenerator(generalsSource);
  const sidebarTabs = [
    {
      title: "Components",
      description: "Hello World!",
      // active for `/docs/components` and sub routes like `/docs/components/button`
      url: "/docs/components",
      // optionally, you can specify a set of urls which activates the item
      // urls: new Set(['/docs/test', '/docs/components']),
    },
    {
      title: "Components2",
      description: "Hello World!",
      // active for `/docs/components` and sub routes like `/docs/components/button`
      url: "/docs/components",
      // optionally, you can specify a set of urls which activates the item
      // urls: new Set(['/docs/test', '/docs/components']),
    },
  ];
  return (
    <DocsLayout
      {...pageOptions}
      searchToggle={{ enabled: false }}
      themeSwitch={{ enabled: false }}
      sidebar={{
        enabled: true,
        tabs: sidebarTabs,
        collapsible: false,
        // banner: <div>Hello World</div>,
      }}
    >
      <div className={basicDocsClass({ className: "" })}>{children}</div>
      <RightSideNavWrapper />
    </DocsLayout>
  );
}
