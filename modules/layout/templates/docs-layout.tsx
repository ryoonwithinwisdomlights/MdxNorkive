"use client";
import { HTMLAttributes, Suspense, useMemo } from "react";
import type { ReactNode } from "react";

//************* Fumadocs core ************* */
import { HideIfEmpty } from "fumadocs-core/hide-if-empty";
import Link from "fumadocs-core/link";
import type { PageTree } from "fumadocs-core/server";

//************* Fumadocs UI ************* */
import { RootToggle } from "fumadocs-ui/components/layout/root-toggle";
import {
  Sidebar,
  SidebarCollapseTrigger,
  SidebarHeader,
  SidebarPageTree,
  SidebarViewport,
} from "fumadocs-ui/components/layout/sidebar";

import {
  CollapsibleControl,
  LayoutBody,
  Navbar,
  NavbarSidebarTrigger,
} from "fumadocs-ui/layouts/docs-client";
import {
  getSidebarTabsFromOptions,
  SidebarLinkItem,
  SidebarOptions,
} from "fumadocs-ui/layouts/docs/shared";
import { TreeContextProvider } from "fumadocs-ui/contexts/tree";
import { BaseLayoutProps, getLinks } from "fumadocs-ui/layouts/shared";
import { NavProvider } from "fumadocs-ui/provider";

//************* Lucide ************* */
import { SidebarIcon } from "lucide-react";

//************* Custom components ************* */
import DocFooter from "@/modules/layout/components/doc-footer";
import LoadingCover from "@/modules/shared/LoadingCover";
import { buttonVariants } from "@/modules/shared/ui/DocButton";
import { SearchToggle } from "@/modules/layout/components/search-toggle";
import { cn } from "@/lib/utils/general";

export interface DocsLayoutProps extends BaseLayoutProps {
  tree: PageTree.Root;
  sidebar?: Partial<SidebarOptions> & {
    enabled?: boolean;
    component?: ReactNode;
  };

  /**
   * Props for the `div` container
   */
  containerProps?: HTMLAttributes<HTMLDivElement>;
}

export function DocsLayout({
  nav: { transparentMode, ...nav } = {},
  sidebar: {
    tabs: sidebarTabs,
    footer: sidebarFooter,
    banner: sidebarBanner,
    enabled: sidebarEnabled = true,
    collapsible: sidebarCollapsible = true,
    component: sidebarComponent,
    components: sidebarComponents,
    ...sidebarProps
  } = {},
  searchToggle = {},
  disableThemeSwitch = false,
  themeSwitch = { enabled: !disableThemeSwitch },
  i18n = false,
  children,
  ...props
}: DocsLayoutProps) {
  const tabs = useMemo(
    () => getSidebarTabsFromOptions(sidebarTabs, props.tree) ?? [],
    [sidebarTabs, props.tree]
  );
  const links = getLinks(props.links ?? [], props.githubUrl);

  const variables = cn(
    " md:[--fd-sidebar-width:300px] lg:[--fd-sidebar-width:300px]  xl:[--fd-toc-width:300px] h-full pt-0 mt-0",
    !nav.component && nav.enabled !== false
      ? "[--fd-nav-height:0px] "
      : undefined
  );

  const sidebar = sidebarComponent ?? (
    <>
      {sidebarCollapsible ? <CollapsibleControl /> : null}
      <Sidebar
        {...sidebarProps}
        collapsible={sidebarCollapsible}
        className="mt-[50px] bg-neutral-100 dark:bg-neutral-800/50"
      >
        <HideIfEmpty>
          <SidebarHeader className="data-[empty=true]:hidden ">
            <div className="flex max-md:hidden">
              <Link
                href={nav.url ?? "/"}
                className="inline-flex text-[15px] items-center gap-2.5 font-medium me-auto"
              >
                {nav.title}
              </Link>
              {nav.children}
              {sidebarCollapsible && (
                <SidebarCollapseTrigger
                  className={cn(
                    buttonVariants({
                      color: "ghost",
                      size: "icon-sm",
                      className:
                        "mb-auto text-fd-muted-foreground max-md:hidden",
                    })
                  )}
                >
                  <SidebarIcon />
                </SidebarCollapseTrigger>
              )}
            </div>
            {/* {searchToggle.enabled !== false &&
              (searchToggle.components?.lg ?? (
                <LargeSearchToggle hideIfDisabled className="max-md:hidden" />
              ))} */}

            {tabs.length > 0 && <RootToggle options={tabs} />}

            {sidebarBanner}
          </SidebarHeader>
        </HideIfEmpty>
        <SidebarViewport>
          {links
            .filter((v) => v.type !== "icon")
            .map((item, i, list) => (
              <SidebarLinkItem
                key={i}
                item={item}
                className={cn(i === list.length - 1 && "mb-4")}
              />
            ))}
          <SidebarPageTree components={sidebarComponents} />
        </SidebarViewport>
        <HideIfEmpty>
          <DocFooter />
        </HideIfEmpty>
      </Sidebar>
    </>
  );

  return (
    <TreeContextProvider tree={props.tree}>
      <NavProvider transparentMode={transparentMode}>
        {nav.enabled !== false &&
          (nav.component ?? (
            <Navbar className="h-14 md:hidden">
              <Link
                href={nav.url ?? "/"}
                className="inline-flex items-center gap-2.5 font-semibold"
              >
                {nav.title}
              </Link>
              <div className="flex-1">{nav.children}</div>
              {searchToggle?.enabled !== false &&
                (searchToggle.components?.sm ?? (
                  <SearchToggle className="p-2" hideIfDisabled />
                ))}
              <NavbarSidebarTrigger className="p-2 -me-1.5 md:hidden" />
            </Navbar>
          ))}
        <LayoutBody
          {...props.containerProps}
          className={cn(variables, props.containerProps?.className)}
        >
          {sidebarEnabled && sidebar}
          <Suspense fallback={<LoadingCover />}>{children}</Suspense>
        </LayoutBody>
      </NavProvider>
    </TreeContextProvider>
  );
}
