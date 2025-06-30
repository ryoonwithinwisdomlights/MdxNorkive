"use client";

import { NorkiveRecordData } from "@/types";
import { EssentialNavInfo, GlobalNotionData } from "@/types/provider.model";
import { useRouter } from "next/navigation";
import NextNProgress from "nextjs-progressbar";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

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
  globalNotionData: GlobalNotionData;
}) {
  const {
    siteInfo,
    categoryOptions,
    tagOptions,
    oldNav,
    customMenu,
    notice,
    latestRecords,
  } = globalNotionData;

  const [currentRecordData, setCurrentRecordData] =
    useState<NorkiveRecordData | null>(null);

  const [showTocButton, setShowTocButton] = useState<boolean>(false);
  const router = useRouter();

  const handleRouter = (record) => {
    setCurrentRecordData(record);
    router.push(`/${record.slug}`);
  };
  const cleanCurrentRecordData = () => {
    setCurrentRecordData(null);
  };

  useEffect(() => {
    if (currentRecordData?.tableOfContents) {
      if (currentRecordData.tableOfContents?.length > 1) {
        setShowTocButton(true);
      }
    }
  }, [currentRecordData]);

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
        currentRecordData,
        showTocButton,
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
