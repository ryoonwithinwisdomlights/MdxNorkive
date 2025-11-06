/**
 * Locale Dictionary Type Definition
 * 다국어 번역 딕셔너리 타입 정의
 */

// INTRO section types (exported for convenience)
export interface IntroFeatured {
  TITLE: string;
  DESC: string;
}

export interface IntroLatest {
  TITLE: string;
  DESC: string;
}

export interface IntroEntire {
  TITLE: string;
  DESC: string;
}

export interface IntroBook {
  SUBTITLE_1: string;
  SUBTITLE_2: string;
  TITLE: string;
  DESCRIPTION_PREFIX: string;
  DESCRIPTION_HIGHLIGHT_1: string;
  DESCRIPTION_HIGHLIGHT_2: string;
  DESCRIPTION_SUFFIX: string;
}

export interface IntroEngineering {
  SUBTITLE: string;
  TITLE: string;
  DESCRIPTION_PREFIX: string;
  DESCRIPTION_HIGHLIGHT_1: string;
  DESCRIPTION_HIGHLIGHT_2: string;
  DESCRIPTION_SUFFIX: string;
  DESCRIPTION_END?: string;
}

export interface IntroGeneral {
  SUBTITLE_1: string;
  SUBTITLE_2: string;
  TITLE: string;
  DESCRIPTION_PREFIX: string;
  DESCRIPTION_HIGHLIGHT_1: string;
  DESCRIPTION_HIGHLIGHT_2: string;
  DESCRIPTION_SUFFIX: string;
  DESCRIPTION_END?: string;
}

export interface IntroSection {
  FEATURED: IntroFeatured;
  LATEST: IntroLatest;
  ENTIRE: IntroEntire;
  READ_MORE: string;
  BOOK: IntroBook;
  ENGINEERING: IntroEngineering;
  GENERAL: IntroGeneral;
}

// COMMON section
export interface CommonSection extends Record<string, string> {
  ALL: string;
  OPTIONS: string;
  TAGS: string;
  TYPES: string;
  NO_TAG: string;
  CATEGORY: string;
  SHARE: string;
  URL_COPIED: string;
  COPYRIGHT_NOTICE: string;
  DEBUG_OPEN: string;
  DEBUG_CLOSE: string;
  LOADING: string;
  ANNOUNCEMENT: string;
  NO_DOCS_FOUND: string;
}

// RECORD section
export interface DocSection extends Record<string, string> {
  LAST_EDITED_TIME: string;
  VIEW: string;
  MINUTE: string;
  READING_TIME: string;
  WORD_COUNT: string;
  TABLE_OF_CONTENTS: string;
}

// LOCKED section
export interface LockedSection extends Record<string, string> {
  LOCKED: string;
  PASSWORD_SUBMIT: string;
  PASSWORD_ERROR: string;
  ARCHIVE_LOCK_TIPS: string;
  SUBMIT: string;
}

// PAGINATION section
export interface PaginationSection extends Record<string, string> {
  PREV: string;
  NEXT: string;
  PAGE: string;
  OF: string;
}

// SEARCH section
export interface SearchSection extends Record<string, string> {
  ARCHIVE: string;
  TAGS: string;
  CATEGORY: string;
  SEARCH_TERM: string;
  ENTER_SEARCH_TERM: string;
}

// ERROR section
export interface ErrorSection extends Record<string, string> {
  ERROR_OCCURRED: string;
  INVALID_DOC: string;
}

// FETCH section
export interface FetchSection extends Record<string, string> {
  ERROR_OCCURRED: string;
  PAGE_DATA_FAILED: string;
  INVALID_DOC: string;
}

// SITE section
export interface SiteSection extends Record<string, string> {
  BACK: string;
  TOP: string;
  SETTINGS: string;
  LOCALE: string;
  DISPLAY_LIGHT: string;
  LANG_CHANGE_SUCCESS_MSG: string;
  DEBUG_PANEL_TITLE: string;
}

// Main LocaleDict interface
export interface LocaleDict {
  LOCALE: string;
  LANGUAGE: string;
  LOADING: string;
  INTRO: IntroSection;
  COMMON: CommonSection;
  DOCS: DocSection;
  LOCKED: LockedSection;
  PAGINATION: PaginationSection;
  SEARCH: SearchSection;
  ERROR: ErrorSection;
  FETCH: FetchSection;
  SITE: SiteSection;
}

export type LocaleType = "en-US" | "kr-KR";

export type LocaleChangeHandler = (locale: LocaleDict) => void;
export type LangChangeHandler = (lang: string) => void;
