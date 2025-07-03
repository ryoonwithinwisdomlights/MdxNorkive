export type CollectionQueryResultView = {
  blockIds?: string[];
  collection_group_results?: {
    blockIds?: string[];
  };
};

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
