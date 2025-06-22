import type { Metadata, Viewport } from "next";
import "./../styles/animate.css"; // @see https://animate.style/
import "./../styles/globals.css";
import "./../styles/utility-patterns.css";

// used for code syntax highlighting (optional)
import "prismjs/themes/prism-tomorrow.css";
// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css";
// global style overrides for notion
import "./../styles/notion.css";
// global style overrides for prism theme (optional)
import "./../styles/prism-theme.css";
// used for rendering equations (optional)
import { BLOG } from "@/blog.config";
import { GlobalContextProvider } from "@/context/globalProvider";
import { ThemeGitbookProvider } from "@/context/themeGitbookProvider";
import "katex/dist/katex.min.css";

import FloatTocButton from "@/modules/common/components/FloatTocButton";
import PageNavDrawer from "@/modules/layout/components/navigation-post/PageNavDrawer";

import loadGlobalNotionData from "@/lib/data/load-globalNotionData";
import BottomMenuBar from "@/modules/common/components/menu/BottomMenuBar";
import LoadingCover from "@/modules/common/icons/LoadingCover";
import TopNavBar from "@/modules/layout/components/navigation-post/TopNavBar";
import { InitGlobalNotionData } from "@/types/provider.model";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Suspense } from "react";

import LeftNavigationBar from "@/modules/layout/templates/LeftNavigationBar";
import MainLayoutWrapper from "@/modules/layout/templates/MainLayoutWrapper";
import RightSlidingDrawer from "@/modules/layout/templates/RightSlidingDrawer";
import { LayoutProps } from "@/types";
import AuxiliaryBlogComponent from "@/modules/layout/components/AuxiliaryBlogComponent";

config.autoAddCss = false;

export const viewport: Viewport = {
  // themeColor: "normal",
  colorScheme: "normal",
  width: "device-width",
  initialScale: 1.0,
  minimumScale: 1.0,
  maximumScale: 5.0,
};

export const metadata: Metadata = {
  metadataBase: BLOG.isProd
    ? new URL(BLOG.LINK as string)
    : new URL("http://localhost:3000"),
  // title: BLOG.APP_NAME as string,
  title: {
    template: "Norkive - %s",
    default: BLOG.APP_NAME as string, // 템플릿을 설정할때 default는 필수 요소입니다.
  },
  description: BLOG.DESCRIPTION as string, //
  applicationName: BLOG.APP_NAME as string,
  authors: {
    url: BLOG.LINK,
    name: BLOG.AUTHOR,
  },
  keywords: BLOG.KEYWORDS,
  icons: {
    icon: BLOG.BLOG_FAVICON,
  },
  openGraph: {
    type: "website",
    title: BLOG.TITLE,
    description: BLOG.DESCRIPTION,
    siteName: BLOG.TITLE,
    images: "/images/norkive_black.png",
    url: BLOG.LINK,
  },
  category: BLOG.KEYWORDS || "Software Technology", // section Mainly like category Such classification, Facebook Use this to capture link categories,
  twitter: {
    card: "summary_large_image",
    description: BLOG.DESCRIPTION,
    title: BLOG.TITLE,
  },
};

/**
 * 
 * Root Layout (Required)
  The root layout is defined at the top level of the app directory 
  and applies to all routes. This layout is required and must contain 
  html and body tags, allowing you to modify the initial HTML 
  returned from the server.
 * 
 * 
 * 
 */
export default async function RootLayout({ children }: LayoutProps) {
  const initGlobalNotionData: InitGlobalNotionData =
    await loadGlobalNotionData("index");

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <GlobalContextProvider
          initGlobalNotionData={initGlobalNotionData}
          from={"index"}
        >
          <ThemeGitbookProvider>
            <div
              id="gitbook"
              className={`${BLOG.FONT_STYLE}  w-full h-screen justify-center dark:text-neutral-300 scroll-smooth pb-16  md:pb-0 `}
            >
              <TopNavBar />
              <AuxiliaryBlogComponent />

              <Suspense fallback={<LoadingCover />}>
                <main
                  id="wrapper"
                  className={
                    "relative flex justify-between w-full min-h-screen  mx-auto"
                  }
                >
                  {/* left navigation bar */}
                  <LeftNavigationBar />
                  <MainLayoutWrapper> {children}</MainLayoutWrapper>
                  {/*  right sliding drawer */}
                  <RightSlidingDrawer />
                </main>
              </Suspense>
              <FloatTocButton />

              {/*Mobile navigation drawer*/}
              <PageNavDrawer />

              {/* Mobile bottom navigation bar */}
              <BottomMenuBar />
            </div>
          </ThemeGitbookProvider>
        </GlobalContextProvider>
      </body>
    </html>
  );
}
