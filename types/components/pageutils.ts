import { DocFrontMatter } from "@/types/mdx.model";
import { SerializedPage } from "@/types/provider.model";

export interface mainDocsProps {
  type: "Docs" | "Archives" | "";
  subType: boolean;
  introTrue: boolean;
  docs: SerializedPage[];
}

export interface PaginationSimpleProps {
  pagenum: number;
  totalPage: number;
}

export interface PageIndicatorProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export interface DocsWithMultiplesOfThreeProps {
  type: string;
  introTrue: boolean;
  docs: SerializedPage[];
}

export interface DocsWrapperProps {
  modAllPages: Record<string, SerializedPage[]>;
  className?: string;
}

export interface LockedPageProps {
  validPassword: (password: string) => boolean;
}

export interface IntroSectionWithMenuOptionProps {
  introTrue?: boolean;
  introType?: "FEATURED" | "ENTIRE" | "LATEST" | undefined;
  currentDocType: string;
  allOptions: OptionItem[];
  handleDocTypeChange: (option: string) => void;
}

export interface InjectedOptionMenuProps {
  currentDocType: string;
  allOptions: OptionItem[];
  handleDocTypeChange: (option: string) => void;
  initString?: string;
}

export interface PaginationDivProps {
  pagenum?: number;
  allPages?: DocFrontMatter[];
  pageCount: number;
}

export interface BasicPageDivProps {
  title: string;
  docsList: Record<string, SerializedPage[]>;
}

export type OptionItem = {
  id: number;
  title: string;
  option: string;
  isActive?: boolean; // 현재 선택된지 확인
};

export interface OptionCarouselProps {
  allOptions: OptionItem[];
  handleOptionTypeChange: (option: string) => void;
  className?: string;
  currentOption?: string;
  initString?: string;
}

export interface GeneralDocsBodyProps {
  modAllPages: Record<string, SerializedPage[]>;
  isAble: boolean;
  pages: SerializedPage[];
  type: "Docs" | "Archives";
  subType: boolean;
  introTrue: boolean;
}

export interface DocsBodyWithTwoOptionsProps {
  docs: SerializedPage[];
  allOptions: OptionItem[];
  handleOptionTypeChange: (option: string) => void;
  handleDocTypeChange: (option: string) => void;
  currentDocType: string;
  currentTag: string;
  setCurrentTag: (tag: string) => void;
  setCurrentPage: (page: number) => void;
  currentPage: number;
}
