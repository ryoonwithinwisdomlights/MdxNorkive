import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import { cn } from "@/lib/utils/general";
import Collapse from "@/modules/shared/Collapse";
import React from "react";

interface CollapseRefType {
  updateCollapseHeight: (params: { height: number; increase: boolean }) => void;
}

interface MobileRightSidebarProps {
  children: React.ReactNode;
  className?: string;
  collapseRef: React.RefObject<CollapseRefType | null>;
}

const MobileRightSidebar = ({
  collapseRef,
  children,
  className,
  ...props
}: MobileRightSidebarProps) => {
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
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-1000 transition-all duration-300 ease-out",
          openState ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={toggleMobileLeftSidebarOpen}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        id="left-sidebar-mobile"
        {...props}
        data-state={state}
        className={cn(
          "fixed text-[15px] flex flex-col shadow-lg rounded-l-2xl border dark:border-neutral-700 end-0 inset-y-0 w-[60%] max-w-[350px] z-2000 bg-neutral-100 dark:bg-neutral-900 transition-all duration-300 ease-out",
          className
        )}
        style={{
          transform: openState ? "translateX(0)" : "translateX(100%)",
          visibility: openState ? "visible" : "hidden",
          boxShadow: openState
            ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            : "none",
        }}
      >
        {children}
      </aside>
    </Collapse>
  );
};

export default MobileRightSidebar;
