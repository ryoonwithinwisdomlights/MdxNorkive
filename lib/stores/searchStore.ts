"use client";
import { create } from "zustand";

export interface SearchState {
  // 상태
  searchKeyword: string;

  // 액션
  setSearchKeyword: (keyword: string) => void;
  clearSearch: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  // 초기 상태
  searchKeyword: "",

  // 검색 키워드 설정
  setSearchKeyword: (keyword: string) => {
    set({ searchKeyword: keyword });
  },

  // 검색 초기화
  clearSearch: () => {
    set({ searchKeyword: "" });
  },
}));
