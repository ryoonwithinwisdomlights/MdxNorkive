"use client";

import { MenuItem } from "@/types/record.model";
import { RecordFrontMatter } from "@/types/mdx.model";
import { GlobalNavInfoProps, SerializedPage } from "@/types";
import NextNProgress from "nextjs-progressbar";
import { createContext, ReactNode, useContext } from "react";

const GlobalContext = createContext<GlobalNavInfoProps | undefined>(undefined);
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
  menuList,
}: {
  children: ReactNode;
  from?: string;
  recordList: RecordFrontMatter[];
  serializedAllPages: SerializedPage[];
  menuList: MenuItem[];
}) {
  // console.log("allPages::", allPages);
  return (
    <GlobalContext.Provider
      value={{
        recordList,
        serializedAllPages,
        menuList,
      }}
    >
      {children}
      <NextNProgress />
    </GlobalContext.Provider>
  );
}

export const useNav = ({ from }: { from?: string }): GlobalNavInfoProps => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used within a GlobalContext.Provider");
  }
  return context;
};
