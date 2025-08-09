import { recordSource } from "@/lib/source";
import { DocsLayout } from "@/modules/layout/templates/docs-layout";
import { DocsLayoutProps } from "fumadocs-ui/layouts/docs";
import RightSideInfoBar from "@/modules/layout/components/RightSideInfoBar";
import { basicDocsClass } from "@/styles/layout.styles";

const baseOptions: Partial<DocsLayoutProps> = {
  nav: {
    title: (
      <>
        {/* <LazyImage
          src={BLOG.AVATAR}
          width={24}
          height={24}
          alt={BLOG.AUTHOR}
          className="mr-2  "
        />
        {BLOG.TITLE} */}
      </>
    ),
  },
  // see https://fumadocs.dev/docs/ui/navigation/links
  links: [],
};
const pageOptions: DocsLayoutProps = {
  ...baseOptions,
  tree: recordSource.pageTree,
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
