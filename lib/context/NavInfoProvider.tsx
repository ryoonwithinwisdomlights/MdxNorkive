"use client";

import { RecordItem } from "@/app/api/types";
import NextNProgress from "nextjs-progressbar";
import { createContext, ReactNode, useContext } from "react";

const GlobalContext = createContext<{ recordList: RecordItem[] } | undefined>(
  undefined
);
type NavInfo = { recordList: RecordItem[] };
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
}: {
  children: ReactNode;
  from?: string;
  recordList: RecordItem[];
}) {
  return (
    <GlobalContext.Provider
      value={{
        recordList,
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
