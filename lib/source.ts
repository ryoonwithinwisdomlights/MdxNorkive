import {
  allMetas,
  allDocs,
  allArchives,
  allSubmenupages,
} from "content-collections";
import { loader } from "fumadocs-core/source";
import { createMDXSource } from "@fumadocs/content-collections";

export const docsSource = loader({
  baseUrl: "/docs",
  source: createMDXSource(allDocs, allMetas),
});

export const archivesSource = loader({
  baseUrl: "/archives",
  source: createMDXSource(allArchives, allMetas),
});

export const submenuPageSource = loader({
  baseUrl: "/submenupages",
  source: createMDXSource(allSubmenupages, allMetas),
});
