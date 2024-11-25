import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/styles/animate.css"; // @see https://animate.style/
import "@/styles/globals.css";
import "@/styles/nprogress.css";
import "@/styles/utility-patterns.css";

// core styles shared by all of react-notion-x (required)
import { BLOG } from "@/blog.config";
import { AdSlot } from "@/components/GoogleAdsense";
import { GlobalContextProvider } from "@/lib/providers/globalProvider";
import { ThemeGitbookProvider } from "@/lib/providers/themeGitbookProvider";
import "@/styles/notion.css"; //  Override some styles
import Announcement from "@/themes/gitbook/components/Announcement";
import ArticleInfo from "@/themes/gitbook/components/ArticleInfo";
import BottomMenuBar from "@/themes/gitbook/components/BottomMenuBar";
import CustomedTransiton from "@/themes/gitbook/components/CustomedTransiton";
import FloatTocButton from "@/themes/gitbook/components/FloatTocButton";
import Footer from "@/themes/gitbook/components/Footer";
import InfoCard from "@/themes/gitbook/components/InfoCard";

import PageNavDrawer from "@/themes/gitbook/components/PageNavDrawer";
import NavPostList from "@/themes/gitbook/components/records/NavPostList";
import Style from "@/themes/gitbook/Style";
//import dynamic from "next/dynamic";
import "react-notion-x/src/styles.css";
import JumpToTopButton from "@/themes/gitbook/components/JumpToTopButton";
import JumpToBackButton from "@/themes/gitbook/components/JumpToBackButton";
import TopNavBar from "@/themes/gitbook/components/TopNavBar";

// Various extensions, animations, etc.
///const ExternalPlugins = dynamic(() => import("@/components/ExternalPlugins"));

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

              <main
                id="wrapper"
                className={
                  "relative flex justify-between w-full h-full mx-auto"
                }
              >
                {/* 왼쪽 네브바 */}
                <div
                  className={
                    "font-sans hidden md:block border-r dark:border-transparent relative z-10 "
                  }
                >
                  <div className="w-72  px-6 sticky top-0 overflow-y-scroll my-16 h-screen ">
                    {/* {slotLeft} */}
                    {/* <SearchInput  /> */}
                    <div className="mb-20">
                      {/* 모든 기사 목록 */}
                      {/* <NavPostList filteredNavPages={filteredNavPages} /> */}
                      <NavPostList />
                    </div>
                  </div>

                  <div className="w-72 fixed left-0 bottom-0 z-20 bg-white dark:bg-black">
                    <Footer />
                  </div>
                </div>

                <div
                  id="center-wrapper"
                  className="flex flex-col w-full relative z-10 pt-14 min-h-screen"
                >
                  <div className="flex flex-col justify-between w-full relative z-10  ">
                    <div
                      id="container-inner"
                      className="w-full px-7 max-w-3xl justify-center mx-auto"
                    >
                      {/* {slotTop} */}

                      <CustomedTransiton>{children}</CustomedTransiton>

                      {/* Google ads */}
                      {/* <AdSlot type="in-article" /> */}

                      {/* Back button */}
                      <JumpToTopButton />
                      <JumpToBackButton />
                    </div>

                    {/* bottom */}
                    <div className="md:hidden mb:16">
                      {/* <Footer {...props} /> */}
                      <Footer />
                    </div>
                  </div>
                </div>

                {/*  오른쪽 슬라이딩 서랍 */}
                <div
                  style={{ width: "32rem" }}
                  className={
                    "hidden xl:block dark:border-transparent relative z-10 border-l  border-neutral-200  "
                  }
                >
                  <div className="py-14 px-6 sticky top-0">
                    {/* <ArticleInfo
                      post={props?.post ? props?.post : props.notice}
                    /> */}
                    <ArticleInfo />
                    <div className="py-4 justify-center">
                      {/* <Catalog {...props} /> */}
                      {/* {slotRight} */}

                      <InfoCard />

                      {/* gitbook 테마 홈페이지에는 공지사항만 표시됩니다. */}

                      <Announcement />
                    </div>

                    {/* <AdSlot type="in-article" /> */}
                  </div>
                </div>
              </main>

              <FloatTocButton />

              {/* 모바일 탐색 창 */}
              <PageNavDrawer />

              {/* 모바일 하단 탐색 메뉴 */}
              <BottomMenuBar />
              {/* <BottomMenuBar /> */}
            </div>
            {children}
          </ThemeGitbookProvider>
        </GlobalContextProvider>
      </body>
    </html>
  );
}
