"use client";
import LeftSidebar from "@/modules/layout/components/menu/LeftSidebar";
import RightSideInfoBar from "@/modules/layout/components/RightSideInfoBar";
import GeneralRecordTypePageWrapper from "@/modules/layout/templates/GeneralRecordTypePageWrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <GeneralRecordTypePageWrapper>
      {/* <LeftSidebar /> */}
      <div
        className="w-full mt-[20px] p-8 xl:w-[60%] flex flex-col  bg-amber-100
      justify-center items-center "
      >
        {children}
      </div>

      <RightSideInfoBar />
    </GeneralRecordTypePageWrapper>
  );
}
