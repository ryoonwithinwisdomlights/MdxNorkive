import React from "react";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page";
import { MDXContent } from "@content-collections/mdx/react";
import { mdxComponents } from "@/components/mdx-components";
const BasicDoc = (body, toc, date, page) => {
  return (
    <DocsPage toc={toc} full={page.data.full} lastUpdate={date}>
      {/* <DocsTitle>{page.data.title}</DocsTitle> */}
      {/* <DocsDescription>{page.data.description}</DocsDescription> */}
      <DocsBody>
        {/* <MDX components={mdxComponents} /> */}
        {/* <p>{page.data.content}</p> */}
        <MDXContent code={body} components={mdxComponents} />
      </DocsBody>
    </DocsPage>
  );
};

export default BasicDoc;
