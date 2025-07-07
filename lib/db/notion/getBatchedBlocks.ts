import { notion_api } from "@/lib/db/notion/notion-api";

/**

* According to []ids, batch fetch blocks
* When getting the list of database articles, 
blocks exceeding a certain number will be discarded,
 so batch fetch blocks according to pageId
* @param {*} ids
 * @param {*} ids
 * @param {*} batchSize
 * @returns
 */
export const fetchInBatches = async (ids, batchSize = 100) => {
  //If ids is not an array, convert it to an array
  if (!Array.isArray(ids)) {
    ids = [ids];
  }

  let fetchedBlocks = {};
  for (let i = 0; i < ids.length; i += batchSize) {
    const batch = ids.slice(i, i + batchSize);
    console.log("[API Request] Fetching missing blocks", batch, ids.length);
    const start = new Date().getTime();
    const pageChunk = await notion_api.getBlocks(batch);
    const end = new Date().getTime();
    console.log(
      `[API Response] Time consuming:${end - start}ms Fetching missing blocks count:${ids.length} `
    );

    console.log("[API response]");
    fetchedBlocks = Object.assign(
      {},
      fetchedBlocks,
      pageChunk?.recordMap?.block
    );
  }
  return fetchedBlocks;
};
