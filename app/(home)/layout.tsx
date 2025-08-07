"use client";
import LeftSidebar from "@/modules/common/layout/components/LeftSidebar";
import RightSideInfoBar from "@/modules/common/layout/components/RightSideInfoBar";
import GeneralRecordTypePageWrapper from "@/modules/common/layout/templates/GeneralRecordTypePageWrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <GeneralRecordTypePageWrapper>
      {/* <LeftSidebar /> */}
      <div
        className="w-full mt-[20px] p-10 xl:w-[60%] flex flex-col  pb-20 md:p-0
      justify-center items-center "
      >
        {children}
      </div>

      <RightSideInfoBar />
    </GeneralRecordTypePageWrapper>
  );
}
