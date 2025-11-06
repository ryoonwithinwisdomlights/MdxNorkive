import { DocFrontMatter } from "@/types/mdx.model";
import { MenuItem } from "@/types/docdata.model";
import { CollapseRefType } from "@/types/components/collapse";

export interface MobileRightSidebarProps {
  children: React.ReactNode;
  className?: string;
  collapseRef: React.RefObject<CollapseRefType | null>;
}
export interface RightSidebarItemDropProps {
  menuData: MenuItem;
}

export interface MenuItemDropProps {
  menuData: MenuItem;
}
export interface MobileMenuBarProps {
  onHeightChange: (params: { height: number; increase: boolean }) => void;
}
export interface MobileMenuItemDropProps {
  link: MenuItem;
  onHeightChange: (params: { height: number; increase: boolean }) => void;
}

export interface NavListDivProps {
  doc: DocFrontMatter;
  className?: string;
  substr?: boolean;
  substrNumber?: number;
}
