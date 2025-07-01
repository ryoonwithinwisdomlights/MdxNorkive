import { BLOG } from "@/blog.config";
import { GeistSans } from "geist/font/sans";
import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
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
import "@fortawesome/fontawesome-svg-core/styles.css";
import "katex/dist/katex.min.css";

import MobileLeftNavDrawer from "@/modules/layout/components/navigation-post/MobileLeftNavDrawer";

import initGlobalNotionData from "@/lib/data/actions/notion/getNotionData";
import BottomMenuBar from "@/modules/common/components/menu/BottomMenuBar";
import LoadingCover from "@/modules/common/icons/LoadingCover";
import TopNavBar from "@/modules/layout/components/navigation-post/TopNavBar";
import { config } from "@fortawesome/fontawesome-svg-core";

import { EssentialNavInfoProvider } from "@/lib/context/EssentialNavInfoProvider";
import { GeneralSiteSettingsProvider } from "@/lib/context/GeneralSiteSettingsProvider";
import AuxiliaryBlogComponent from "@/modules/layout/components/AuxiliaryBlogComponent";

import { PageObserver } from "@/lib/context/PageObserver";
import JumpToTopButton from "@/modules/common/components/JumpToTopButton";
import { ChildrenProp } from "@/types";
import MainLayoutWrapper from "./MainLayoutWrapper";
import LeftNavigationBar from "@/modules/layout/templates/LeftNavigationBar";

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

export default async function RootLayout({ children }: ChildrenProp) {
  const globalNotionData = await initGlobalNotionData("main");

  return (
    <html lang="en" suppressHydrationWarning className={GeistSans.className}>
      <body>
        <EssentialNavInfoProvider
          globalNotionData={globalNotionData}
          from={"index"}
        >
          <GeneralSiteSettingsProvider
            allNavPagesForLeftSideBar={
              globalNotionData.allNavPagesForLeftSideBar
            }
          >
            <div
              id="gitbook"
              className={`${BLOG.FONT_STYLE}  w-screen h-screen justify-center dark:text-neutral-300  pb-16  md:pb-0 `}
            >
              <TopNavBar />
              <AuxiliaryBlogComponent />
              <Suspense fallback={<LoadingCover />}>
                {/* <div className="w-full  flex flex-col items-center justify-center"> */}
                <div className=" w-screen md:flex md:flex-row justify-center ">
                  <div className="w-screen h-screen justify-center ">
                    <LeftNavigationBar />
                    <MainLayoutWrapper>{children}</MainLayoutWrapper>
                  </div>
                </div>

                {/* </div> */}
              </Suspense>
              <JumpToTopButton />
              {/*Mobile navigation drawer*/}
              <MobileLeftNavDrawer />
              {/* Mobile bottom navigation bar */}
              <BottomMenuBar />
            </div>
            <PageObserver />
          </GeneralSiteSettingsProvider>
        </EssentialNavInfoProvider>
      </body>
    </html>
  );
}
