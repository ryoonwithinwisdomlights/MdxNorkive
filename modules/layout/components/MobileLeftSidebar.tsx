import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import { cn } from "@/lib/utils/general";
import Collapse from "@/modules/shared/Collapse";
import { useSidebar } from "fumadocs-ui/provider";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  collapseRef: React.RefObject<any>;
};

const MobileLeftSidebar = ({
  collapseRef,
  children,
  className,
  ...props
}: Props) => {
  const { isMobileLeftSidebarOpen, toggleMobileLeftSidebarOpen } =
    useGeneralSiteSettings();
  const state = isMobileLeftSidebarOpen ? "open" : "closed";
  const openState = isMobileLeftSidebarOpen;

  return (
    <Collapse
      type="horizontal"
      collapseRef={collapseRef}
      isOpen={isMobileLeftSidebarOpen}
      className="md:hidden "
    >
      {/* Background Overlay */}
      {openState && (
        <div
          className="fixed inset-0 bg-black/50 z-1000 animate-fade-in"
          onClick={toggleMobileLeftSidebarOpen}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        id="left-sidebar-mobile"
        {...props}
        data-state={state}
        className={cn(
          "fixed text-[15px] flex flex-col shadow-lg  rounded-l-2xl border dark:border-neutral-700 end-0 inset-y-0 w-[60%] max-w-[350px] z-2000 bg-neutral-100 dark:bg-neutral-900 ",
          !openState && "invisible",
          className
        )}
      >
        {children}
      </aside>
    </Collapse>
  );
};

export default MobileLeftSidebar;
