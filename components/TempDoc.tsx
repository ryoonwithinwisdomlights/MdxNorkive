import { mdxComponents } from "@/components/mdx-components";
import { buttonVariants } from "@/components/ui/button";
import { MDXContent } from "@content-collections/mdx/react";
import { InlineTOC } from "fumadocs-ui/components/inline-toc";
import { DocsBody, DocsPage } from "fumadocs-ui/page";
import Link from "next/link";
import Comment from "./Comment";
export default function TempDoc({ body, toc, date, page }) {
  return (
    <article className=" flex flex-col px-0 ">
      <div className="prose min-w-0   ">
        {/* <InlineTOC items={page.data.toc} className="mb-12" /> */}

        <DocsPage
          toc={toc}
          full={page.data.full}
          lastUpdate={date}
          breadcrumb={{ enabled: false }}
        >
          <div
            className="container rounded-xl py-12 relative overflow-hidden"
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
                className={buttonVariants({ size: "sm", variant: "secondary" })}
              >
                Back
              </Link>
            </div>
          </div>
          {/* <DocsTitle>{page.data.title}</DocsTitle> */}
          {/* <DocsDescription>{page.data.description}</DocsDescription> */}
          <DocsBody className=" p-4">
            {/* <MDX components={mdxComponents} /> */}
            {/* <p>{page.data.content}</p> */}
            <MDXContent code={body} components={mdxComponents} />
            <Comment frontMatter={page.data} />
          </DocsBody>
        </DocsPage>
        {/* <div className="flex flex-col gap-4 border-l p-4 text-sm lg:w-[250px]">
          <div>
            <p className="mb-1 text-fd-muted-foreground">Written by</p>
            <p className="font-medium">{page.data.author}</p>
          </div>
          <div>
            <p className="mb-1 text-sm text-fd-muted-foreground">At</p>
            <p className="font-medium">
              {new Date(
                page.data.date ??
                  path.basename(page.path, path.extname(page.path))
              ).toDateString()}
            </p>
          </div>
          <Control url={page.url} />
        </div> */}
        {/* <MDXContent
            code={body}
            components={mdxComponents}
            // components={getMDXComponents({
            //   // this allows you to link to other pages with relative file paths
            //   a: createRelativeLink(recordsource, page),
            // })}
          /> */}
      </div>
    </article>
  );
}
