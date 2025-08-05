import { submenuPageSource } from "@/lib/source";
import RightSideInfoBar from "@/modules/layout/components/RightSideInfoBar";
import { DocsLayout } from "@/modules/layout/docs-min";
import { DocsLayoutProps } from "fumadocs-ui/layouts/docs";

const baseOptions: Partial<DocsLayoutProps> = {
  nav: {
    title: <></>,
  },
  links: [],
};
const pageOptions: DocsLayoutProps = {
  ...baseOptions,
  tree: submenuPageSource.pageTree,
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
      sidebar={{ defaultOpenLevel: 0, collapsible: false, enabled: false }}
    >
      <div
        className="md:w-[60vw] w-full  flex flex-col
      justify-center items-center   "
      >
        {children}
      </div>
      <RightSideInfoBar />
    </DocsLayout>
  );
}
