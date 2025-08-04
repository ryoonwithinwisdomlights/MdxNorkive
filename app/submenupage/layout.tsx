"use client";
import LeftSidebar from "@/modules/layout/components/menu/LeftSidebar";
import RightSideInfoBar from "@/modules/layout/components/RightSideInfoBar";
import GeneralRecordTypePageWrapper from "@/modules/layout/templates/GeneralRecordTypePageWrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <GeneralRecordTypePageWrapper>
      {/* <LeftSidebar /> */}
      <div
        className="w-[60%] p-16 bg-pink-200  flex flex-col 
      justify-center items-center "
      >
        {children}
      </div>

      <RightSideInfoBar />
    </GeneralRecordTypePageWrapper>
  );
}
