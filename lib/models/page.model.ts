import { AllPosts } from "./provider.model";

interface RecommendPost {
  id: string;
  type: string;
  tags?: string[];
}

interface BasicRecordPageType {
  pageType: string;
  recordList?: any[];
}

export type { RecommendPost, BasicRecordPageType };
