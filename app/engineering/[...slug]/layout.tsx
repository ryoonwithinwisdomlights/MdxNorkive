import { ReactNode, ReactElement } from "react";
// import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { DocsLayout } from "@/modules/layout/docs-min";
import { engineeringSource } from "@/lib/source";
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
    // title: (
    //   <>
    //     <svg
    //       width="24"
    //       height="24"
    //       xmlns="http://www.w3.org/2000/svg"
    //       aria-label="Logo"
    //     >
    //       <circle cx={12} cy={12} r={12} fill="currentColor" />
    //     </svg>
    //     My App
    //   </>
    // ),
  },
  // see https://fumadocs.dev/docs/ui/navigation/links
  links: [],
};
export const pageOptions: DocsLayoutProps = {
  ...baseOptions,
  tree: engineeringSource.pageTree,
  nav: {
    ...baseOptions.nav,
    transparentMode: "none",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  console.log("engineeringSource.pageTree::", engineeringSource.pageTree);
  return (
    <DocsLayout
      {...pageOptions}
      searchToggle={{ enabled: false }}
      themeSwitch={{ enabled: false }}
      sidebar={{ defaultOpenLevel: 0 }}
    >
      {children}
    </DocsLayout>
  );
}
