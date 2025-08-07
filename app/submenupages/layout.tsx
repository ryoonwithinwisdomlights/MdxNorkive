import { submenuPageSource } from "@/lib/source";
import RightSideInfoBar from "@/modules/common/layout/components/RightSideInfoBar";
import { DocsLayout } from "@/modules/common/layout/templates/docs-min";
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
        className="md:w-[60vw] mt-[20px] w-full  flex flex-col  pb-20 md:p-0
      justify-center items-center   "
      >
        {children}
      </div>
      <RightSideInfoBar />
    </DocsLayout>
  );
}
