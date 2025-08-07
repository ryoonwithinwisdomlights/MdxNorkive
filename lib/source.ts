import {
  allMetas,
  allRecords,
  allSubMenuPages,
  allBooks,
  allEngineerings,
  allProjects,
} from "content-collections";
import { loader } from "fumadocs-core/source";
import { createMDXSource } from "@fumadocs/content-collections";

export const { getPage, getPages, pageTree, generateParams } = loader({
  baseUrl: "/records",
  source: createMDXSource(allRecords, allMetas),
});

export const recordSource = loader({
  baseUrl: "/records",
  source: createMDXSource(allRecords, allMetas),
});
export const bookSource = loader({
  baseUrl: "/book",
  source: createMDXSource(allBooks, allMetas),
});

export const engineeringSource = loader({
  baseUrl: "/engineering",
  source: createMDXSource(allEngineerings, allMetas),
});

export const projectSource = loader({
  baseUrl: "/project",
  source: createMDXSource(allProjects, allMetas),
});

export const submenuPageSource = loader({
  baseUrl: "/submenupage",
  source: createMDXSource(allSubMenuPages, allMetas),
});
