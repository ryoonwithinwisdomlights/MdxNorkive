import { BaseContentBlock, ExtendedRecordMap } from "notion-types";

export type CollectionQueryResultView = {
  blockIds: string[];
  collection_group_results?: {
    type: string;
    blockIds: string[];
    hasMore: boolean;
  };
  collectionIds?: string[];
  recordMap?: ExtendedRecordMap;
};

export interface CollectionViewBlock extends BaseContentBlock {
  type: "collection_view" | "collection_view_page";
  collection_id?: string;
  view_ids: string[];
  format?: BaseContentBlock["format"] & {
    collection_pointer?: {
      id: string;
      spaceId: string;
      table: string;
    };
  };
}
export type BlockEntriesItem = [blockId: string, block: BlockType];
export type BlockType = {
  role?: string;
  value: {
    id: string;
    type: string;
    properties?: Record<string, any>;
    children?: BlockType[];
  };
};

export type FlterBlockType = {
  value?: {
    id?: string;
    type?: string;
    properties?: Record<string, any>;
    children?: BlockType[];
  };
};
