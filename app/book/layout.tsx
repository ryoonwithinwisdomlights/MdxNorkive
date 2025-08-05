import RightSideInfoBar from "@/modules/layout/components/RightSideInfoBar";
import { ReactElement, ReactNode } from "react";
import { bookSource } from "@/lib/source";
import { DocsLayout } from "@/modules/layout/docs-min";
import { DocsLayoutProps } from "fumadocs-ui/layouts/docs";
interface Root {
  $id?: string;
  name: ReactNode;
  children: Node[];
}
type Node = Item | Separator | Folder;
interface Item {
  $id?: string;
  /**
   * @internal
   */
  $ref?: {
    file: string;
  };
  type: "page";
  name: ReactNode;
  url: string;
  external?: boolean;
  description?: ReactNode;
  icon?: ReactElement;
}
interface Separator {
  $id?: string;
  type: "separator";
  name?: ReactNode;
  icon?: ReactElement;
}
interface Folder {
  $id?: string;
  /**
   * @internal
   */
  $ref?: {
    metaFile?: string;
  };
  type: "folder";
  name: ReactNode;
  description?: ReactNode;
  root?: boolean;
  defaultOpen?: boolean;
  index?: Item;
  icon?: ReactElement;
  children: Node[];
}

const baseOptions: Partial<DocsLayoutProps> = {
  nav: {
    title: (
      <>
        {/* <svg
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Logo"
        >
          <circle cx={12} cy={12} r={12} fill="currentColor" />
        </svg> */}
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
  tree: bookSource.pageTree,
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
        className="md:w-[60vw] w-full  flex flex-col
      justify-center items-center  bg-amber-100"
      >
        {children}
      </div>
      <RightSideInfoBar />
    </DocsLayout>
  );
}
