import { ENG_LANG } from "@/constants/en-lang.constants";
import { KOR_LANG } from "@/constants/kr-lang.constants";
import { getQueryVariable, isBrowser, mergeDeep } from "./general";
import type {
  LocaleDict,
  LocaleType,
  LocaleChangeHandler,
  LangChangeHandler,
} from "@/types";

/**
 * Configure all supported languages here
 * country / region
 */
export const dictionaries = {
  "en-US": ENG_LANG,
  "kr-KR": KOR_LANG,
};

export function getDictionary(locale: LocaleType) {
  return dictionaries[locale];
}

export const getFilteredDictionaryList = (
  currentLang: string
): Record<string, LocaleDict> => {
  return Object.keys(dictionaries)
    .filter((key) => key !== currentLang)
    .reduce((obj, key) => {
      obj[key] = dictionaries[key as LocaleType];
      return obj;
    }, {} as Record<string, LocaleDict>);
};

export const getFilteredDictionaryListKey = (currentLang: string): string => {
  return Object.keys(dictionaries)
    .filter((key) => key !== currentLang)
    .join();
};

/**
 * Get the current language dictionary
 * If the complete "country-region" language is matched, the country's language is displayed
 * @returns the corresponding dictionaries of different languages
 */
export function generateLocaleDict(langString: string): LocaleDict {
  //BLOG.LANG
  const supportedLocales = Object.keys(dictionaries) as LocaleType[]; //우리가 지원
  let userLocale: LocaleDict | undefined;

  // Split the language string into language and region code, for example(예: "kr-KR"을 "kr" 및 "KR"으로 분할).
  const [language, region] = langString.split(/[-_]/);

  // Prioritize matching of both language and region
  const specificLocale = `${language}-${region}` as LocaleType;
  if (supportedLocales.includes(specificLocale)) {
    userLocale = dictionaries[specificLocale];
  }

  // Then try to match only the language matches
  if (!userLocale) {
    const languageOnlyLocales = supportedLocales.filter((locale) =>
      locale.startsWith(language)
    );
    if (languageOnlyLocales.length > 0) {
      userLocale = dictionaries[languageOnlyLocales[0]];
    }
  }

  // If no match is found, the closest language pack is returned.
  if (!userLocale) {
    const fallbackLocale = supportedLocales.find((locale) =>
      locale.startsWith("en")
    );
    if (fallbackLocale) {
      userLocale = dictionaries[fallbackLocale];
    }
  }

  return mergeDeep({}, dictionaries["en-US"], userLocale) as LocaleDict;
}

/**
 * 사이트 번역 초기화
 * 사용자의 현재 브라우저 언어에 따라 전환
 */
export function initLocale(
  lang: string,
  locale: LocaleDict,
  changeLang: LangChangeHandler,
  changeLocale: LocaleChangeHandler
): void {
  if (isBrowser) {
    const queryLang =
      getQueryVariable("lang") ||
      loadLangFromLocalStorage() ||
      loadLangFromCookies() ||
      window.navigator.language;

    // 실제로 언어가 변경되었을 때만 처리
    if (queryLang && queryLang !== lang) {
      changeLang(queryLang);
      saveLangToLocalStorage(queryLang);
      saveLangToCookies(queryLang);

      const targetLocale = generateLocaleDict(queryLang);
      changeLocale(targetLocale);
    }
  }
}
/**
 * 언어 read
 * @returns {string | null}
 */
export const loadLangFromLocalStorage = (): string | null => {
  return localStorage.getItem("lang");
};

/**
 * 언어 저장
 * @param lang - 저장할 언어 코드
 */
export const saveLangToLocalStorage = (lang: string): void => {
  localStorage.setItem("lang", lang);
};

/**
 * 쿠키에 언어 저장 (서버 사이드 렌더링을 위해)
 * @param lang - 저장할 언어 코드
 */
export const saveLangToCookies = (lang: string): void => {
  if (isBrowser) {
    // 쿠키에 저장 (7일 유효)
    document.cookie = `lang=${lang}; path=/; max-age=${
      7 * 24 * 60 * 60
    }; SameSite=Lax`;
  }
};

/**
 * 쿠키에서 언어 읽기
 * @returns {string | null}
 */
export const loadLangFromCookies = (): string | null => {
  if (!isBrowser) return null;

  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith("lang=")) {
      return cookie.substring(5);
    }
  }
  return null;
};
