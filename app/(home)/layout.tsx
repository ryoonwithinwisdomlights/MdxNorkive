"use client";

import RightSideNavWrapper from "@/modules/layout/wrapper/RightSideNavWrapper";
import GeneralRecordTypePageWrapper from "@/modules/layout/templates/home-page-layout";
import { Suspense } from "react";
import Loading from "../loading";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <GeneralRecordTypePageWrapper>
      <Suspense fallback={<Loading />}>
        <div className=" w-full xl:w-[calc(100vw-600px)] flex flex-col pb-20  ">
          {children}
        </div>
      </Suspense>
    </GeneralRecordTypePageWrapper>
  );
}
