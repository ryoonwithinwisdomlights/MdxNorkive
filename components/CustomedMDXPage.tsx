import { mdxComponents } from "@/components/mdx-components";
import ShareBar from "@/modules/common/components/shared/ShareBar";
import { buttonVariants } from "@/modules/common/ui/button";
import { MDXContent } from "@content-collections/mdx/react";
import { DocsBody, DocsPage } from "fumadocs-ui/page";
import Link from "next/link";
import Comment from "./Comment";
export default function TempDoc({ body, toc, date, page, className }) {
  return (
    <article className={`flex flex-col   w-full h-full ${className}`}>
      <DocsPage
        toc={toc}
        full={page.data.full}
        lastUpdate={date}
        breadcrumb={{ enabled: false }}
      >
        <div
          className="container rounded-xl py-12 px-10 relative overflow-hidden"
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
              background: "rgba(39,39,42,0.75)", // bg-neutral-800 + 거의 불투명
              pointerEvents: "none",
              zIndex: 1,
            }}
          />
          {/* 실제 컨텐츠 */}
          <div className="relative z-10">
            <h1 className="mb-2 text-3xl font-bold text-white">
              {page.data.title}
            </h1>
            <p className="mb-4 text-white/80">{page.data.description}</p>
            <Link
              href="/records"
              className={buttonVariants({
                size: "sm",
                variant: "secondary",
                className: "text-white",
              })}
            >
              Back
            </Link>
          </div>
        </div>
        {/* <DocsTitle>{page.data.title}</DocsTitle> */}
        {/* <DocsDescription>{page.data.description}</DocsDescription> */}
        <DocsBody className=" p-4 ">
          {/* <MDX components={mdxComponents} /> */}
          {/* <p>{page.data.content}</p> */}
          <MDXContent code={body} components={mdxComponents} />
        </DocsBody>
        <ShareBar data={page.data} />
      </DocsPage>
      <Comment frontMatter={page.data} />
    </article>
  );
}
