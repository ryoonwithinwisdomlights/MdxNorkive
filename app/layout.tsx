import { BLOG } from "@/blog.config";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { GeistSans } from "geist/font/sans";
import type { Metadata, Viewport } from "next";
import "./../styles/globals.css";

// import initArchiveGlobalData from "@/lib/notion/controller";
import TopNavBar from "@/modules/layout/components/TopNavBar";

import { GeneralSiteSettingsProvider } from "@/lib/context/GeneralSiteSettingsProvider";

import { ModalProvider } from "@/lib/context/ModalProvider";
import JumpToTopButton from "@/modules/common/components/JumpToTopButton";
import { ChildrenProp } from "@/types";
import MainLayoutWrapper from "../modules/layout/templates/MainLayoutWrapper";

import { MenuProvider } from "@/lib/context/MenuProvider";
import { NavInfoProvider } from "@/lib/context/NavInfoProvider";
import JumpToBackButton from "@/modules/common/components/JumpToBackButton";
import { config } from "@fortawesome/fontawesome-svg-core";
import { fetchAllRecordList, fetchMenuList } from "./api/fetcher";

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
  /**
   * 메뉴데이터
   * globalNotionData 따로
   */
  const menuData = await fetchMenuList();
  const recordList = await fetchAllRecordList();
  return (
    <html lang="en" suppressHydrationWarning className={GeistSans.className}>
      <body>
        <MenuProvider menuData={menuData}>
          {/* <EssentialNavInfoProvider
            globalNotionData={globalNotionData}
            from={"index"}
          > */}
          <NavInfoProvider recordList={recordList}>
            <GeneralSiteSettingsProvider>
              <div
                id="gitbook"
                className={`${BLOG.FONT_STYLE}  w-screen h-screen justify-center dark:text-neutral-300  pb-16  md:pb-0 `}
              >
                <TopNavBar />
                {/* <AuxiliaryBlogComponent /> */}
                {/* <Suspense fallback={<LoadingCover />}> */}
                <div className=" w-screen md:flex md:flex-row justify-center ">
                  <div className="w-screen h-screen justify-center ">
                    {/* <LeftNavigationBar /> */}
                    <MainLayoutWrapper>{children}</MainLayoutWrapper>
                  </div>
                </div>
                {/* </Suspense> */}
                <JumpToTopButton />
                <JumpToBackButton />

                {/* <MobileLeftNavDrawer /> */}

                {/* <BottomMenuBar />
                 */}
                <ModalProvider />
              </div>
              {/* <PageObserver /> */}
            </GeneralSiteSettingsProvider>
          </NavInfoProvider>
          {/* </EssentialNavInfoProvider> */}
        </MenuProvider>
      </body>
    </html>
  );
}
