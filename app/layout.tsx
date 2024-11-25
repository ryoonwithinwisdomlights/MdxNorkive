import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/styles/animate.css"; // @see https://animate.style/
import "@/styles/globals.css";
import "@/styles/nprogress.css";
import "@/styles/utility-patterns.css";
import TopNavBar from "@/themes/gitbook/components/TopNavBar";
// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css";
import "@/styles/notion.css"; //  Override some styles

import { GlobalContextProvider } from "@/lib/global";

import dynamic from "next/dynamic";
import { isBrowser, loadExternalResource } from "@/lib/utils";
import { BLOG } from "@/blog.config";
import CommonScript from "@/components/CommonScript";
import { ThemeGitbookProvider } from "@/lib/providers/themeGitbookProvider";
import Style from "@/themes/gitbook/Style";

// Various extensions, animations, etc.
const ExternalPlugins = dynamic(() => import("@/components/ExternalPlugins"));
let url = BLOG.LINK;

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),

  title: "Yeollamsil",
  description: BLOG.DESCRIPTION, //"The GitBook-themed Archiving records blog",
  //   applicationName:"",
  authors: {
    url: BLOG.LINK,
    name: BLOG.AUTHOR,
  },
  keywords: BLOG.KEYWORDS,
  themeColor: BLOG.BACKGROUND_DARK,
  colorScheme: "normal",
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1.0,
    minimumScale: 1.0,
    maximumScale: 5.0,
    viewportFit: "auto",
  },
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/images/rwwt_lemon.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/images/rwwt_lemon.svg",
      },
    ],
  },
  openGraph: {
    type: "website",
    title: BLOG.TITLE,
    description: BLOG.DESCRIPTION,
    siteName: BLOG.TITLE,
    locale: BLOG.LANG,
    images: "/images/rwwt_lemon.png",
    url: BLOG.LINK,
  },
  category: BLOG.KEYWORDS || "Software Technology", // section Mainly like category Such classification, Facebook Use this to capture link categories,
  twitter: {
    card: "summary_large_image",
    description: BLOG.DESCRIPTION,
    title: BLOG.TITLE,
  },
};
const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <GlobalContextProvider>
          <ThemeGitbookProvider>
            <Style />
            <div
              id="theme-gitbook"
              className="bg-white dark:bg-hexo-black-neutral- w-full h-full min-h-screen justify-center dark:text-neutral-300 dark:bg-black"
            >
              {/* 상단 네비게이션 바 */}
              <TopNavBar />
            </div>
            {children}
          </ThemeGitbookProvider>
        </GlobalContextProvider>
      </body>
    </html>
  );
}
