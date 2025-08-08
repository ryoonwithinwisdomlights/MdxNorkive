"use client";

import { Suspense } from "react";
import GeneralRecordTypePageWrapper from "@/modules/layout/templates/GeneralRecordTypePageWrapper";
import RightSideInfoBar from "@/modules/layout/components/RightSideInfoBar";
import { basicDocsClass } from "@/types/layout.props";
import Loading from "../loading";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <GeneralRecordTypePageWrapper>
      <div className=" w-full xl:w-[calc(100vw-600px)] flex flex-col pb-20  ">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>

      <RightSideInfoBar />
    </GeneralRecordTypePageWrapper>
  );
}
