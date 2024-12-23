import KaTeX from "katex";
import { ReactNode } from "react";
export type KaTeXProps = {
  children?: string;
  math?: string;
  block?: boolean;
  errorColor?: string;
  renderError?: (error: Error) => ReactNode;
  settings?: KaTeX.KatexOptions;
  as?: keyof JSX.IntrinsicElements;
  [key: string]: any; // 추가적인 prop 허용
};

export type InnerHtmlStateProps = {
  innerHtml: string | TrustedHTML;
  errorElement?: ReactNode;
};

export type ChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";
