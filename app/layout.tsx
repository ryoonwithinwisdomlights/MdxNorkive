import { BLOG } from "@/blog.config";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { RootProvider } from "fumadocs-ui/provider";
import { GeistSans } from "geist/font/sans";
import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import "./../styles/globals.css";

import { GeneralSiteSettingsProvider } from "@/lib/context/GeneralSiteSettingsProvider";

import { ModalProvider } from "@/lib/context/ModalProvider";

import { NavInfoProvider } from "@/lib/context/NavInfoProvider";

import {
  bookSource,
  engineeringSource,
  projectSource,
  recordSource,
} from "@/lib/source";
import { config } from "@fortawesome/fontawesome-svg-core";
import { LoaderConfig, Page } from "fumadocs-core/source";
import { fetchAllRecordList, fetchMenuList } from "./api/fetcher";

import MobileRightSidebarWrapper from "@/modules/common/right-sidebar/MobileRightSidebarWrapper";
import DefaultSearchDialog from "@/modules/common/search/search";
import AuxiliaryBlogComponent from "@/modules/layout/components/AuxiliaryComponent";
import MobileFooter from "@/modules/layout/components/mobile-footer";
import TopNavigationWrapper from "@/modules/layout/wrapper/TopNavigationWrapper";
import JumpToBackButton from "@/modules/shared/JumpToBackButton";
import JumpToTopButton from "@/modules/shared/JumpToTopButton";
import LoadingCover from "@/modules/shared/LoadingCover";
import { RecordFrontMatter } from "@/types/mdx.model";

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /**
   * 메뉴데이터
   * globalNotionData 따로
   */
  const menuList = await fetchMenuList();
  const recordList = await fetchAllRecordList();
  const recordPages = recordSource.getPages();
  const bookPages = bookSource.getPages();
  const engineeringPages = engineeringSource.getPages();
  const projectPages = projectSource.getPages();

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
    data: page.data as RecordFrontMatter,
    locale: page.locale,
  }));

  return (
    <html lang="en" suppressHydrationWarning className={GeistSans.className}>
      <body>
        <RootProvider
          search={{
            SearchDialog: DefaultSearchDialog,
            options: {
              defaultTag: "All",
              api: "/api/search",
            },
          }}
          theme={{ enabled: false }}
        >
          <NavInfoProvider
            recordList={recordList}
            serializedAllPages={serializedAllPages}
            menuList={menuList}
          >
            <GeneralSiteSettingsProvider>
              <div
                id="norkive-main"
                className={` w-screen h-screen justify-center dark:text-neutral-300  pb-16  md:pb-0 `}
              >
                <AuxiliaryBlogComponent />

                <TopNavigationWrapper />

                <div className=" dark:bg-black dark:text-neutral-300 py-10 flex flex-col overflow-y-auto h-screen  scrollbar-hide overscroll-contain ">
                  <Suspense fallback={<LoadingCover />}>{children}</Suspense>
                </div>

                <JumpToTopButton />
                <JumpToBackButton />

                <MobileRightSidebarWrapper />
                <MobileFooter />

                <ModalProvider />
              </div>
            </GeneralSiteSettingsProvider>
          </NavInfoProvider>
        </RootProvider>
      </body>
    </html>
  );
}
