"use client"; // 클라이언트 컴포넌트
import { useMenu } from "@/lib/context/MenuProvider";
import { MobileMenuItemDrop } from "./MobileMenuItemDrop";

export const MobileMenuBar = (props) => {
  const { menuData } = useMenu({ from: "TopNavBar" });

  const links = menuData;
  if (!links || links.length === 0) {
    return null;
  }
  return (
    <nav id="top-nav-mobile" className="text-md">
      {links?.map((link, index) => (
        <MobileMenuItemDrop
          onHeightChange={props?.onHeightChange}
          key={index}
          link={link}
        />
      ))}
    </nav>
  );
};
