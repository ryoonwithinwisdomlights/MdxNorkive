import type { Client } from "@notionhq/client";
import { notion } from "@/app/api/clients";
import { ListBlockChildrenResponse } from "@notionhq/client/build/src/api-endpoints";
export type BlockChildren = Awaited<
  ReturnType<InstanceType<typeof Client>["blocks"]["children"]["list"]>
>["results"];

export async function getAllBlockChildren(blockId: string) {
  let blocks: BlockChildren = [];
  let cursor: string | undefined;

  do {
    const res: ListBlockChildrenResponse = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
    });
    console.log("res:::", res);
    blocks = blocks.concat(res.results);
    if (!res.next_cursor) break;

    cursor = res.next_cursor;
  } while (cursor);

  return blocks;
}
//   let blocks: BlockChildren = [];
//   let nextCursor: string | null = null;
//   let hasMore = true;
//   while (hasMore) {
//     const res: ListBlockChildrenResponse = await notion.blocks.children.list({
//       block_id: blockId,
//       page_size: 100,
//       start_cursor: nextCursor ?? undefined,
//     });
//     blocks.push(...res.results);
//     hasMore = res.has_more;
//     nextCursor = res.next_cursor;

//     if (hasMore) {
//       console.log("load more blocks in page...");
//     }
//   }

//   return blocks;
