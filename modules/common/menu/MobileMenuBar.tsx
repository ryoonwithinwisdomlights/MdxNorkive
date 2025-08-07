"use client"; // 클라이언트 컴포넌트
import { useMenu } from "@/lib/context/MenuProvider";
import { MobileMenuItemDrop } from "./MobileMenuItemDrop";

export const MobileMenuBar = ({ onHeightChange }) => {
  const { menuData } = useMenu({ from: "TopNavBar" });

  const links = menuData;

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
