import { recordSource } from "@/lib/source";
import { DocsLayout } from "@/modules/layout/templates/docs-min";
import { DocsLayoutProps } from "fumadocs-ui/layouts/docs";
import RightSideInfoBar from "@/modules/layout/components/RightSideInfoBar";

const baseOptions: Partial<DocsLayoutProps> = {
  nav: {
    title: <></>,
  },
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
      <div
        className="md:w-[60vw] mt-[20px] w-full  flex flex-col pb-20 md:p-0
      justify-center items-center   "
      >
        {children}
      </div>
      <RightSideInfoBar />
    </DocsLayout>
  );
}
