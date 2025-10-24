"use client";
import { create } from "zustand";

export interface SettingsState {
  // 상태
  setting: boolean;
  onLoading: boolean;

  // 액션
  toggleSettings: () => void;
  setOnLoading: (loading: boolean) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  // 초기 상태
  setting: false,
  onLoading: false,

  // 설정 패널 토글
  toggleSettings: () => {
    set((state) => ({ setting: !state.setting }));
  },

  // 로딩 상태 설정
  setOnLoading: (loading: boolean) => {
    set({ onLoading: loading });
  },
}));
