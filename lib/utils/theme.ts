import { BLOG } from "@/blog.config";
import { getQueryVariable } from "./general";

/**
 * Initialize topic, priorityquery > localstorage > systemPrefer
 * @param isDarkMode
 * @param updateDarkMode Change themeChangeState function
 * @description Read the user theme stored in the localstorage
 */
export const initDarkMode = (
  updateDarkMode: (isDark: boolean) => void
): void => {
  // Check if the user's device browser is in dark mode
  let newDarkMode: boolean = isPreferDark();

  // Check whether the user record in localStorage is in dark mode
  const userDarkMode = loadDarkModeFromLocalStorage();
  if (userDarkMode) {
    newDarkMode = userDarkMode === "dark" || userDarkMode === "true";
    saveDarkModeToLocalStorage(newDarkMode); //  Only saved manually by the user
  }

  // Whether the dark mode is in the url query condition
  const queryMode = getQueryVariable("mode");
  if (queryMode && typeof queryMode === "string") {
    newDarkMode = queryMode === "dark";
  }

  updateDarkMode(newDarkMode);
  // saveDarkModeToCookies(newDarkMode);
  document
    .getElementsByTagName("html")[0]
    .setAttribute("class", newDarkMode ? "dark" : "light");
};

/**
 * Whether to give priority to dark mode is determined based on the system dark mode and the current time.
 * @returns {*}
 */
export function isPreferDark(): boolean {
  if (BLOG.APPEARANCE === "dark") {
    return true;
  }
  if (BLOG.APPEARANCE === "auto") {
    // When the system is in dark mode or the time is night, force it to night mode
    const date = new Date();
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const darkTime = BLOG.APPEARANCE_DARK_TIME;
    if (darkTime && darkTime[0] !== undefined && darkTime[1] !== undefined) {
      return (
        prefersDarkMode ||
        date.getHours() >= Number(darkTime[0]) ||
        date.getHours() < Number(darkTime[1])
      );
    }
    return prefersDarkMode;
  }
  return false;
}

/**
 * Read dark mode
 * @returns {*}
 */
export const loadDarkModeFromLocalStorage = () => {
  return localStorage.getItem("darkMode");
};

/**
 * Save dark mode
 * @param newTheme
 */
export const saveDarkModeToLocalStorage = (newTheme: boolean): void => {
  localStorage.setItem("darkMode", String(newTheme));
};

/**
 * Read dark mode
 * @returns {*}
 */
export const getThemeByLocalStorage = () => {
  return localStorage.getItem("darkMode");
};

/**
 * Save dark mode
 * @param newTheme
 */
export const setThemeByLocalStorage = (newTheme: boolean): void => {
  localStorage.setItem("darkMode", String(newTheme));
};
