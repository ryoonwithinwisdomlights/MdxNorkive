import type { Metadata, Viewport } from "next";
import "./../styles/animate.css"; // @see https://animate.style/
import "./../styles/globals.css";
import "./../styles/utility-patterns.css";

// used for code syntax highlighting (optional)
import "prismjs/themes/prism-coy.css";
// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css";
// global style overrides for notion
import "./../styles/notion.css";
// global style overrides for prism theme (optional)
import "./../styles/prism-theme.css";

import { BLOG } from "@/blog.config";
import { GlobalContextProvider } from "@/lib/providers/globalProvider";
import { ThemeGitbookProvider } from "@/lib/providers/themeGitbookProvider";

import Announcement from "@/components/Announcement";
import ArticleInfo from "@/components/ArticleInfo";
import BottomMenuBar from "@/components/BottomMenuBar";
import FloatTocButton from "@/components/FloatTocButton";
import Footer from "@/components/Footer";
import InfoCard from "@/components/InfoCard";
import JumpToBackButton from "@/components/JumpToBackButton";
import JumpToTopButton from "@/components/JumpToTopButton";
import PageNavDrawer from "@/components/PageNavDrawer";
import NavPostList from "@/components/records/NavPostList";
import TopNavBar from "@/components/TopNavBar";
import CustomedTransitonWrapper from "@/components/wrapper/CustomedTransitonWrapper";
import { HandleOnComplete } from "@/lib/custom-router";
import { InitGlobalNotionData } from "@/lib/providers/provider";
import dynamic from "next/dynamic";
import loadGlobalNotionData from "./api/load-globalNotionData";

import Catalog from "@/components/Catalog";
import PageLoader from "@/components/ui/page-loader";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Suspense } from "react";
import DisableCopy from "@/components/shared/DisableCopy";
import DebugPanel from "@/components/shared/DebugPanel";
import CustomContextMenu from "@/components/shared/CustomContextMenu";
import { siteConfig } from "@/lib/config";

config.autoAddCss = false;
// Various extensions, animations, etc.
const ExternalPlugins = dynamic(
  () => import("@/components/shared/ExternalPlugins")
);

export const viewport: Viewport = {
  // themeColor: "normal",
  colorScheme: "normal",
  width: "device-width",
  initialScale: 1.0,
  minimumScale: 1.0,
  maximumScale: 5.0,
};

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: BLOG.TITLE as string,
  description: BLOG.DESCRIPTION as string, //"The GitBook-themed Archiving records blog",
  applicationName: "Yeollamsil",
  authors: {
    url: BLOG.LINK,
    name: BLOG.AUTHOR,
  },
  keywords: BLOG.KEYWORDS,
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
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
            <HandleOnComplete />
            <div
              id="gitbook"
              className={`${BLOG.FONT_STYLE} bg-white w-full h-full min-h-screen justify-center dark:text-neutral-300 scroll-smooth pb-16 md:pb-0 dark:bg-black`}
            >
              {/* 상단 네비게이션 바 */}
              <TopNavBar />

              <Suspense fallback={<PageLoader />}>
                <main
                  id="wrapper"
                  className={
                    "relative flex justify-between w-full h-full mx-auto"
                  }
                >
                  {/* 왼쪽 네브바 */}
                  <div
                    className={
                      "font-sans hidden w-3/12  md:block border-r dark:border-transparent relative z-10 "
                    }
                  >
                    <div className="w-72 px-6 py-2 sticky top-0 overflow-y-scroll my-16 h-screen ">
                      {/* {slotLeft} */}
                      {/* <SearchInput  /> */}
                      <div className="mb-20">
                        {/* 모든 기사 목록 */}
                        <NavPostList />
                      </div>
                    </div>

                    <div className="w-72 fixed left-0 bottom-0 z-20 bg-white dark:bg-black">
                      <Footer />
                    </div>
                  </div>

                  <div
                    id="center-wrapper"
                    className="flex flex-col w-full relative z-10 pt-14 min-h-screen bg-white dark:bg-black dark:text-neutral-300"
                  >
                    <div className="flex flex-col justify-between w-full relative z-10  ">
                      <div
                        id="container-inner"
                        className="w-full px-7 max-w-3xl justify-center mx-auto"
                      >
                        {/* {slotTop} */}
                        <CustomedTransitonWrapper>
                          {children}
                        </CustomedTransitonWrapper>
                        {/* Back button */}
                      </div>
                      {/* bottom */}
                      <div className="md:hidden mb:16">
                        <Footer />
                      </div>
                    </div>
                  </div>

                  {/*  오른쪽 슬라이딩 서랍 */}
                  <div
                    // style={{ width: "32rem" }}
                    className={
                      "hidden w-3/12 xl:block dark:border-transparent relative z-10 border-l border-neutral-200"
                    }
                  >
                    <div className="py-14 px-6 sticky top-0">
                      <ArticleInfo />
                      <div className="py-4 justify-center">
                        <Catalog post={null} />
                        {/* {slotRight}  */}
                        <InfoCard />

                        <Announcement />
                      </div>
                    </div>
                  </div>
                </main>
              </Suspense>
              <FloatTocButton />
              <JumpToTopButton />
              <JumpToBackButton />
              {/* 모바일 탐색 창 */}
              <PageNavDrawer />

              {/* 모바일 하단 탐색 메뉴 */}
              <BottomMenuBar />
            </div>

            {!BLOG.isProd && <DebugPanel />}
            {!BLOG.CAN_COPY && <DisableCopy />}
            {BLOG.CUSTOM_RIGHT_CLICK_CONTEXT_MENU && (
              <CustomContextMenu props={Math.random()} />
            )}
          </ThemeGitbookProvider>
        </GlobalContextProvider>
      </body>
    </html>
  );
}
