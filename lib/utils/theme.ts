import { BLOG } from "@/blog.config";
import cookie from "react-cookies";
import { getQueryVariable } from "./utils";

/**
 * Initialize topic, priorityquery > cookies > systemPrefer
 * @param isDarkMode
 * @param updateDarkMode Change themeChangeState function
 * @description Read the user theme stored in the cookie
 */
export const initDarkMode = (updateDarkMode) => {
  // Check if the user's device browser is in dark mode
  let newDarkMode = isPreferDark();

  // Check whether the user forces dark mode in the cookie
  const cookieDarkMode = loadDarkModeFromCookies();
  if (cookieDarkMode) {
    newDarkMode = JSON.parse(cookieDarkMode);
  }

  // Whether the dark mode is in the url query condition
  const queryMode = getQueryVariable("mode");
  if (queryMode) {
    newDarkMode = queryMode === "dark";
  }

  updateDarkMode(newDarkMode);
  saveDarkModeToCookies(newDarkMode);
  document
    .getElementsByTagName("html")[0]
    .setAttribute("class", newDarkMode ? "dark" : "light");
};

/**
 * Whether to give priority to dark mode is determined based on the system dark mode and the current time.
 * @returns {*}
 */
export function isPreferDark() {
  if (BLOG.APPEARANCE === "dark") {
    return true;
  }
  if (BLOG.APPEARANCE === "auto") {
    // When the system is in dark mode or the time is night, force it to night mode
    const date = new Date();
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return (
      prefersDarkMode ||
      (BLOG.APPEARANCE_DARK_TIME &&
        (date.getHours() >= Number(BLOG.APPEARANCE_DARK_TIME[0]) ||
          date.getHours() < Number(BLOG.APPEARANCE_DARK_TIME[1])))
    );
  }
  return false;
}

/**
 * Read dark mode
 * @returns {*}
 */
export const loadDarkModeFromCookies = () => {
  return cookie.load("darkMode");
};

/**
 * Save dark mode
 * @param newTheme
 */
export const saveDarkModeToCookies = (newTheme) => {
  cookie.save("darkMode", newTheme, { path: "/" });
};

/**
 * Read default theme
 * @returns {*}
 */
export const loadThemeFromCookies = () => {
  return cookie.load("theme");
};

/**
 * Save default theme
 * @param newTheme
 */
export const saveThemeToCookies = (newTheme) => {
  cookie.save("theme", newTheme, { path: "/" });
};
