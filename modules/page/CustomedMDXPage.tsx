"use client";
import { useThemeStore, useUIStore } from "@/lib/stores";
import { getDistanceFromToday, getYearMonthDay } from "@/lib/utils/date";
import {
  DocsBody,
  DocsPage,
} from "@/modules/layout/templates/docs-page-layout";

import { MDXContent } from "@content-collections/mdx/react";
import { InlineTOC } from "fumadocs-ui/components/inline-toc";
import { useSidebar } from "fumadocs-ui/provider";
import { Book, CalendarIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { Suspense, lazy, useEffect, useState } from "react";

import { getMDXComponents } from "@/getMDXComponents";
import { getDocsResource } from "@/lib/utils";
import TagItemMini from "@/modules/common/tag/TagItemMini";

const LoadingCover = lazy(() => import("@/modules/shared/LoadingCover"));
const LockedPage = lazy(() => import("@/modules/page/components/LockedPage"));
const ShareBar = lazy(() => import("@/modules/shared/ShareBar"));

export default function CustomedMDXPage({
  className,
  slug,
  resource,
}: {
  className: string;
  slug: string[] | undefined;
  resource: string;
}) {
  const page = getDocsResource(resource)?.getPage(slug);

  if (!page) notFound();

  const [lock, setLock] = useState(page?.data?.password !== "");

  const { body, toc, lastEditedTime } = page.data;

  const { locale } = useThemeStore();
  const { setRightSideInfoBarMode, setTocContent } = useUIStore();
  const { DOCS } = locale;
  const { setCollapsed } = useSidebar();

  useEffect(() => {
    setCollapsed(false);
    setTocContent(toc);
    setRightSideInfoBarMode("author");
  }, []);

  const validPassword = (passInput: string) => {
    if (passInput === page?.data?.password) {
      setLock(false);
      return true;
    }
    return false;
  };

  return (
    <article
      className={`flex flex-col pb-20 justify-center items-center w-full h-full ${className}`}
    >
      {lock ? (
        <LockedPage validPassword={validPassword} />
      ) : (
        <div className="flex flex-col w-full">
          <DocsPage
            full={page.data.full}
            lastUpdate={lastEditedTime}
            breadcrumb={{ enabled: false }}
          >
            <div
              className="container rounded-xl py-12 px-10 relative overflow-hidden mb-4"
              style={{
                backgroundColor: "black",
                backgroundImage: page.data.pageCover
                  ? `url(${page.data.pageCover})`
                  : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* 오버레이 */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(39,39,42,0.75)",
                  pointerEvents: "none",
                  zIndex: 1,
                }}
              />

              <div className="relative z-10 flex flex-col gap-3">
                <span className="text-xs text-white uppercase tracking-wide">
                  {page.data.type} / {page.data?.doc_type}
                </span>
                <h1 className="mb-2 text-3xl font-bold text-white">
                  {page.data.title}
                </h1>

                <div className=" flex flex-row gap-4 items-center text-white text-sm">
                  <div className="flex flex-row gap-2 items-center">
                    <Book className="w-4 h-4" />
                    <div className="flex flex-row gap-2 items-center">
                      <span className="text-white text-sm">
                        {DOCS.READING_TIME ?? "Reading Time"}
                      </span>
                      -
                      <span className="text-white text-sm">
                        {page.data.readingTime} {DOCS.MINUTE ?? "min"}
                      </span>
                    </div>
                  </div>
                  {/* <div className="flex flex-row gap-2 items-center">
                    <span className=" flex flex-row gap-2 items-center text-white text-sm">
                      <Rocket className="w-4 h-4" />
                      <span>{DOCS.VIEW ?? "View"}</span>
                      <span className=" busuanzi_value_page_pv" />
                    </span>
                  </div> */}
                </div>

                <p className="mb-6 text-white/80">{page.data.summary}</p>

                <div className="flex items-center gap-2 text-white">
                  <CalendarIcon className="w-4 h-4" />
                  <span className="text-sm">
                    {getYearMonthDay(page.data.date, locale.LOCALE ?? "en-US")}{" "}
                    {getDistanceFromToday(
                      page.data.date,
                      locale.LOCALE ?? "en-US"
                    )}
                  </span>
                </div>
                {page.data.tags && page.data.tags.length > 0 && (
                  <TagItemMini
                    tags={page.data.tags}
                    className="bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300"
                  />
                )}
              </div>
            </div>

            {toc.length > 0 && (
              <InlineTOC
                items={toc}
                children={DOCS.TABLE_OF_CONTENTS ?? "Table Of Contents"}
                className="block md:hidden bg-neutral-100 dark:bg-neutral-800 mb-4"
              />
            )}

            <DocsBody className="">
              <Suspense fallback={<LoadingCover />}>
                <MDXContent code={body} components={getMDXComponents()} />
              </Suspense>
            </DocsBody>

            <Suspense fallback={<div className="h-8" />}>
              <ShareBar data={page.data} url={page.url} />
            </Suspense>
          </DocsPage>
        </div>
      )}
    </article>
  );
}
