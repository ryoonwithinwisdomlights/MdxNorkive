import configuration from "../../content-collections.ts";
import { GetTypeByName } from "@content-collections/core";

export type Record = GetTypeByName<typeof configuration, "records">;
export declare const allRecords: Array<Record>;

export type SubMenuPage = GetTypeByName<typeof configuration, "subMenuPages">;
export declare const allSubMenuPages: Array<SubMenuPage>;

export type Meta = GetTypeByName<typeof configuration, "meta">;
export declare const allMetas: Array<Meta>;

export type Book = GetTypeByName<typeof configuration, "books">;
export declare const allBooks: Array<Book>;

export type Engineering = GetTypeByName<typeof configuration, "engineerings">;
export declare const allEngineerings: Array<Engineering>;

export type Project = GetTypeByName<typeof configuration, "projects">;
export declare const allProjects: Array<Project>;

export {};
