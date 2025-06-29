"use client";

import { create } from "zustand";

type PageStore = {
  currentPageId: string | null;
  setCurrentPageId: (id: string | null) => void;
};

export const usePageStore = create<PageStore>((set) => ({
  currentPageId: null,
  setCurrentPageId: (id) => set({ currentPageId: id }),
}));
