import React, { RefObject } from "react";

export interface CollapseProps {
  type?: "horizontal" | "vertical";
  isOpen?: boolean;
  collapseRef?: RefObject<CollapseRefType | null>;
  onHeightChange?: (params: { height: number; increase: boolean }) => void;
  className?: string;
  children?: React.ReactNode;
}

export interface CollapseRefType {
  updateCollapseHeight: (params: { height: number; increase: boolean }) => void;
}
