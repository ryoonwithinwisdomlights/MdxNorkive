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
import FloatTocButton from "@/components/FloatTocButton";
import Footer from "@/components/Footer";
import InfoCard from "@/components/InfoCard";
import JumpToBackButton from "@/components/JumpToBackButton";
import JumpToTopButton from "@/components/JumpToTopButton";
import PageNavDrawer from "@/components/PageNavDrawer";
import TopNavBar from "@/components/TopNavBar";
import CustomedTransitonWrapper from "@/components/wrapper/CustomedTransitonWrapper";
import { InitGlobalNotionData } from "@/lib/providers/provider";
import loadGlobalNotionData from "./api/load-globalNotionData";

import BottomMenuBar from "@/components/BottomMenuBar";
import Catalog from "@/components/Catalog";
import LoadingCover from "@/components/LoadingCover";
import AllNavRecordsList from "@/components/records/AllNavRecordsList";
import Busuanzi from "@/components/shared/Busuanzi";
import DebugPanel from "@/components/shared/DebugPanel";
import DisableCopy from "@/components/shared/DisableCopy";
import RightClickMenu from "@/components/shared/RightClickMenu";
import VConsoleTs from "@/components/shared/VConsoleTs";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Suspense } from "react";

import { ModalProvider } from "@/lib/providers/ModalProvider";
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
    ? new URL(BLOG.LINK)
    : new URL("http://localhost:3000"),
  title: BLOG.APP_NAME as string,
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
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initGlobalNotionData: InitGlobalNotionData =
    await loadGlobalNotionData("index");
  const now = Date.now();

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <GlobalContextProvider
          initGlobalNotionData={initGlobalNotionData}
          from={"index"}
        >
          <ThemeGitbookProvider>
            {/* <HandleOnComplete /> */}
            <div
              id="gitbook"
              className={`${BLOG.FONT_STYLE}  w-full h-screen   justify-center dark:text-neutral-300 scroll-smooth pb-16  md:pb-0 `}
            >
              {/* top navigation bar */}
              <TopNavBar />

              {!BLOG.isProd && <DebugPanel />}
              {!BLOG.CAN_COPY && <DisableCopy />}
              {BLOG.ANALYTICS_BUSUANZI_ENABLE && <Busuanzi />}
              {BLOG.CUSTOM_RIGHT_CLICK_CONTEXT_MENU && <RightClickMenu />}
              <VConsoleTs currentTime={now} />
              <Suspense fallback={<LoadingCover />}>
                <main
                  id="wrapper"
                  className={
                    "relative flex justify-between w-full min-h-screen  mx-auto"
                  }
                >
                  {/* left navigation bar */}
                  <div
                    className={
                      "font-sans hidden md:block w-3/12 min-h-screen dark:bg-neutral-900 border-r dark:border-transparent  z-10 "
                    }
                  >
                    {/* Search and list all articles */}
                    <AllNavRecordsList />
                    <div className="w-72 fixed left-0 bottom-0 z-20 bg-white  dark:bg-neutral-900">
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
                        <CustomedTransitonWrapper>
                          <ModalProvider />
                          {children}
                          {/* Back button */}
                          <JumpToTopButton />
                          <JumpToBackButton />
                        </CustomedTransitonWrapper>
                      </div>
                    </div>
                  </div>

                  {/*  right sliding drawer */}
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

                        <InfoCard />

                        <Announcement />
                      </div>
                    </div>
                  </div>
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
