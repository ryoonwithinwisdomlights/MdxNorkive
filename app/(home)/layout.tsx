"use client";
import LeftSidebar from "@/modules/layout/components/menu/LeftSidebar";
import RightSideInfoBar from "@/modules/layout/components/RightSideInfoBar";
import GeneralRecordTypePageWrapper from "@/modules/layout/templates/GeneralRecordTypePageWrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <GeneralRecordTypePageWrapper>
      <aside
        id="nd-sidebar"
        className="hidden md:w-[20%] h-screen md:fixed xl:block left-0 items-end top-0 bottom-0 z-20
   bg-neutral-50 dark:bg-neutral-800 text-sm border-e m-0  pt-18 "
        //   data-collapsed={collapsed}
      >
        {/* <div
        id="nd-sidebar-content"
        className="  overflow-hidden w-full h-[calc(100vh-150px)] relative  py-6 flex flex-col gap-2 "
      >
        {menuData?.map((data, index) => (
          <LefitSidebarItemDrop key={index} menuData={data} />
        ))}
      </div>
      <Footer /> */}
      </aside>
      <div
        className="w-full p-16  xl:w-[60%] flex flex-col 
      justify-center items-center "
      >
        {children}
      </div>

      <RightSideInfoBar />
    </GeneralRecordTypePageWrapper>
  );
}
