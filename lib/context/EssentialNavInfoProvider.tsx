"use client";

import { BaseArchivePageBlock } from "@/types";
import { EssentialNavInfo, GlobalNotionData } from "@/types/provider.model";
import { useRouter } from "next/navigation";
import NextNProgress from "nextjs-progressbar";
import { createContext, ReactNode, useContext, useState } from "react";

const GlobalContext = createContext<EssentialNavInfo | undefined>(undefined);
/**
 *A Global provider that initializes the site with essential values.
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export function EssentialNavInfoProvider({
  children,
  from = "index",
  globalNotionData,
}: {
  children: ReactNode;
  from?: string;
  globalNotionData;
}) {
  const {
    siteInfo,
    categoryOptions,
    tagOptions,
    oldNav,
    customMenu,
    notice,
    latestRecords,
    allPages,
  } = globalNotionData;

  const [currentpageId, setCurrentpageId] =
    useState<BaseArchivePageBlock | null>(null);

  const router = useRouter();

  const handleRouter = (page) => {
    router.push(`/${page.slug}`);
  };
  const cleanCurrentRecordData = () => {
    // setCurrentRecordData(null);
  };

  return (
    <GlobalContext.Provider
      value={{
        siteInfo,
        categoryOptions,
        tagOptions,
        oldNav,
        customMenu,
        notice,
        latestRecords,
        allPages,
        // currentRecordData,
        handleRouter,
        cleanCurrentRecordData,
      }}
    >
      {children}
      <NextNProgress />
    </GlobalContext.Provider>
  );
}

export const useGlobal = ({ from }: { from?: string }): EssentialNavInfo => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used within a GlobalContext.Provider");
  }
  return context;
};
