"use client";

import { EssentialNavInfo } from "@/types/provider.model";
import NextNProgress from "nextjs-progressbar";
import { createContext, ReactNode, useContext } from "react";

const GlobalContext = createContext<EssentialNavInfo | undefined>(undefined);
/**
 * Global variable Provider, including language localization, style theme, search terms
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
  globalNotionData: EssentialNavInfo;
}) {
  const {
    siteInfo,
    categoryOptions,
    tagOptions,
    className,
    oldNav,
    customMenu,
    notice,
    latestRecords,
  } = globalNotionData;

  return (
    <GlobalContext.Provider
      value={{
        siteInfo,
        categoryOptions,
        tagOptions,
        className,
        oldNav,
        customMenu,
        notice,
        latestRecords,
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
