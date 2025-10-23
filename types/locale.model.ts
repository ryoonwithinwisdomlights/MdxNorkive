/**
 * Locale Dictionary Type Definition
 * 다국어 번역 딕셔너리 타입 정의
 */

export interface LocaleDict {
  LOCALE: string;
  LANGUAGE: string;
  LOADING: string;
  INTRO: {
    FEATURED: {
      TITLE: string;
      DESC: string;
    };
    LATEST: {
      TITLE: string;
      DESC: string;
    };
    ENTIRE: {
      TITLE: string;
      DESC: string;
    };
    READ_MORE: string;
    BOOK: {
      SUBTITLE_1: string;
      SUBTITLE_2: string;
      TITLE: string;
      DESCRIPTION_PREFIX: string;
      DESCRIPTION_HIGHLIGHT_1: string;
      DESCRIPTION_HIGHLIGHT_2: string;
      DESCRIPTION_SUFFIX: string;
    };
    ENGINEERING: {
      SUBTITLE: string;
      TITLE: string;
      DESCRIPTION_PREFIX: string;
      DESCRIPTION_HIGHLIGHT_1: string;
      DESCRIPTION_HIGHLIGHT_2: string;
      DESCRIPTION_SUFFIX: string;
      DESCRIPTION_END?: string;
    };
    GENERAL: {
      SUBTITLE_1: string;
      SUBTITLE_2: string;
      TITLE: string;
      DESCRIPTION_PREFIX: string;
      DESCRIPTION_HIGHLIGHT_1: string;
      DESCRIPTION_HIGHLIGHT_2: string;
      DESCRIPTION_SUFFIX: string;
      DESCRIPTION_END?: string;
    };
  };
  COMMON: {
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
    NO_RECORD_FOUND: string;
  };
  RECORD: {
    LAST_EDITED_TIME: string;
    VIEW: string;
    MINUTE: string;
    READING_TIME: string;
    WORD_COUNT: string;
    TABLE_OF_CONTENTS: string;
  };
  LOCKED: {
    LOCKED: string;
    PASSWORD_SUBMIT: string;
    PASSWORD_ERROR: string;
    ARCHIVE_LOCK_TIPS: string;
    SUBMIT: string;
  };
  PAGINATION: {
    PREV: string;
    NEXT: string;
    PAGE: string;
    OF: string;
  };
  SEARCH: {
    ARCHIVE: string;
    TAGS: string;
    CATEGORY: string;
    SEARCH_TERM: string;
    ENTER_SEARCH_TERM: string;
  };
  ERROR: {
    ERROR_OCCURRED: string;
    INVALID_RECORD: string;
  };
  FETCH: {
    ERROR_OCCURRED: string;
    PAGE_DATA_FAILED: string;
    INVALID_RECORD: string;
  };
  SITE: {
    BACK: string;
    TOP: string;
    SETTINGS: string;
    LOCALE: string;
    DISPLAY_LIGHT: string;
    LANG_CHANGE_SUCCESS_MSG: string;
    DEBUG_PANEL_TITLE: string;
  };
}

export type LocaleType = "en-US" | "kr-KR";

export type LocaleChangeHandler = (locale: LocaleDict) => void;
export type LangChangeHandler = (lang: string) => void;
