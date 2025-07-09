// src/notion-api.ts
import ky from "ky";
import {
  getBlockCollectionId,
  getPageContentBlockIds,
  parsePageId,
  uuidToId,
} from "notion-utils";
import pMap from "p-map";
var NotionAPI = class {
  _apiBaseUrl;
  _authToken;
  _activeUser;
  _userTimeZone;
  _kyOptions;
  constructor({
    apiBaseUrl = "https://www.notion.so/api/v3",
    authToken,
    activeUser,
    userTimeZone = "America/New_York",
    kyOptions,
  } = {}) {
    this._apiBaseUrl = apiBaseUrl;
    this._authToken = authToken;
    this._activeUser = activeUser;
    this._userTimeZone = userTimeZone;
    this._kyOptions = kyOptions;
  }
  async getPage(
    pageId,
    {
      concurrency = 3,
      fetchMissingBlocks = true,
      fetchCollections = true,
      signFileUrls = true,
      chunkLimit = 100,
      chunkNumber = 0,
      throwOnCollectionErrors = false,
      collectionReducerLimit = 999,
      kyOptions,
    } = {}
  ) {
    const page = await this.getPageRaw(pageId, {
      chunkLimit,
      chunkNumber,
      kyOptions,
    });
    const recordMap = page?.recordMap;
    if (!recordMap?.block) {
      throw new Error(`Notion page not found "${uuidToId(pageId)}"`);
    }
    recordMap.collection = recordMap.collection ?? {};
    recordMap.collection_view = recordMap.collection_view ?? {};
    recordMap.notion_user = recordMap.notion_user ?? {};
    recordMap.collection_query = {};
    recordMap.signed_urls = {};
    if (fetchMissingBlocks) {
      while (true) {
        const pendingBlockIds = getPageContentBlockIds(recordMap).filter(
          (id) => !recordMap.block[id]
        );
        if (!pendingBlockIds.length) {
          break;
        }
        const newBlocks = await this.getBlocks(pendingBlockIds, kyOptions).then(
          (res) => res.recordMap.block
        );
        recordMap.block = { ...recordMap.block, ...newBlocks };
      }
    }
    const contentBlockIds = getPageContentBlockIds(recordMap);
    if (fetchCollections) {
      const allCollectionInstances = contentBlockIds.flatMap((blockId) => {
        const block = recordMap.block[blockId]?.value;
        const collectionId =
          block &&
          (block.type === "collection_view" ||
            block.type === "collection_view_page") &&
          getBlockCollectionId(block, recordMap);
        if (collectionId) {
          return block.view_ids?.map((collectionViewId) => ({
            collectionId,
            collectionViewId,
          }));
        } else {
          return [];
        }
      });
      await pMap(
        allCollectionInstances,
        async (collectionInstance) => {
          const { collectionId, collectionViewId } = collectionInstance;
          const collectionView =
            recordMap.collection_view[collectionViewId]?.value;
          try {
            const collectionData = await this.getCollectionData(
              collectionId,
              collectionViewId,
              collectionView,
              {
                limit: collectionReducerLimit,
                kyOptions,
              }
            );
            recordMap.block = {
              ...recordMap.block,
              ...collectionData.recordMap.block,
            };
            recordMap.collection = {
              ...recordMap.collection,
              ...collectionData.recordMap.collection,
            };
            recordMap.collection_view = {
              ...recordMap.collection_view,
              ...collectionData.recordMap.collection_view,
            };
            recordMap.notion_user = {
              ...recordMap.notion_user,
              ...collectionData.recordMap.notion_user,
            };
            recordMap.collection_query[collectionId] = {
              ...recordMap.collection_query[collectionId],
              [collectionViewId]: collectionData.result?.reducerResults,
            };
          } catch (err) {
            console.warn(
              "NotionAPI collectionQuery error",
              { pageId, collectionId, collectionViewId },
              err.message
            );
            if (throwOnCollectionErrors) {
              throw err;
            } else {
              console.error(err);
            }
          }
        },
        {
          concurrency,
        }
      );
    }
    if (signFileUrls) {
      await this.addSignedUrls({ recordMap, contentBlockIds, kyOptions });
    }
    return recordMap;
  }
  async addSignedUrls({ recordMap, contentBlockIds, kyOptions = {} }) {
    recordMap.signed_urls = {};
    if (!contentBlockIds) {
      contentBlockIds = getPageContentBlockIds(recordMap);
    }
    const allFileInstances = contentBlockIds.flatMap((blockId) => {
      const block = recordMap.block[blockId]?.value;
      if (
        block &&
        (block.type === "pdf" ||
          block.type === "audio" ||
          (block.type === "image" && block.file_ids?.length) ||
          block.type === "video" ||
          block.type === "file" ||
          block.type === "page")
      ) {
        const source =
          block.type === "page"
            ? block.format?.page_cover
            : block.properties?.source?.[0]?.[0];
        if (source) {
          if (
            source.includes("secure.notion-static.com") ||
            source.includes("prod-files-secure") ||
            source.includes("attachment:")
          ) {
            return {
              permissionRecord: {
                table: "block",
                id: block.id,
              },
              url: source,
            };
          }
          return [];
        }
      }
      return [];
    });
    if (allFileInstances.length > 0) {
      try {
        const { signedUrls } = await this.getSignedFileUrls(
          allFileInstances,
          kyOptions
        );
        if (signedUrls.length === allFileInstances.length) {
          for (const [i, file] of allFileInstances.entries()) {
            const signedUrl = signedUrls[i];
            if (!signedUrl) continue;
            const blockId = file.permissionRecord.id;
            if (!blockId) continue;
            recordMap.signed_urls[blockId] = signedUrl;
          }
        }
      } catch (err) {
        console.warn("NotionAPI getSignedfileUrls error", err);
      }
    }
  }
  async getPageRaw(
    pageId,
    { kyOptions, chunkLimit = 100, chunkNumber = 0 } = {}
  ) {
    const parsedPageId = parsePageId(pageId);
    if (!parsedPageId) {
      throw new Error(`invalid notion pageId "${pageId}"`);
    }
    const body = {
      pageId: parsedPageId,
      limit: chunkLimit,
      chunkNumber,
      cursor: { stack: [] },
      verticalColumns: false,
    };
    return this.fetch({
      endpoint: "loadPageChunk",
      body,
      kyOptions,
    });
  }
  async getCollectionData(
    collectionId,
    collectionViewId,
    collectionView,
    {
      limit = 999,
      searchQuery = "",
      userTimeZone = this._userTimeZone,
      loadContentCover = true,
      kyOptions,
    } = {}
  ) {
    const type = collectionView?.type;
    const isBoardType = type === "board";
    const groupBy = isBoardType
      ? collectionView?.format?.board_columns_by
      : collectionView?.format?.collection_group_by;
    let filters = [];
    if (collectionView?.format?.property_filters) {
      filters = collectionView.format?.property_filters.map((filterObj) => {
        return {
          filter: filterObj?.filter?.filter,
          property: filterObj?.filter?.property,
        };
      });
    }
    if (collectionView?.query2?.filter?.filters) {
      filters.push(...collectionView.query2.filter.filters);
    }
    let loader = {
      type: "reducer",
      reducers: {
        collection_group_results: {
          type: "results",
          limit,
          loadContentCover,
        },
      },
      sort: [],
      ...collectionView?.query2,
      filter: {
        filters,
        operator: "and",
      },
      searchQuery,
      userTimeZone,
    };
    if (groupBy) {
      const groups =
        collectionView?.format?.board_columns ||
        collectionView?.format?.collection_groups ||
        [];
      const iterators = [
        isBoardType ? "board" : "group_aggregation",
        "results",
      ];
      const operators = {
        checkbox: "checkbox_is",
        url: "string_starts_with",
        text: "string_starts_with",
        select: "enum_is",
        multi_select: "enum_contains",
        created_time: "date_is_within",
        undefined: "is_empty",
      };
      const reducersQuery = {};
      for (const group of groups) {
        const {
          property,
          value: { value, type: type2 },
        } = group;
        for (const iterator of iterators) {
          const iteratorProps =
            iterator === "results"
              ? {
                  type: iterator,
                  limit,
                }
              : {
                  type: "aggregation",
                  aggregation: {
                    aggregator: "count",
                  },
                };
          const isUncategorizedValue = value === void 0;
          const isDateValue = value?.range;
          const queryLabel = isUncategorizedValue
            ? "uncategorized"
            : isDateValue
              ? value.range?.start_date || value.range?.end_date
              : value?.value || value;
          const queryValue =
            !isUncategorizedValue && (isDateValue || value?.value || value);
          reducersQuery[`${iterator}:${type2}:${queryLabel}`] = {
            ...iteratorProps,
            filter: {
              operator: "and",
              filters: [
                {
                  property,
                  filter: {
                    operator: !isUncategorizedValue
                      ? operators[type2]
                      : "is_empty",
                    ...(!isUncategorizedValue && {
                      value: {
                        type: "exact",
                        value: queryValue,
                      },
                    }),
                  },
                },
              ],
            },
          };
        }
      }
      const reducerLabel = isBoardType ? "board_columns" : `${type}_groups`;
      loader = {
        type: "reducer",
        reducers: {
          [reducerLabel]: {
            type: "groups",
            groupBy,
            ...(collectionView?.query2?.filter && {
              filter: collectionView?.query2?.filter,
            }),
            groupSortPreference: groups.map((group) => group?.value),
            limit,
          },
          ...reducersQuery,
        },
        ...collectionView?.query2,
        searchQuery,
        userTimeZone,
        //TODO: add filters here
        filter: {
          filters,
          operator: "and",
        },
      };
    }
    return this.fetch({
      endpoint: "queryCollection",
      body: {
        collection: {
          id: collectionId,
        },
        collectionView: {
          id: collectionViewId,
        },
        source: {
          type: "collection",
          id: collectionId,
        },
        loader,
      },
      kyOptions: {
        timeout: 6e4,
        ...kyOptions,
        searchParams: {
          // TODO: spread kyOptions?.searchParams
          src: "initial_load",
        },
      },
    });
  }
  async getUsers(userIds, kyOptions) {
    return this.fetch({
      endpoint: "getRecordValues",
      body: {
        requests: userIds.map((id) => ({ id, table: "notion_user" })),
      },
      kyOptions,
    });
  }
  async getBlocks(blockIds, kyOptions) {
    return this.fetch({
      endpoint: "syncRecordValues",
      body: {
        requests: blockIds.map((blockId) => ({
          // TODO: when to use table 'space' vs 'block'?
          table: "block",
          id: blockId,
          version: -1,
        })),
      },
      kyOptions,
    });
  }
  async getSignedFileUrls(urls, kyOptions) {
    return this.fetch({
      endpoint: "getSignedFileUrls",
      body: {
        urls,
      },
      kyOptions,
    });
  }
  async search(params, kyOptions) {
    const body = {
      type: "BlocksInAncestor",
      source: "quick_find_public",
      ancestorId: parsePageId(params.ancestorId),
      sort: {
        field: "relevance",
      },
      limit: params.limit || 20,
      query: params.query,
      filters: {
        isDeletedOnly: false,
        isNavigableOnly: false,
        excludeTemplates: true,
        requireEditPermissions: false,
        includePublicPagesWithoutExplicitAccess: true,
        ancestors: [],
        createdBy: [],
        editedBy: [],
        lastEditedTime: {},
        createdTime: {},
        ...params.filters,
      },
    };
    return this.fetch({
      endpoint: "search",
      body,
      kyOptions,
    });
  }
  async fetch({ endpoint, body, kyOptions, headers: clientHeaders }) {
    const headers = {
      ...clientHeaders,
      ...this._kyOptions?.headers,
      ...kyOptions?.headers,
      "Content-Type": "application/json",
    };
    if (this._authToken) {
      headers.cookie = `token_v2=${this._authToken}`;
    }
    if (this._activeUser) {
      headers["x-notion-active-user-header"] = this._activeUser;
    }
    const url = `${this._apiBaseUrl}/${endpoint}`;
    const res = await ky.post(url, {
      mode: "no-cors",
      ...this._kyOptions,
      ...kyOptions,
      json: body,
      headers,
    });
    return res.json();
  }
};
export { NotionAPI };
//# sourceMappingURL=index.js.map
