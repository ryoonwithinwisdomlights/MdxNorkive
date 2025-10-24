"use client";
import { create } from "zustand";
import { BLOG } from "@/blog.config";
import { LocaleDict } from "@/types";
import {
  generateLocaleDict,
  getFilteredDictionaryListKey,
  saveLangToLocalStorage,
  saveLangToCookies,
  setThemeByLocalStorage,
} from "@/lib/utils";
import { toast } from "sonner";

export interface ThemeState {
  // 상태
  isDarkMode: boolean;
  lang: string;
  locale: LocaleDict;
  isInitialized: boolean;

  // 액션
  toggleDarkMode: () => void;
  changeLang: (lang: string) => void;
  changeOppositeLang: () => void;
  updateLocale: (locale: LocaleDict) => void;
  initialize: () => void;
}

// 안전한 localStorage 읽기
const getThemeFromStorage = (): boolean => {
  if (typeof window === "undefined") {
    return BLOG.APPEARANCE === "dark";
  }

  try {
    const saved = localStorage.getItem("theme");
    // localStorage에 값이 있고 유효한 경우에만 사용
    if (saved === "dark" || saved === "light") {
      return saved === "dark";
    }
    // localStorage에 값이 없거나 유효하지 않은 경우 현재 HTML 클래스 확인
    const htmlElement = document.documentElement;
    if (htmlElement.classList.contains("dark")) {
      return true;
    }
    if (htmlElement.classList.contains("light")) {
      return false;
    }
    // 기본값 사용
    return BLOG.APPEARANCE === "dark";
  } catch {
    return BLOG.APPEARANCE === "dark";
  }
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  // 초기 상태 - 서버에서는 항상 기본값
  isDarkMode: BLOG.APPEARANCE === "dark",
  lang: BLOG.LANG,
  locale: generateLocaleDict(BLOG.LANG),
  isInitialized: false,

  // 다크모드 토글
  toggleDarkMode: () => {
    const { isDarkMode, isInitialized } = get();

    // 초기화되지 않은 상태에서는 토글하지 않음
    if (!isInitialized) return;

    const newStatus = !isDarkMode;

    // localStorage에 저장
    setThemeByLocalStorage(newStatus);

    // Store 상태 업데이트
    set({ isDarkMode: newStatus });

    // HTML 클래스 업데이트
    if (typeof window !== "undefined") {
      const htmlElement = document.documentElement;
      htmlElement.classList.remove("light", "dark");
      htmlElement.classList.add(newStatus ? "dark" : "light");
    }
  },

  // 초기화 함수
  initialize: () => {
    if (typeof window === "undefined") return;

    const { isInitialized } = get();

    // 이미 초기화된 상태라면 중복 초기화 방지
    if (isInitialized) return;

    const savedTheme = getThemeFromStorage();

    // Store 상태 업데이트
    set({ isDarkMode: savedTheme, isInitialized: true });

    // HTML 클래스 설정
    const htmlElement = document.documentElement;
    htmlElement.classList.remove("light", "dark");
    htmlElement.classList.add(savedTheme ? "dark" : "light");
  },

  // 언어 변경
  changeLang: (lang: string) => {
    if (lang) {
      saveLangToLocalStorage(lang);
      saveLangToCookies(lang);
      const newLocale = generateLocaleDict(lang);
      set({ lang, locale: newLocale });
      toast.success(`${newLocale.SITE.LANG_CHANGE_SUCCESS_MSG}`);
    }
  },

  // 반대 언어로 변경
  changeOppositeLang: () => {
    const { locale } = get();
    const resLang = getFilteredDictionaryListKey(locale.LOCALE);

    if (resLang) {
      saveLangToLocalStorage(resLang);
      saveLangToCookies(resLang);
      const newLocale = generateLocaleDict(resLang);
      set({ lang: resLang, locale: newLocale });
      toast.success(`${newLocale.SITE.LANG_CHANGE_SUCCESS_MSG}`);
    }
  },

  // 로케일 업데이트
  updateLocale: (locale: LocaleDict) => {
    set({ locale });
  },
}));
