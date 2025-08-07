"use client";

import GeneralRecordTypePageWrapper from "@/modules/layout/templates/GeneralRecordTypePageWrapper";
import RightSideInfoBar from "@/modules/layout/components/RightSideInfoBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <GeneralRecordTypePageWrapper>
      {/* <LeftSidebar /> */}
      <div
        className="w-full mt-[20px] p-10 xl:w-[60%] flex flex-col  pb-20 
      justify-center items-center "
      >
        {children}
      </div>

      <RightSideInfoBar />
    </GeneralRecordTypePageWrapper>
  );
}
