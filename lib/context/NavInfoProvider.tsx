"use client";

import { RecordItem } from "@/app/api/types";
import { PageData } from "fumadocs-core/source";
import NextNProgress from "nextjs-progressbar";
import { createContext, ReactNode, useContext } from "react";
type SerializedPage = {
  file: {
    dirname: string;
    name: string;
    ext: string;
    path: string;
    flattenedPath: string;
  };
  absolutePath: string;
  path: string;
  url: string;
  slugs: string[];
  data: PageData;
  locale: string | undefined;
};

//Page<LoaderConfig['source']['pageData']>[]
type NavInfo = {
  recordList: RecordItem[];
  serializedAllPages: SerializedPage[];
};
const GlobalContext = createContext<NavInfo | undefined>(undefined);
/**
 *A Global provider that initializes the site with essential values.
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export function NavInfoProvider({
  children,
  from = "index",
  recordList,
  serializedAllPages,
}: {
  children: ReactNode;
  from?: string;
  recordList: RecordItem[];
  serializedAllPages: SerializedPage[];
}) {
  // console.log("allPages::", allPages);
  return (
    <GlobalContext.Provider
      value={{
        recordList,
        serializedAllPages,
      }}
    >
      {children}
      <NextNProgress />
    </GlobalContext.Provider>
  );
}

export const useNav = ({ from }: { from?: string }): NavInfo => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used within a GlobalContext.Provider");
  }
  return context;
};
