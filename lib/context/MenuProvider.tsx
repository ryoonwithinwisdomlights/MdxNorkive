"use client";

import { MenuItem } from "@/app/api/types";
import { EssentialMenuInfo, EssentialNavInfo } from "@/types/provider.model";
import { createContext, ReactNode, useContext } from "react";

const GlobalContext = createContext<EssentialMenuInfo | undefined>(undefined);
/**
 *A Global provider that initializes the site with essential values.
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export function MenuProvider({
  children,
  from = "index",
  menuData,
}: {
  children: ReactNode;
  from?: string;
  menuData: MenuItem[];
}) {
  // const { oldNav, customMenu } = menuData;

  return (
    <GlobalContext.Provider
      value={{
        menuData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export const useMenu = ({ from }: { from?: string }): EssentialMenuInfo => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used within a GlobalContext.Provider");
  }
  return context;
};
