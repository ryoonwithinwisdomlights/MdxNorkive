/* eslint-disable indent */
/* eslint-disable no-unused-vars */
"use client";

import { BLOG } from "@/blog.config";
import Comment from "@/components/Comment";
import CommonHead from "@/components/CommonHead";
import { AdSlot } from "@/components/GoogleAdsense";
import LazyImage from "@/components/LazyImage";
import NotionPage from "@/components/NotionPage";
import ShareBar from "@/components/ShareBar";
import { useGlobal } from "@/lib/global";
import { isBrowser } from "@/lib/utils";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import Announcement from "@/themes/gitbook/components/Announcement";
import ArticleAround from "@/themes/gitbook/components/ArticleAround";
import ArticleInfo from "@/themes/gitbook/components/ArticleInfo";
import { ArticleLock } from "@/themes/gitbook/components/ArticleLock";

// import Catalog from "@/themes/gitbook/components/Catalog";
import CategoryItem from "@/themes/gitbook/components/CategoryItem";
import FloatTocButton from "@/themes/gitbook/components/FloatTocButton";
import Footer from "@/themes/gitbook/components/Footer";

import InfoCard from "@/themes/gitbook/components/InfoCard";

import JumpToBackButton from "@/themes/gitbook/components/JumpToBackButton";
import JumpToTopButton from "@/themes/gitbook/components/JumpToTopButton";
import PageNavDrawer from "@/themes/gitbook/components/PageNavDrawer";
import NavPostList from "@/themes/gitbook/components/records/NavPostList";

import SearchInput from "@/themes/gitbook/components/SearchInput";

import TagItemMini from "@/themes/gitbook/components/TagItemMini";

import AllRecordsArchiveItem from "@/themes/gitbook/components/records/AllRecordsArchiveItem";
import AllRecordsPostListPage from "@/themes/gitbook/components/records/AllRecordsPostListPage";

import EngineeringRecordsitem from "@/themes/gitbook/components/records/EngineeringRecordsItem";
import GeneralRecordsitem from "@/themes/gitbook/components/records/GeneralRecordsitem";
import GuestBookItem from "@/themes/gitbook/components/records/GuestBookItem";
import SideprojectRecordsItem from "@/themes/gitbook/components/records/SideprojectRecordsItem";
import WritingRecordsItem from "@/themes/gitbook/components/records/WritingRecordsItem";

// import TocDrawer from "@/themes/gitbook/components/TocDrawer";
import TopNavBar from "@/themes/gitbook/components/TopNavBar";
import CONFIG from "./config";
import Style from "./Style";
import BottomMenuBar from "@/themes/gitbook/components/BottomMenuBar";
// Theme global variables
const ThemeGlobalGitbook = createContext();
export const useGitBookGlobal = () => useContext(ThemeGlobalGitbook);

/**
 * 기본 레이아웃
 * 왼쪽, 오른쪽 레이아웃을 채택하고, 모바일 단말기 상단 내비게이션 바를 활용하세요.
 * @returns {JSX.Element}
 * @constructor
 */
const LayoutBase = (props) => {
  const {
    children,
    post,
    allNavPagesForGitBook,
    meta,
    // slotLeft,
    // slotRight,
    // slotTop,
  } = props;
  const { onLoading } = useGlobal();
  const [tocVisible, changeTocVisible] = useState(false);
  const [pageNavVisible, changePageNavVisible] = useState(false);

  const [filteredNavPages, setFilteredNavPages] = useState(
    allNavPagesForGitBook
  );

  const showTocButton = post?.toc?.length > 1;

  useEffect(() => {
    setFilteredNavPages(allNavPagesForGitBook);
  }, [post]);

  return (
    <ThemeGlobalGitbook.Provider
      value={{
        tocVisible,
        changeTocVisible,
        filteredNavPages,
        setFilteredNavPages,
        allNavPagesForGitBook,
        pageNavVisible,
        changePageNavVisible,
      }}
    >
      <CommonHead meta={meta} />
      <Style />

      <div
        id="theme-gitbook"
        className="bg-white dark:bg-hexo-black-neutral- w-full h-full min-h-screen justify-center dark:text-neutral-300 dark:bg-black"
      >
        {/* 상단 네비게이션 바 */}
        <TopNavBar {...props} />

        <main
          id="wrapper"
          className={"relative flex justify-between w-full h-full mx-auto"}
        >
          {/* 왼쪽 네브바 */}
          <div
            className={
              "font-sans hidden md:block border-r dark:border-transparent relative z-10 "
            }
          >
            <div className="w-72  px-6 sticky top-0 overflow-y-scroll my-16 h-screen ">
              {/* {slotLeft} */}
              <SearchInput className="my-3 rounded-md" />
              <div className="mb-20">
                {/* 모든 기사 목록 */}
                <NavPostList filteredNavPages={filteredNavPages} />
              </div>
            </div>

            <div className="w-72 fixed left-0 bottom-0 z-20 bg-white dark:bg-black">
              <Footer {...props} />
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

                <Transition
                  show={!onLoading}
                  appear={true}
                  enter="transition ease-in-out duration-700 transform order-first"
                  enterFrom="opacity-0 translate-y-16"
                  enterTo="opacity-100"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 -translate-y-16"
                  unmount={false}
                >
                  {children}
                </Transition>

                {/* Google ads */}
                <AdSlot type="in-article" />

                {/* Back button */}
                <JumpToTopButton />
                <JumpToBackButton />
              </div>

              {/* bottom */}
              <div className="md:hidden mb:16">
                <Footer {...props} />
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
              <ArticleInfo post={props?.post ? props?.post : props.notice} />

              <div className="py-4 justify-center">
                {/* <Catalog {...props} /> */}
                {/* {slotRight} */}

                <InfoCard {...props} />

                {/* gitbook 테마 홈페이지에는 공지사항만 표시됩니다. */}

                <Announcement {...props} className={"justify-center "} />
              </div>

              <AdSlot type="in-article" />
            </div>
          </div>
        </main>

        {/* Mobile floating directory button */}
        {showTocButton && !tocVisible && (
          <div className="md:hidden fixed right-0 bottom-52 z-30 bg-white border-l border-t border-b dark:border-neutral-800 rounded">
            <FloatTocButton />
          </div>
        )}

        {/* 모바일 탐색 창 */}
        <PageNavDrawer {...props} filteredNavPages={filteredNavPages} />

        {/* 모바일 하단 탐색 메뉴 */}
        <BottomMenuBar {...props} className="block md:hidden" />
        <BottomMenuBar />
      </div>
    </ThemeGlobalGitbook.Provider>
  );
};

/**
 * 첫 장
 * 기사 세부정보 페이지로 리디렉션
 * @param {*} props
 * @returns
 */
const LayoutIndex = (props) => {
  const router = useRouter();
  useEffect(() => {
    router.push(CONFIG.INDEX_PAGE).then(() => {
      // console.log('지정된 홈페이지로 이동', CONFIG.INDEX_PAGE)
      setTimeout(() => {
        if (isBrowser) {
          const article = document.getElementById("notion-article");
          if (!article) {
            console.log(
              "Please check if your Notion database contains this slug page： ",
              CONFIG.INDEX_PAGE
            );
            const containerInner = document.querySelector(
              "#theme-gitbook #container-inner"
            );
            const newHTML = `<h1 class="text-3xl pt-12  dark:text-neutral-300">Configuration error</h1><blockquote class="notion-quote notion-block-ce76391f3f2842d386468ff1eb705b92"><div>请在您的notion中添加一个slug为${CONFIG.INDEX_PAGE}的文章</div></blockquote>`;
            containerInner?.insertAdjacentHTML("afterbegin", newHTML);
          }
        }
      }, 7 * 1000);
    });
  }, []);

  return <LayoutBase {...props} />;
};

/**
 * 기사 목록 없음
 * 모두 페이지 탐색에 따라 다릅니다.
 * @param {*} props
 * @returns
 */
const LayoutPostList = (props) => {
  return (
    <LayoutBase {...props}>
      <div className="mt-10">
        <AllRecordsPostListPage {...props} />
      </div>
    </LayoutBase>
  );
};

/**
 * 모든 기사 세부정보
 * @param {*} props
 * @returns
 */
const LayoutSlug = (props) => {
  const { post, prev, next, lock, validPassword, siteInfo } = props;
  const { locale } = useGlobal();
  return (
    <LayoutBase {...props}>
      {/* 기사 잠금 */}
      {lock && <ArticleLock validPassword={validPassword} />}

      {!lock && (
        <div id="container">
          {/* title */}
          <h1 className="text-3xl pt-12  dark:text-neutral-100">
            {post?.title}
          </h1>
          <section
            className="flex-wrap
          shadow-text-md flex text-sm
          justify-start mt-4 text-neutral-500
           dark:text-neutral-400 font-light py-2
           "
          >
            <div className="flex justify-start dark:text-neutral-200 ">
              <span className="whitespace-nowrap">
                <i className="far fa-calendar mr-2" />
                {post?.publishDay}
              </span>{" "}
              <span className="mx-1"> | </span>{" "}
              <span className="whitespace-nowrap mr-2">
                <i className="far fa-calendar-check mr-2" />
                {post?.lastEditedDay}
              </span>
              <div className="hidden busuanzi_container_page_pv font-light mr-2 whitespace-nowrap">
                <i className="mr-1 fas fa-eye" />
                <span className="busuanzi_value_page_pv" />
              </div>
            </div>
            <span className="mx-1"> | </span>{" "}
            <Link href="/archive" passHref legacyBehavior>
              <div className="flex flex-row">
                <LazyImage
                  src={siteInfo?.icon}
                  className="rounded-full cursor-pointer dark:border dark:border-neutral-300"
                  width={20}
                  hight={20}
                  alt={BLOG.AUTHOR}
                />

                <div className="mr-3 ml-2 my-auto text-neutral-400 cursor-pointer">
                  {BLOG.AUTHOR}
                </div>
              </div>
            </Link>
          </section>
          {/* Notion기사 본문 */}
          {post && (
            <section
              id="article-wrapper"
              className="px-1 dark:text-neutral-200"
            >
              <NotionPage post={post} />

              {/* share */}
              <ShareBar post={post} />
              {/* Article classification and tag information */}
              <div className="flex justify-between">
                {CONFIG.POST_DETAIL_CATEGORY && post?.category && (
                  <CategoryItem category={post.category} />
                )}
                <div>
                  {CONFIG.POST_DETAIL_TAG &&
                    post?.tagItems?.map((tag) => (
                      <TagItemMini key={tag.name} tag={tag} />
                    ))}
                </div>
              </div>

              {post?.type !== "CONFIG" &&
                post?.type !== "Menu" &&
                post?.type !== "SubMenu" &&
                post?.type !== "Notice" &&
                post?.type !== "Page" &&
                post?.status === "Published" && (
                  <ArticleAround prev={prev} next={next} />
                )}
              <AdSlot />

              <Comment frontMatter={post} />
            </section>
          )}

          {/* <TocDrawer {...props} /> */}
        </div>
      )}
    </LayoutBase>
  );
};

/**
 * 검색 없음
 * All depends on page navigation
 * @param {*} props
 * @returns
 */
const LayoutSearch = (props) => {
  return <LayoutBase {...props}></LayoutBase>;
};

/**
 *
 * All Ryoon Log List For GitBook theme
 * All depends on page navigation
 * @param {*} props
 * @returns
 */
const LayoutArchive = (props) => {
  const { archivePosts } = props;

  return (
    <LayoutBase {...props}>
      <div className="mb-10 pb-20  py-3 w-full flex flex-col min-h-full">
        <div className="flex flex-col pt-10 ">
          <div className="text-lg text-stone-600 font-extralight dark:text-neutral-200">
            경계를 오가며 정직하게 기록되는{" "}
          </div>
          <div className="w-4/5 font-extrabold  break-words text-stone-700  overflow  text-3xl dark:text-neutral-100 underline decoration-amber-400/30 hover:decoration-amber-300">
            YEOLLAMSIL
            <span className="text-amber-400 "> .</span>{" "}
          </div>
        </div>
        <div className="w-full flex flex-row ">
          <div className="w-2/5 mt-20 text-right ml-4 md:mr-10 dark:text-neutral-200 text-neutral-700 flex flex-col ">
            <div className="text-left mr-10 dark:text-neutral-200 text-neutral-700 flex flex-col gap-72  ">
              <div className="font-bold text-center items-center  text-orange-500">
                👩‍💻
                <br />
                배움.
              </div>
              <div className=" font-bold  text-center items-center text-red-500">
                {" "}
                📙
                <br />
                일기.
              </div>
              <div className=" font-bold text-center items-center  text-amber-500 ">
                {" "}
                📔
                <br />
                글.
              </div>
              <div className=" font-bold text-center items-center  text-amber-900 dark:text-stone-300">
                📝
                <br /> 책.
              </div>
              <div className=" font-bold  text-center items-center text-amber-400">
                💡
                <br />
                영감.
              </div>
              <div className=" font-bold  text-center items-center text-orange-400">
                🎨
                <br />
                나눔.
              </div>
              <div className=" font-bold  text-center items-center text-amber-900 dark:text-stone-200 ">
                🌳
                <br /> 사유.
              </div>
              <div className="  text-stone-600 font-extralight text-center items-center dark:text-neutral-200  ">
                로 <br />
                <br />
                이<br />루<br />어<br />
                진.
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-10 bg-opacity-30 rounded-lg md:pl-10 dark:bg-black dark:bg-opacity-70 bg-white">
            {Object.keys(archivePosts)?.map((archiveTitle) => (
              <AllRecordsArchiveItem
                key={archiveTitle}
                archiveTitle={archiveTitle}
                archivePosts={archivePosts}
              />
            ))}
          </div>
        </div>
      </div>
    </LayoutBase>
  );
};

/**
 * Engineering(엔지니어링) 메뉴 레이아웃
 * All depends on page navigation
 * @param {*} props
 * @returns
 */
const LayoutEngineeringRecords = (props) => {
  const { EngineeringPosts } = props;

  return (
    <LayoutBase {...props}>
      <div className="mb-10 pb-20 md:py-12 py-3 w-full  min-h-full">
        <div className="flex flex-col">
          <div className="w-full mb-4 py-6">
            <div>
              {/* https://nextjs.org/docs/pages/building-your-application/optimizing/images */}
              {/* &gt;<Image src={ReadPic} alt="So-I-Read-And-Write" /> */}
              <div className="text-3xl font-bold dark:text-neutral-100">
                TIL Tech Logs <span className="text-[#ff6f00]">.</span>
              </div>
              <div className=" dark:text-neutral-200 mt-1  flex flex-row p-2 ">
                <div className="flex flex-row  text-base align-bottom  break-words  text-right">
                  {" "}
                  一 개라도 배우는
                  <div className="font-bold text-[#ff6f00] break-words  text-right">
                    &nbsp;완료주의
                  </div>{" "}
                </div>

                <div className=" text-sm  align-bottom pt-1">
                  {" "}
                  &nbsp;&nbsp;&nbsp;&nbsp;{">"}&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                </div>
                <div className="text-xs align-bottom  pt-2 break-words text-right">
                  완벽하려 꾸물대는 완성주의
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6 px-2">
            {EngineeringPosts?.map((item, index) => {
              return (
                <EngineeringRecordsitem
                  key={index}
                  pIndex={index}
                  pId={item.id}
                  pTitle={item.title}
                  pPosts={item}
                />
              );
            })}
          </div>
        </div>
      </div>
    </LayoutBase>
  );
};

/**
 * TheLog(일상기록) 메뉴 레이아웃
 * All depends on page navigation
 * @param {*} props
 * @returns
 */
const LayoutGeneralRecords = (props) => {
  const { generalPosts } = props;
  // console.log('generalPosts', generalPosts)
  return (
    <LayoutBase {...props}>
      <div className="mb-10 pb-20 md:py-12 py-3 w-full  min-h-full">
        <div className="text-3xl flex flex-col  my-4 ">
          <div className="text-sm dark:text-neutral-200">륜의 진실된 {""} </div>
          <div className="font-bold dark:text-neutral-100">
            Life logs
            <span className="text-red-500 "> .</span>{" "}
          </div>
        </div>
        <div className=" dark:text-neutral-200  text-neutral-700 my-6 text-base ">
          <div className="px-2">
            {" "}
            나는 배웠다.
            <br />
            앞과 뒤를 계산하지 않고 자신에게 정직한 사람이
            <br />
            결국은 우리가 살아가는 데서 앞선다는 것을.
          </div>
          - Omer B. washington
          <br />
          <br />
        </div>
        <div className="flex flex-row">
          <div className="w-1/2 !md:mr-20 h-full">
            {/* <div className="w-full flex flex-row float-left  gap-4 mb-4 ">
 
              <Image
                src={Nogiveup}
                alt="Nogiveup"
                className="rounded-lg duration-500  hover:scale-110 "
              />
              <Image
                src={Leeseula}
                alt="Leeseula"
                className="rounded-lg duration-500 mt-20 hover:scale-110"
              />
            </div>
            <div className="w-full flex flex-row float-right gap-4 mb-4 ">


              <Image
                src={Jadu}
                alt="Jadu"
                className="rounded-lg duration-500  hover:scale-110 h-3/5  "
              />
              <Image
                src={Latte}
                alt="Latte"
                className="rounded-lg duration-500  hover:scale-110  "
              />
            </div> */}
          </div>
          <div className="w-full flex flex-col gap-10 bg-opacity-30 p-10 rounded-lg dark:bg-black dark:bg-opacity-70 bg-white">
            {Object.keys(generalPosts)?.map((archiveTitle) => {
              return (
                <GeneralRecordsitem
                  key={archiveTitle}
                  archiveTitle={archiveTitle}
                  archivePosts={generalPosts}
                />
              );
            })}
          </div>
        </div>
      </div>
    </LayoutBase>
  );
};

/**
 * Writing(Writing) 메뉴 레이아웃
 * All depends on page navigation
 * @param {*} props
 * @returns
 */
const LayoutWritingRecords = (props) => {
  const { writingPosts } = props;
  // console.log('writingPosts', writingPosts)
  return (
    <LayoutBase {...props}>
      <div className="mb-10 pb-20 md:py-12 py-3 w-full  min-h-full">
        <div className="text-3xl flex flex-row dark:text-neutral-100 mt-4 mb-2">
          <div className="  font-bold   ">
            Writing <span className="font-bold text-amber-400">.</span>{" "}
          </div>
        </div>

        <div className="flex flex-row">
          <div className="text-left mr-10 dark:text-neutral-200 text-neutral-700 flex flex-col gap-20 ">
            <div>
              읽고 쓰는 것은 자신의 세계를, 생각을 확장해 나가는 기록이다.
            </div>
            <div className="text-right mr-10 dark:text-neutral-200 text-neutral-700 flex flex-col gap-10 ">
              <div className="mb-10 "> 륜의</div>
              <div className="mb-10  ">
                <span className="font-bold">사유</span>와
              </div>
              <div className="mb-10  ">
                <span className="font-bold">문장과</span>
              </div>
              <div className="mb-10 f ">
                <span className="font-bold">독서에</span>대한
              </div>
              <div className="mt-10 t"> 기록.</div>
            </div>
          </div>
          <div className="flex flex-col gap-10">
            {Object.keys(writingPosts)?.map((archiveTitle) => {
              // console.log(archiveTitle)
              return (
                <WritingRecordsItem
                  key={archiveTitle}
                  archiveTitle={archiveTitle}
                  archivePosts={writingPosts}
                />
              );
            })}
          </div>
        </div>
      </div>
    </LayoutBase>
  );
};

/**
 * Sideproject(Sideproject) 메뉴 레이아웃
 * All depends on page navigation
 * @param {*} props
 * @returns
 */
const LayoutSideproject = (props) => {
  const { SideprojectPosts } = props;

  return (
    <LayoutBase {...props}>
      <div className="mb-10 pb-20 md:py-12 w-full py-3  min-h-full">
        <div className="flex flex-col">
          <div className="w-11/12  mb-4 px-2 flex flex-row justify-evenly pb-6 ">
            <div className="flex flex-col pt-8 gap-1 text-right mr-10 ">
              <div className=" dark:text-neutral-200 mt-1 text-xs  ">
                온종일 a4종이로 모델하우스를 제작하던 5살.
              </div>
              <div className=" dark:text-neutral-200 mt-1 text-sm  ">
                즐겁게 마케팅/광고 기획을 제안하던 27살.
              </div>
              <div className=" dark:text-neutral-200  mt-1 text-base ">
                여전히 분석-조립-제안-제작을 좋아하는 개발자의
              </div>
            </div>
            <div className="text-3xl font-bold dark:text-neutral-100 text-right text-neutral-900 ">
              <p className="text-orange-500 p-0 m-0 text-left align-text-top  ">
                .{""}
              </p>
              ✂️ Side
              <br />
              Project
              <p className="text-orange-500 p-0 m-0 text-right align-text-bottom ">
                .
              </p>
            </div>
          </div>
          <div className="space-y-6 px-2">
            {SideprojectPosts?.map((item, index) => {
              // console.log('item', item)
              // console.log(portfolioPosts[item.to])
              return (
                <SideprojectRecordsItem
                  key={index}
                  pIndex={index}
                  pId={item.id}
                  pTitle={item.title}
                  pPosts={item}
                />
              );
            })}
          </div>
        </div>
      </div>
    </LayoutBase>
  );
};

/**
 * Category List
 */
const LayoutCategoryIndex = (props) => {
  const { categoryOptions } = props;
  const { locale } = useGlobal();
  return (
    <LayoutBase {...props}>
      <div className="bg-white dark:bg-neutral-700  px-10 py-10">
        <div className="dark:text-neutral-200 text-neutral-700 mb-5">
          <i className="mr-4 fas fa-th text-neutral-700 " />
          {locale.COMMON.CATEGORY}:
        </div>
        <div id="category-list" className="duration-200 flex flex-wrap">
          {categoryOptions?.map((category) => {
            return (
              <Link
                key={category.name}
                href={`/category/${category.name}`}
                passHref
                legacyBehavior
              >
                <div
                  className={
                    "hover:text-black text-neutral-700 dark:hover:text-white dark:text-neutral-300 dark:hover:bg-neutral-600 px-5 cursor-pointer py-2 hover:bg-neutral-100"
                  }
                >
                  <i
                    className={`mr-4 fas fa-folder text-${category.color}-400 `}
                  />
                  {category.name}({category.count})
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </LayoutBase>
  );
};

/**
 * tag list
 */
const LayoutTagIndex = (props) => {
  // console.log('props Tag:', props)
  const { tagOptions } = props;
  const { locale } = useGlobal();

  return (
    <LayoutBase {...props}>
      <div className="bg-white dark:bg-neutral-700  px-10 py-10">
        <div className="dark:text-neutral-200 mb-5">
          <i className="mr-4 fas fa-tag" />
          {locale.COMMON.TAGS}:
        </div>
        <div id="tags-list" className="duration-200 flex flex-wrap">
          {tagOptions?.map((tag) => {
            return (
              <div key={tag.name} className="p-2">
                <TagItemMini key={tag.name} tag={tag} />
              </div>
            );
          })}
        </div>
      </div>
    </LayoutBase>
  );
};

/**
 * GuestBook (방명록) 메뉴 레이아웃
 * All depends on page navigation
 * @param {*} props
 * @returns
 */
const LayoutGuestBook = (props) => {
  const { GuestBookPosts } = props;

  return (
    <LayoutBase {...props}>
      <div className="mb-10 pb-20 md:py-12 py-3 w-full  min-h-full">
        <div className="text-3xl dark:text-neutral-300 mb-4 ">GuestBook</div>
        <div className="flex flex-row">
          <div className="w-full flex flex-col gap-10 bg-opacity-30 p-10 rounded-lg dark:bg-black dark:bg-opacity-70 bg-white">
            {Object.keys(GuestBookPosts)?.map((archiveTitle) => {
              return (
                <GuestBookItem
                  key={archiveTitle}
                  archiveTitle={archiveTitle}
                  archivePosts={GuestBookPosts}
                />
              );
            })}
          </div>
        </div>
      </div>
    </LayoutBase>
  );
};

/**
 * 404
 */
const Layout404 = (props) => {
  return (
    <LayoutBase {...props}>
      <div className="w-full h-96 py-80 flex justify-center items-center">
        404 Not found.
      </div>
    </LayoutBase>
  );
};

export {
  Layout404,
  LayoutArchive,
  LayoutCategoryIndex,
  LayoutEngineeringRecords,
  LayoutGeneralRecords,
  LayoutGuestBook,
  LayoutIndex,
  LayoutPostList,
  LayoutSearch,
  LayoutSideproject,
  LayoutSlug,
  LayoutTagIndex,
  LayoutWritingRecords,
  CONFIG as THEME_CONFIG,
};
