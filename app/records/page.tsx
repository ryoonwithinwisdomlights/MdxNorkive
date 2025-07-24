import { recordsource } from "@/lib/source";
import { DocsPage } from "fumadocs-ui/page";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const pages = recordsource.getPages();

  if (!pages) notFound();
  // console.log("recordsource::", recordsource);

  if (!params.slug || params.slug.length === 0) {
    return (
      <DocsPage>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Records</h1>
            <p className="text-muted-foreground mt-2">
              모든 기록들을 확인하세요.
            </p>
          </div>
          <div className="grid gap-4">
            {pages.map((page) => {
              // console.log("page.url::", page.url);
              return (
                <Link
                  key={page.url}
                  href={page.url}
                  className="block p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="font-semibold text-lg">
                        {page.data.title}
                      </h2>
                      {page.data.description && (
                        <p className="text-muted-foreground mt-1">
                          {page.data.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                        {page.data.date && (
                          <span>
                            {new Date(page.data.date).toLocaleDateString()}
                          </span>
                        )}
                        {page.data.type && (
                          <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                            {page.data.type}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </DocsPage>
    );
  }
  // // slug가 있으면 개별 페이지를 보여줌
  // const page = recordsource.getPage(params.slug);
  // if (!page) notFound();
  // return (
  //   <DocsPage toc={page.data.toc} full={page.data.full}>
  //     <DocsTitle>{page.data.title}</DocsTitle>
  //     <DocsDescription>{page.data.description}</DocsDescription>
  //     <DocsBody>
  //       <MDXContent
  //         code={page.data.body}
  //         components={getMDXComponents({
  //           // this allows you to link to other pages with relative file paths
  //           a: createRelativeLink(recordsource, page),
  //         })}
  //       />
  //     </DocsBody>
  //   </DocsPage>
  // );
}

export async function generateStaticParams() {
  return recordsource.generateParams();
}

// export async function generateMetadata(props: {
//   params: Promise<{ slug?: string[] }>;
// }) {
//   const params = await props.params;
//   if (params) {
//     const page = recordsource.getPage(params.slug);
//     if (!page) notFound();
//     return {
//       title: page.data.title,
//       description: page.data.description,
//     } satisfies Metadata;
//   }
// }
