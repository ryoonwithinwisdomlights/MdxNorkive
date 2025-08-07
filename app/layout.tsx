import { BLOG } from "@/blog.config";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { RootProvider } from "fumadocs-ui/provider";
import { GeistSans } from "geist/font/sans";
import type { Metadata, Viewport } from "next";
import "./../styles/globals.css";

// import initArchiveGlobalData from "@/lib/notion/controller";
import TopNavigationWrapper from "@/modules/common/layout/components/TopNavigationWrapper";

import { GeneralSiteSettingsProvider } from "@/lib/context/GeneralSiteSettingsProvider";

import { ModalProvider } from "@/lib/context/ModalProvider";

import { ChildrenProp } from "@/types";

import { MenuProvider } from "@/lib/context/MenuProvider";
import { NavInfoProvider } from "@/lib/context/NavInfoProvider";

import { config } from "@fortawesome/fontawesome-svg-core";
import { fetchAllRecordList, fetchMenuList } from "./api/fetcher";
import {
  recordSource,
  bookSource,
  engineeringSource,
  projectSource,
} from "@/lib/source";
import { LoaderConfig, Page, PageData } from "fumadocs-core/source";
import AuxiliaryBlogComponent from "@/modules/common/layout/components/AuxiliaryComponent";
import BottomMenuBar from "@/modules/common/menu/BottomMenuBar";
import JumpToTopButton from "@/modules/shared/JumpToTopButton";
import JumpToBackButton from "@/modules/shared/JumpToBackButton";
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
  const recordPages = recordSource.getPages();
  const bookPages = bookSource.getPages();
  const engineeringPages = engineeringSource.getPages();
  const projectPages = projectSource.getPages();
  // console.log("recordPages::", recordPages);
  // console.log("bookPages::", bookPages);

  const allPages: Page<LoaderConfig["source"]["pageData"]>[] = [
    ...recordPages,
    ...bookPages,
    ...engineeringPages,
    ...projectPages,
  ];

  // 직렬화 가능한 형태로 변환
  const serializedAllPages = allPages.map((page) => ({
    file: {
      dirname: page.file.dirname,
      name: page.file.name,
      ext: page.file.ext,
      path: page.file.path,
      flattenedPath: page.file.flattenedPath,
    },
    absolutePath: page.absolutePath,
    path: page.path,
    url: page.url,
    slugs: page.slugs,
    data: page.data,
    locale: page.locale,
  }));

  return (
    <html lang="en" suppressHydrationWarning className={GeistSans.className}>
      <body>
        <RootProvider theme={{ enabled: false }}>
          <MenuProvider menuData={menuData}>
            {/* <EssentialNavInfoProvider
            globalNotionData={globalNotionData}
            from={"index"}
          > */}
            <NavInfoProvider
              recordList={recordList}
              serializedAllPages={serializedAllPages}
            >
              <GeneralSiteSettingsProvider>
                <div
                  id="gitbook"
                  className={` w-screen h-screen justify-center dark:text-neutral-300  pb-16  md:pb-0 `}
                >
                  <AuxiliaryBlogComponent />
                  {/* <Suspense fallback={<LoadingCover />}> */}

                  <TopNavigationWrapper />

                  <div className=" dark:bg-black dark:text-neutral-300 py-10 flex flex-col overflow-y-auto h-screen  scrollbar-hide overscroll-contain ">
                    {children}
                  </div>

                  {/* <LeftNavigationBar /> */}

                  {/* </Suspense> */}
                  <JumpToTopButton />
                  <JumpToBackButton />

                  <BottomMenuBar />

                  <ModalProvider />
                </div>
                {/* <PageObserver /> */}
              </GeneralSiteSettingsProvider>
            </NavInfoProvider>
            {/* </EssentialNavInfoProvider> */}
          </MenuProvider>
        </RootProvider>
      </body>
    </html>
  );
}
