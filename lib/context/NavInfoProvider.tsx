"use client";

import { GlobalNavInfoProps } from "@/types";
import { useMenuList } from "@/lib/hooks/useData";
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
  // 서버에서 전달받은 menuList가 있으면 사용, 없으면 React Query로 가져오기
  const { data: clientMenuList = [] } = useMenuList();
  const menuList =
    props.menuList && props.menuList.length > 0
      ? props.menuList
      : clientMenuList;

  // console.log("menuList:::", menuList);

  // value 객체를 useMemo로 최적화하여 props가 변경되지 않으면 리렌더링 방지
  const value = useMemo(
    () => ({
      docsList: props.docsList,
      serializedAllPages: props.serializedAllPages,
      menuList: menuList,
    }),
    [props.docsList, props.serializedAllPages, menuList]
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
