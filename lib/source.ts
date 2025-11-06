import {
  allMetas,
  allGenerals,
  allPortfolios,
  allTechs,
  allSubmenupages,
} from "content-collections";
import { loader } from "fumadocs-core/source";
import { createMDXSource } from "@fumadocs/content-collections";

export const generalsSource = loader({
  baseUrl: "/generals",
  source: createMDXSource(allGenerals, allMetas),
});

export const techsSource = loader({
  baseUrl: "/techs",
  source: createMDXSource(allTechs, allMetas),
});
export const portfoliosSource = loader({
  baseUrl: "/portfolios",
  source: createMDXSource(allPortfolios, allMetas),
});

export const submenuPageSource = loader({
  baseUrl: "/submenupages",
  source: createMDXSource(allSubmenupages, allMetas),
});
