import { RecordFrontMatter } from "@/types/mdx.model";
import { SerializedPage } from "@/types/provider.model";

export interface mainRecordProps {
  type: "BOOKS" | "PROJECTS" | "RECORDS" | "ENGINEERINGS" | "";
  subType: boolean;
  introTrue: boolean;
  records: SerializedPage[];
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

export interface RecordsWithMultiplesOfThreeProps {
  type: string;
  introTrue: boolean;
  records: SerializedPage[];
}

export interface RecordsWrapperProps {
  modAllPages: Record<string, SerializedPage[]>;
  className?: string;
}

export interface LockedPageProps {
  validPassword: (password: string) => boolean;
}

export interface IntroSectionWithMenuOptionProps {
  introTrue?: boolean;
  introType?: "FEATURED" | "ENTIRE" | "LATEST" | undefined;
  currentRecordType: string;
  allOptions: OptionItem[];
  handleRecordTypeChange: (option: string) => void;
}

export interface InjectedOptionMenuProps {
  currentRecordType: string;
  allOptions: OptionItem[];
  handleRecordTypeChange: (option: string) => void;
  initString?: string;
}

export interface PaginationDivProps {
  pagenum?: number;
  allPages?: RecordFrontMatter[];
  pageCount: number;
}

export interface BasicPageDivProps {
  title: string;
  recordList: Record<string, SerializedPage[]>;
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

export interface BookGeneralRecordsBodyProps {
  modAllPages: Record<string, SerializedPage[]>;
  isAble: boolean;
  pages: SerializedPage[];
  type: "BOOKS" | "PROJECTS" | "RECORDS" | "ENGINEERINGS";
  subType: boolean;
  introTrue: boolean;
}

export interface RecordsBodyWithTwoOptionsProps {
  records: SerializedPage[];
  allOptions: OptionItem[];
  handleOptionTypeChange: (option: string) => void;
  handleRecordTypeChange: (option: string) => void;
  currentRecordType: string;
  currentTag: string;
  setCurrentTag: (tag: string) => void;
  setCurrentPage: (page: number) => void;
  currentPage: number;
}
