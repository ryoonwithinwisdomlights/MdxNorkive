"use client";

import { GlobalNavInfoProps } from "@/types";
import { createContext, ReactNode, useContext } from "react";

const NavInfoContext = createContext<GlobalNavInfoProps | undefined>(undefined);

/**
 *A NavInfo provider that initializes the site with essential values.
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export function NavInfoProvider({
  children,
  from = "index",
  ...props
}: {
  children: ReactNode;
  from?: string;
} & GlobalNavInfoProps) {
  return (
    <NavInfoContext.Provider
      value={{
        recordList: props.recordList,
        serializedAllPages: props.serializedAllPages,
        menuList: props.menuList,
      }}
    >
      {children}
    </NavInfoContext.Provider>
  );
}

export const useNav = ({ from }: { from?: string }): GlobalNavInfoProps => {
  const context = useContext(NavInfoContext);
  if (!context) {
    throw new Error("useNav must be used within a NavInfoProvider");
  }
  return context;
};
