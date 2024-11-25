"use client";
import { createContext, useContext, Dispatch, SetStateAction } from "react";

type Props = {};

export interface GitBookGlobalContext {
  tocVisible: boolean;
  changeTocVisible: Dispatch<SetStateAction<boolean>>;
  // Newly added properties
  pageNavVisible: boolean;
  changePageNavVisible: Dispatch<SetStateAction<boolean>>;

  allNavPages: any[]; // Replace `any` with the actual type of navigation pages
  allNavPagesForGitBook: any[]; // Replace `any` with the actual type if known
  setFilteredNavPages: Dispatch<SetStateAction<any[]>>; // Replace `any[]` with the specific type of navigation pages if known
}

// Create the context with an initial value of undefined
const ThemeGlobalGitbook = createContext<GitBookGlobalContext | undefined>(
  undefined
);

//const ThemeGlobalGitbook = createContext();
// const GitbookThemeProvider = (props: Props) => {
//   return <div>gitbookTheme-provider</div>;
// };

export const useGitBookGlobal = (): GitBookGlobalContext => {
  const context = useContext(ThemeGlobalGitbook);
  if (!context) {
    throw new Error(
      "useGitBookGlobal must be used within a ThemeGlobalGitbook.Provider"
    );
  }
  return context;
};
export default ThemeGlobalGitbook;
/**
 *
 *
 * { pageNavVisible, changePageNavVisible }
 * { tocVisible, changeTocVisible }
 * { tocVisible, changeTocVisible }
 * { setFilteredNavPages, allNavPages, allNavPagesForGitBook }
 */
