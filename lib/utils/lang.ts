import { ENG_LANG } from "@/constants/en-lang.constants";
import { KOR_LANG } from "@/constants/kr-lang.constants";
import { getQueryVariable, isBrowser, mergeDeep } from "./general";

/**
 * Configure all supported languages here
 * country / region
 */
export const dictionaries = {
  "en-US": ENG_LANG,
  "kr-KR": KOR_LANG,
};

export type LocaleType = keyof typeof dictionaries; // 'en-US' | 'kr-KR'
export function getDictionary(locale: LocaleType) {
  return dictionaries[locale];
}

export const getFilteredDictionaryList = (currentLang) => {
  return Object.keys(dictionaries)
    .filter((key) => key !== currentLang)
    .reduce((obj, key) => {
      obj[key] = dictionaries[key];
      return obj;
    }, {});
};

export const getFilteredDictionaryListKey = (currentLang) => {
  return Object.keys(dictionaries)
    .filter((key) => key !== currentLang)
    .join();
};

/**
 * Get the current language dictionary
 * If the complete "country-region" language is matched, the country's language is displayed
 * @returns the corresponding dictionaries of different languages
 */
export function generateLocaleDict(langString) {
  //BLOG.LANG
  const supportedLocales = Object.keys(dictionaries); //우리가 지원
  let userLocale;

  // Split the language string into language and region code, for example(예: "kr-KR"을 "kr" 및 "KR"으로 분할).
  const [language, region] = langString.split(/[-_]/);

  // Prioritize matching of both language and region
  const specificLocale = `${language}-${region}`;
  if (supportedLocales.includes(specificLocale)) {
    userLocale = dictionaries[specificLocale];
  }

  // Then try to match only the language matches
  if (!userLocale) {
    const languageOnlyLocales: any[] = supportedLocales.filter((locale) =>
      locale.startsWith(language)
    );
    if (languageOnlyLocales.length > 0) {
      userLocale = dictionaries[languageOnlyLocales[0]];
    }
  }

  // If no match is found, the closest language pack is returned.
  if (!userLocale) {
    const fallbackLocale: any = supportedLocales.find((locale) =>
      locale.startsWith("en")
    );
    userLocale = dictionaries[fallbackLocale];
  }

  return mergeDeep({}, dictionaries["en-US"], userLocale);
}

/**
 * 사이트 번역 초기화
 * 사용자의 현재 브라우저 언어에 따라 전환
 */
export function initLocale(lang, locale, changeLang, changeLocale) {
  if (isBrowser) {
    const queryLang =
      getQueryVariable("lang") ||
      loadLangFromLocalStorage() ||
      window.navigator.language;
    let currentLang = lang;
    if (queryLang !== lang) {
      currentLang = queryLang;
    }
    changeLang(currentLang);
    saveLangToLocalStorage(currentLang);

    const targetLocale = generateLocaleDict(currentLang);
    if (JSON.stringify(locale) !== JSON.stringify(currentLang)) {
      changeLocale(targetLocale);
    }
  }
}
/**
 * 언어 read
 * @returns {*}
 */
export const loadLangFromLocalStorage = () => {
  return localStorage.getItem("lang");
};
/**
 * 언어 저장
 * @param newTheme
 */
export const saveLangToLocalStorage = (lang) => {
  localStorage.setItem("lang", lang);
};
