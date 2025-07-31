import { allMetas, allRecords } from "content-collections";
import { loader } from "fumadocs-core/source";
import { createMDXSource } from "@fumadocs/content-collections";

// export const docsource = loader({
//   baseUrl: "/docs",
//   source: createMDXSource(allDocs, allMetas),
// });

export const { getPage, getPages, pageTree, generateParams } = loader({
  baseUrl: "/records",
  source: createMDXSource(allRecords, allMetas),
});
