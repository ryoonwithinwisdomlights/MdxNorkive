"use client";

import GeneralDocTypePageWrapper from "@/modules/layout/templates/home-page-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <GeneralDocTypePageWrapper>
      <div className=" w-full xl:w-[calc(100vw-600px)] flex flex-col pb-20  ">
        {children}
      </div>
    </GeneralDocTypePageWrapper>
  );
}
