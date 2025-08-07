import { projectSource } from "@/lib/source";
import RightSideInfoBar from "@/modules/layout/components/RightSideInfoBar";
import { DocsLayout } from "@/modules/layout/templates/docs-min";
import { DocsLayoutProps } from "fumadocs-ui/layouts/docs";

const baseOptions: Partial<DocsLayoutProps> = {
  nav: {
    title: <></>,
  },
  links: [],
};
const pageOptions: DocsLayoutProps = {
  ...baseOptions,
  tree: projectSource.pageTree,
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
        className="md:w-[60vw] mt-[20px] w-full  flex flex-col
      justify-center items-center  pb-20 md:p-0  "
      >
        {children}
      </div>
      <RightSideInfoBar />
    </DocsLayout>
  );
}
