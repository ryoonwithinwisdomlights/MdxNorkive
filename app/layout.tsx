import { BLOG } from "@/blog.config";
import { GeistSans } from "geist/font/sans";
import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
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

import "katex/dist/katex.min.css";

import MobileLeftNavDrawer from "@/modules/layout/components/MobileLeftNavDrawer";

// import initArchiveGlobalData from "@/lib/notion/controller";
import BottomMenuBar from "@/modules/layout/components/menu/BottomMenuBar";
import LoadingCover from "@/modules/common/ui/LoadingCover";
import TopNavBar from "@/modules/layout/components/TopNavBar";

import { EssentialNavInfoProvider } from "@/lib/context/EssentialNavInfoProvider";
import { GeneralSiteSettingsProvider } from "@/lib/context/GeneralSiteSettingsProvider";
import AuxiliaryBlogComponent from "@/modules/layout/components/AuxiliaryComponent";

import { PageObserver } from "@/lib/context/PageObserver";
import JumpToTopButton from "@/modules/common/components/JumpToTopButton";
import { ChildrenProp } from "@/types";
import MainLayoutWrapper from "../modules/layout/templates/MainLayoutWrapper";
import LeftNavigationBar from "@/modules/layout/components/LeftNavigationBar";
import { ModalProvider } from "@/lib/context/ModalProvider";

import { config } from "@fortawesome/fontawesome-svg-core";
import JumpToBackButton from "@/modules/common/components/JumpToBackButton";
import { getAllRecordPageListByType } from "@/lib/notion/controller";
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
  const globalNotionData = await getAllRecordPageListByType({
    from: "main-layout",
  });
  const { allPagesForLeftNavBar } = globalNotionData;
  return (
    <html lang="en" suppressHydrationWarning className={GeistSans.className}>
      <body>
        <EssentialNavInfoProvider
          globalNotionData={globalNotionData}
          from={"index"}
        >
          <GeneralSiteSettingsProvider
            allPagesForLeftNavBar={allPagesForLeftNavBar}
          >
            <div
              id="gitbook"
              className={`${BLOG.FONT_STYLE}  w-screen h-screen justify-center dark:text-neutral-300  pb-16  md:pb-0 `}
            >
              <TopNavBar />
              <AuxiliaryBlogComponent />
              <Suspense fallback={<LoadingCover />}>
                <div className=" w-screen md:flex md:flex-row justify-center ">
                  <div className="w-screen h-screen justify-center ">
                    <LeftNavigationBar />
                    <MainLayoutWrapper>{children}</MainLayoutWrapper>
                  </div>
                </div>
              </Suspense>
              <JumpToTopButton />
              <JumpToBackButton />
              {/*Mobile navigation drawer*/}
              <MobileLeftNavDrawer />
              {/* Mobile bottom navigation bar */}
              <BottomMenuBar />
              <ModalProvider />
            </div>
            <PageObserver />
          </GeneralSiteSettingsProvider>
        </EssentialNavInfoProvider>
      </body>
    </html>
  );
}
