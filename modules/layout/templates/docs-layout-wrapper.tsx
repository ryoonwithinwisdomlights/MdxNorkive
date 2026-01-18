import { basicDocsClass } from "@/lib/styles/card.styles";
import DocFooter from "@/modules/layout/components/doc-footer";
import RightSideNavWrapper from "@/modules/layout/wrapper/RightSideNavWrapper";
import type { Root } from "fumadocs-core/page-tree";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ComponentType, ReactNode } from "react";

// TS can misclassify fumadocs components as invalid JSX element types when multiple React type versions exist.
// Casting keeps runtime behavior identical while fixing editor/typecheck errors.
const FumaDocsLayout = DocsLayout as unknown as ComponentType<any>;

const DocsLayoutWrapper = ({
  children,
  source,
}: {
  children: ReactNode;
  source: { getPageTree: () => Root };
}) => {
  const sidebarTabs = [
    {
      root: true,
      title: "Components",
      description: "Hello World!",
      // active for `/docs/components` and sub routes like `/docs/components/button`
      url: "/docs/components",
      icon: "Terminal",
      // optionally, you can specify a set of urls which activates the item
      // urls: new Set(['/docs/test', '/docs/components']),
    },
    {
      root: true,
      title: "Components2",
      description: "Hello World!",
      // active for `/docs/components` and sub routes like `/docs/components/button`
      url: "/docs/components",
      icon: "Terminal",
      // optionally, you can specify a set of urls which activates the item
      // urls: new Set(['/docs/test', '/docs/components']),
    },
  ];
  return (
    <FumaDocsLayout
      tree={source.getPageTree() as Root}
      searchToggle={{ enabled: false }}
      themeSwitch={{ enabled: false }}
      i18n={false}
      tabMode="auto"
      containerProps={{
        className:
          " md:[--fd-sidebar-width:300px] lg:[--fd-sidebar-width:300px]  xl:[--fd-toc-width:300px] h-full pt-0 mt-0",
      }}
      sidebar={{
        enabled: true,
        // fumadocs 15 SidebarOptions includes these optional props in runtime,
        // but some TS setups expect them explicitly.
        defaultOpenLevel: 2,
        prefetch: false,
        tabs: sidebarTabs,
        collapsible: false,
        footer: <DocFooter />,
        className: "mt-[46px]",
      }}
    >
      <div className={basicDocsClass({ className: "" })}>{children}</div>
      <RightSideNavWrapper />
    </FumaDocsLayout>
  );
};

export default DocsLayoutWrapper;
