"use client"; // 클라이언트 컴포넌트
import { useNav } from "@/lib/context/NavInfoProvider";
import { MobileMenuItemDrop } from "./MobileMenuItemDrop";

interface MobileMenuBarProps {
  onHeightChange: (params: { height: number; increase: boolean }) => void;
}

export const MobileMenuBar = ({ onHeightChange }: MobileMenuBarProps) => {
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
