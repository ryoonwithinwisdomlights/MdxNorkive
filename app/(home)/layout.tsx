"use client";

import GeneralRecordTypePageWrapper from "@/modules/layout/templates/home-page-layout";
import LoadingCover from "@/modules/shared/LoadingCover";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <GeneralRecordTypePageWrapper>
      {/* <Suspense fallback={<LoadingCover />}> */}
      <div className=" w-full xl:w-[calc(100vw-600px)] flex flex-col pb-20  ">
        {children}
      </div>
      {/* </Suspense> */}
    </GeneralRecordTypePageWrapper>
  );
}
