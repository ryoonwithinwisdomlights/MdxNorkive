"use client"; // 클라이언트 컴포넌트
import { useNav } from "@/lib/context/NavInfoProvider";
import { MobileMenuItemDrop } from "./MobileMenuItemDrop";

export const MobileMenuBar = ({ onHeightChange }) => {
  const { menuList } = useNav({ from: "TopNavBar" });

  const links = menuList;

  return (
    <nav id="top-nav-mobile" className="text-md">
      {links &&
        links?.map((link, index) => (
          <MobileMenuItemDrop
            onHeightChange={onHeightChange}
            key={index}
            link={link}
          />
        ))}
    </nav>
  );
};
