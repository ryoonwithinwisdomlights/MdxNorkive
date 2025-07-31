import { pageTree, getPages } from "@/lib/source";
import ArchiveIntro from "@/modules/blog/records/ArchiveIntro";
import { DocsPage } from "fumadocs-ui/page";
import { notFound } from "next/navigation";

export default function Page() {
  // const pages = pageTree;

  // if (!pages) notFound();
  // console.log("pages::", pages);

  return (
    <div>
      {/* <div className="space-y-6"></div> */}
      {/* <div className="">
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
        </div> */}
      <ArchiveIntro />
    </div>
  );
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
