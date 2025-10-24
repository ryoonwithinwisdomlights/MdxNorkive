"use client";
import { create } from "zustand";
import { TOCItemType } from "@/types";

export interface UIState {
  // TOC 관련 상태
  tocVisible: boolean;
  tocContent: TOCItemType[];
  pageNavVisible: boolean;

  // 모바일 네비게이션 상태
  isMobileTopNavOpen: boolean;
  isMobileLeftSidebarOpen: boolean;

  // 우측 정보바 상태
  rightSideInfoBarMode: "info" | "author";

  // TOC 액션
  toggleToc: () => void;
  setTocContent: (content: TOCItemType[]) => void;
  togglePageNav: () => void;

  // 모바일 네비게이션 액션
  toggleMobileTopNav: () => void;
  toggleMobileLeftSidebar: () => void;

  // 우측 정보바 액션
  setRightSideInfoBarMode: (mode: "info" | "author") => void;
}

export const useUIStore = create<UIState>((set) => ({
  // 초기 상태
  tocVisible: true,
  tocContent: [],
  pageNavVisible: false,
  isMobileTopNavOpen: false,
  isMobileLeftSidebarOpen: false,
  rightSideInfoBarMode: "author",

  // TOC 토글
  toggleToc: () => {
    set((state) => ({ tocVisible: !state.tocVisible }));
  },

  // TOC 내용 설정
  setTocContent: (content: TOCItemType[]) => {
    set({ tocContent: content });
  },

  // 페이지 네비게이션 토글
  togglePageNav: () => {
    set((state) => ({ pageNavVisible: !state.pageNavVisible }));
  },

  // 모바일 상단 네비게이션 토글
  toggleMobileTopNav: () => {
    set((state) => ({ isMobileTopNavOpen: !state.isMobileTopNavOpen }));
  },

  // 모바일 좌측 사이드바 토글
  toggleMobileLeftSidebar: () => {
    set((state) => ({
      isMobileLeftSidebarOpen: !state.isMobileLeftSidebarOpen,
    }));
  },

  // 우측 정보바 모드 변경
  setRightSideInfoBarMode: (mode: "info" | "author") => {
    set({ rightSideInfoBarMode: mode });
  },
}));
