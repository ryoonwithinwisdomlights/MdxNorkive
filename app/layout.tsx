import { Suspense, lazy, type ComponentType } from "react";
import { BLOG } from "@/blog.config";

//************* font ************* */
import { Noto_Sans, Noto_Serif } from "next/font/google";

//************* Next ************* */
import type { Metadata, Viewport } from "next";

//************* Custom styles ************* */
import "./../styles/globals.css";

//************* Custom context ************* */
import { GeneralSiteSettingsProvider } from "@/lib/context/GeneralSiteSettingsProvider";
import { ModalProvider } from "@/lib/context/ModalProvider";
import { NavInfoProvider } from "@/lib/context/NavInfoProvider";
import { RootProvider } from "fumadocs-ui/provider/next";
import { Providers } from "./providers";

//************* Utils ************* */
import { getCookie } from "@/lib/utils/cookies";
import { generateLocaleDict } from "@/lib/utils/lang";

//************* All Docs sources ************* */
import { generalsSource, portfoliosSource, techsSource } from "@/lib/source";

//************* Custom components ************* */
import MobileRightSidebarWrapper from "@/modules/common/right-sidebar/MobileRightSidebarWrapper";

import MobileFooter from "@/modules/layout/components/mobile-footer";
import TopNavigationWrapper from "@/modules/layout/wrapper/TopNavigationWrapper";
import ProgressBar from "@/modules/shared/ProgressBar";
import { WebVitals } from "@/modules/shared/WebVitals";

// 동적 import로 코드 스플리팅 적용 (사용 빈도가 낮은 컴포넌트들)
const AuxiliaryBlogComponent = lazy(
  () => import("@/modules/layout/components/AuxiliaryComponent")
);
const JumpToTopButton = lazy(() => import("@/modules/shared/JumpToTopButton"));
const JumpToBackButton = lazy(
  () => import("@/modules/shared/JumpToBackButton")
);
const DefaultSearchDialog = lazy(
  () => import("@/modules/common/search/search")
);

// Some TS setups (notably RSC typings) can misclassify external providers as invalid JSX element types.
// This cast keeps runtime behavior identical while preventing false-positive JSX errors.
const FumaRootProvider = RootProvider as unknown as ComponentType<any>;

//************* Fetcher ************* */
import { fetchMenuList } from "./api/fetcher";

//*************  types ************* */
import { DocFrontMatter } from "@/types/mdx.model";
// import { LoaderConfig, Page } from "fumadocs-core/source";

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
    images: "/images/norkive_black.jpg",
    url: BLOG.LINK,
  },
  category: BLOG.KEYWORDS || "Software Technology", // section Mainly like category Such classification, Facebook Use this to capture link categories,
  twitter: {
    card: "summary_large_image",
    description: BLOG.DESCRIPTION,
    title: BLOG.TITLE,
  },
};

const notoSans = Noto_Sans({
  variable: "--font-sans",
  subsets: ["latin"], // latin-ext 제거로 크기 감소
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"], // 폴백 폰트 명시
  adjustFontFallback: false, // 폰트 폴백 최적화
});

const notoSerif = Noto_Serif({
  variable: "--font-serif",
  subsets: ["latin"], // latin-ext 제거로 크기 감소
  display: "swap",
  preload: false, // Serif는 덜 중요하므로 preload 비활성화
  fallback: ["Times New Roman", "serif"],
  adjustFontFallback: false,
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 서버에서 쿠키와 메뉴 데이터를 병렬로 가져오기
  const [userLang, menuList] = await Promise.all([
    getCookie("lang"),
    fetchMenuList(),
  ]);

  const initialLang = userLang || BLOG.LANG;
  const initialLocale = generateLocaleDict(initialLang);

  // 페이지 소스들은 동기 함수이므로 병렬화 불필요
  const generalsPages = generalsSource.getPages();
  const portfoliosPages = portfoliosSource.getPages();
  const techsPages = techsSource.getPages();

  const allPages: any[] = [...generalsPages, ...portfoliosPages, ...techsPages];

  // 직렬화 가능한 형태로 변환 - 클라이언트 전송 데이터 최소화
  const serializedAllPages = allPages
    .map((page) => ({
      // 필수 데이터만 전송 (absolutePath, slugs, locale 제거)
      url: page.url,
      data: {
        // frontmatter에서 필요한 필드만 선택
        title: page.data.title,
        summary: page.data.summary,
        pageCover: page.data.pageCover,
        type: page.data.type,
        doc_type: page.data.doc_type,
        date: page.data.date,
        tags: page.data.tags,
        category: page.data.category,
        favorite: page.data.favorite,
        icon: page.data.icon,
      } as Partial<DocFrontMatter>,
    }))
    .sort((a, b) => {
      const dateA = a?.data?.date ? new Date(a.data.date).getTime() : 0;
      const dateB = b?.data?.date ? new Date(b.data.date).getTime() : 0;
      return dateB - dateA;
    });

  return (
    <html
      lang={BLOG.LANG}
      className={`${notoSans.variable} ${notoSerif.variable}`}
      suppressHydrationWarning
    >
      <body>
        <WebVitals />
        <ProgressBar>
          <Providers>
            <FumaRootProvider
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
                serializedAllPages={serializedAllPages}
                menuList={menuList}
              >
                <GeneralSiteSettingsProvider
                  initialLang={initialLang}
                  initialLocale={initialLocale}
                >
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
                      {/* <Suspense fallback={<LoadingCover />}> */}
                      {children}
                      {/* </Suspense> */}
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
            </FumaRootProvider>
          </Providers>
        </ProgressBar>
      </body>
    </html>
  );
}
