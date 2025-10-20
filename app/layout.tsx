import { Suspense, lazy } from "react";
import { BLOG } from "@/blog.config";

//************* Font Awesome ************* */
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
//************* font ************* */
// import { Noto_Sans, Noto_Serif } from "next/font/google";

//************* Next ************* */
import type { Metadata, Viewport } from "next";

//************* Custom styles ************* */
import "./../styles/globals.css";

//************* Custom context ************* */
import { GeneralSiteSettingsProvider } from "@/lib/context/GeneralSiteSettingsProvider";
import { ModalProvider } from "@/lib/context/ModalProvider";
import { NavInfoProvider } from "@/lib/context/NavInfoProvider";
import { RootProvider } from "fumadocs-ui/provider";

//************* All Record sources ************* */
import {
  bookSource,
  engineeringSource,
  projectSource,
  recordSource,
} from "@/lib/source";

//************* Custom components ************* */
import MobileRightSidebarWrapper from "@/modules/common/right-sidebar/MobileRightSidebarWrapper";
import DefaultSearchDialog from "@/modules/common/search/search";
import MobileFooter from "@/modules/layout/components/mobile-footer";
import TopNavigationWrapper from "@/modules/layout/wrapper/TopNavigationWrapper";
import ProgressBar from "@/modules/shared/ProgressBar";

// 동적 import로 코드 스플리팅 적용 (사용 빈도가 낮은 컴포넌트들)
const AuxiliaryBlogComponent = lazy(
  () => import("@/modules/layout/components/AuxiliaryComponent")
);
const LoadingCover = lazy(() => import("@/modules/shared/LoadingCover"));
const JumpToTopButton = lazy(() => import("@/modules/shared/JumpToTopButton"));
const JumpToBackButton = lazy(
  () => import("@/modules/shared/JumpToBackButton")
);

//************* Fetcher ************* */
import { fetchMenuList } from "./api/fetcher";

//*************  types ************* */
import { RecordFrontMatter } from "@/types/mdx.model";
import { LoaderConfig, Page } from "fumadocs-core/source";
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
  const menuList = await fetchMenuList();
  // const recordList = await fetchAllRecordList();
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
    <html lang={BLOG.LANG} suppressHydrationWarning>
      <body>
        <ProgressBar>
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
              // recordList={recordList}
              serializedAllPages={serializedAllPages}
              menuList={menuList}
            >
              <GeneralSiteSettingsProvider>
                <div
                  id="norkive-main"
                  className={` w-screen h-screen justify-center dark:text-neutral-300  pb-16  md:pb-0 `}
                >
                  <Suspense
                    fallback={
                      <div className="h-16 bg-neutral-100 dark:bg-neutral-800" />
                    }
                  >
                    <AuxiliaryBlogComponent />
                  </Suspense>

                  <TopNavigationWrapper />

                  <div className=" dark:bg-black dark:text-neutral-300 py-10 flex flex-col overflow-y-auto h-screen  scrollbar-hide overscroll-contain ">
                    <Suspense fallback={<LoadingCover />}>{children}</Suspense>
                  </div>

                  <Suspense fallback={<div className="h-8 w-8" />}>
                    <JumpToTopButton />
                  </Suspense>
                  <Suspense fallback={<div className="h-8 w-8" />}>
                    <JumpToBackButton />
                  </Suspense>

                  <MobileRightSidebarWrapper />
                  <MobileFooter />

                  <ModalProvider />
                </div>
              </GeneralSiteSettingsProvider>
            </NavInfoProvider>
          </RootProvider>
        </ProgressBar>
      </body>
    </html>
  );
}
