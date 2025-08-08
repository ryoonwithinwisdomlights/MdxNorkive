"use client";

import GeneralRecordTypePageWrapper from "@/modules/layout/templates/GeneralRecordTypePageWrapper";
import RightSideInfoBar from "@/modules/layout/components/RightSideInfoBar";
import { basicDocsClass } from "@/types/layout.props";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <GeneralRecordTypePageWrapper>
      <div className=" w-full xl:w-[calc(100vw-600px)] flex flex-col pb-20  ">
        {children}
      </div>

      <RightSideInfoBar />
    </GeneralRecordTypePageWrapper>
  );
}
