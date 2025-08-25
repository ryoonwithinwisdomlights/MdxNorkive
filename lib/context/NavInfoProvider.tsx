"use client";

import { GlobalNavInfoProps } from "@/types";
import { createContext, ReactNode, useContext, useMemo } from "react";

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
  // value 객체를 useMemo로 최적화하여 props가 변경되지 않으면 리렌더링 방지
  const value = useMemo(
    () => ({
      recordList: props.recordList,
      serializedAllPages: props.serializedAllPages,
      menuList: props.menuList,
    }),
    [props.recordList, props.serializedAllPages, props.menuList]
  );

  return (
    <NavInfoContext.Provider value={value}>{children}</NavInfoContext.Provider>
  );
}

export const useNav = ({ from }: { from?: string }): GlobalNavInfoProps => {
  const context = useContext(NavInfoContext);
  if (!context) {
    throw new Error("useNav must be used within a NavInfoProvider");
  }
  return context;
};
