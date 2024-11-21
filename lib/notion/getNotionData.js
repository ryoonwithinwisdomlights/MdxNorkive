/* eslint-disable no-unused-vars */
import { BLOG } from '@/blog.config'
import { getDataFromCache, setDataToCache } from '@/lib/cache/cache_manager'
import { getPostBlocks } from '@/lib/notion/getPostBlocks'
import { idToUuid } from 'notion-utils'
import { deepClone } from '../utils'
import { getAllCategories } from './getAllCategories'
import getAllPageIds from './getAllPageIds'
import { getAllTags } from './getAllTags'
import getPageProperties from './getPageProperties'
import { mapImgUrl, compressImage } from './mapImage'

/**
 * Get blog data
 * @param {*} pageId
 * @param {*} from
 * @param latestPostCount Capture the latest number of articles
 * @param categoryCount
 * @param tagsCount Number of intercepted tags
 * @param pageType Filtered article types, array format ['Page','Post']
 * @returns
 *
 */
export async function getCustomedGlobalData({
  pageId = BLOG.NOTION_PAGE_ID,
  from
}) {
  // Get from notice
  const data = await getNotionPageData({ pageId, from })
  const db = deepClone(data)
  // Sensitive data not returned
  delete db.block
  delete db.schema
  delete db.rawMetadata
  delete db.pageIds
  delete db.viewIds
  delete db.collection
  delete db.collectionQuery
  delete db.collectionId
  delete db.collectionView
  return db
}

/**
 * Get blog data
 * @param {*} pageId
 * @param {*} from
 * @param latestPostCount Capture the latest number of articles
 * @param categoryCount
 * @param tagsCount Number of intercepted tags
 * @param pageType Filtered article types, array format ['Page','Post']
 * @returns
 *
 */
export async function getGlobalData({
  pageId = BLOG.NOTION_PAGE_ID,
  type = 'Post',
  from
}) {
  // Get from notice
  const data = await getNotionPageData({ pageId, from, type })
  const db = deepClone(data)
  // Sensitive data not returned
  delete db.block
  delete db.schema
  delete db.rawMetadata
  delete db.pageIds
  delete db.viewIds
  delete db.collection
  delete db.collectionQuery
  delete db.collectionId
  delete db.collectionView
  // console.log('db==', db)
  return db
}

/**
 * Get the latest articles and sort them in descending order
 * according to the last modified time
 * @param {*}} param0
 * @returns
 */
function getLatestPosts({ allPages, from, latestPostCount }) {
  const allPosts = allPages?.filter(
    page =>
      page.type !== 'CONFIG' &&
      page.type !== 'Menu' &&
      page.type !== 'SubMenu' &&
      page.type !== 'Notice' &&
      page.type !== 'Page' &&
      page.status === 'Published'
  )

  const latestPosts = Object.create(allPosts).sort((a, b) => {
    const dateA = new Date(a?.lastEditedDate || a?.publishDate)
    const dateB = new Date(b?.lastEditedDate || b?.publishDate)
    return dateB - dateA
  })
  return latestPosts.slice(0, latestPostCount)
}

/**
 *
Get the collection data of the specified notification
 * @param pageId
 * @param from request source
 * @returns {Promise<JSX.Element|*|*[]>}
 */
export async function getNotionPageData({ type = 'Post', pageId, from }) {
  // Try to get from cachec
  // console.log('type:', type)
  const cacheKey = 'page_block_' + pageId
  const data = await getDataFromCache(cacheKey)
  if (data && data.pageIds?.length > 0) {
    console.log('[cache]:', `from:${from}`, `root-page-id:${pageId}`)
    return data
  }
  const db = await getDataBaseInfoByNotionAPI({ pageId, from, type })
  // cache
  if (db) {
    await setDataToCache(cacheKey, db)
  }
  return db
}

/**
 * Get user-defined single-page menu
 * @param notionPageData
 * @returns {Promise<[]|*[]>}
 */
function getCustomNav({ allPages }) {
  const customNav = []
  if (allPages && allPages.length > 0) {
    allPages.forEach(p => {
      if (p?.slug?.indexOf('http') === 0) {
        customNav.push({
          icon: p.icon || null,
          name: p.title,
          to: p.slug,
          target: '_blank',
          show: true
        })
      } else {
        customNav.push({
          icon: p.icon || null,
          name: p.title,
          to: '/' + p.slug,
          target: '_self',
          show: true
        })
      }
    })
  }
  return customNav
}

/**
 * Get custom menu
 * @param {*} allPages
 * @returns
 */
function getCustomMenu({ collectionData }) {
  const menuPages = collectionData.filter(
    post =>
      (post?.type === BLOG.NOTION_PROPERTY_NAME.type_menu ||
        post?.type === BLOG.NOTION_PROPERTY_NAME.type_sub_menu) &&
      post.status === 'Published'
  )
  const menus = []
  if (menuPages && menuPages.length > 0) {
    menuPages.forEach(e => {
      e.show = true
      if (e?.slug?.indexOf('http') === 0) {
        e.target = '_blank'
      }
      if (e.type === BLOG.NOTION_PROPERTY_NAME.type_menu) {
        menus.push(e)
      } else if (e.type === BLOG.NOTION_PROPERTY_NAME.type_sub_menu) {
        const parentMenu = menus[menus.length - 1]
        if (parentMenu) {
          if (parentMenu.subMenus) {
            parentMenu.subMenus.push(e)
          } else {
            parentMenu.subMenus = [e]
          }
        }
      }
    })
  }
  return menus
}

/**
 * Get label options
 * @param schema
 * @returns {undefined}
 */
function getTagOptions(schema) {
  if (!schema) return {}
  const tagSchema = Object.values(schema).find(
    e => e.name === BLOG.NOTION_PROPERTY_NAME.tags
  )
  return tagSchema?.options || []
}

/**
 * Get classification options
 * @param schema
 * @returns {{}|*|*[]}
 */
function getCategoryOptions(schema) {
  if (!schema) return {}
  const categorySchema = Object.values(schema).find(
    e => e.name === BLOG.NOTION_PROPERTY_NAME.category
  )
  return categorySchema?.options || []
}

/**
 * Site Information
 * @param notionPageData
 * @param from
 * @returns {Promise<{title,description,pageCover,icon}>}
 */
function getSiteInfo({ collection, block }) {
  const title = collection?.name?.[0][0] || BLOG.TITLE
  const description = collection?.description
    ? Object.assign(collection).description[0][0]
    : BLOG.DESCRIPTION
  const pageCover = collection?.cover
    ? mapImgUrl(collection?.cover, block[idToUuid(BLOG.NOTION_PAGE_ID)]?.value)
    : BLOG.HOME_BANNER_IMAGE
  let icon = collection?.icon
    ? mapImgUrl(collection?.icon, collection, 'collection')
    : BLOG.AVATAR

  // Compress user avatar
  icon = compressImage(icon)

  // The site icon cannot be an emoji
  const emojiPattern = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g
  if (!icon || emojiPattern.test(icon)) {
    icon = BLOG.AVATAR
  }
  return { title, description, pageCover, icon }
}

/**
 * 륜로그리스트
 * Used in the gitbook theme, only the title, classification, label and classification information
 * @param {*} param0
 */
export function getRyoonLogListForGitBook({ allPages }) {
  const allLogList = allPages?.filter(post => {
    return (
      post &&
      post?.slug &&
      !post?.slug?.startsWith('http') &&
      post?.type !== 'CONFIG' &&
      post?.type !== 'Menu' &&
      post?.type !== 'SubMenu' &&
      post?.type !== 'Notice' &&
      post?.type !== 'Page' &&
      post?.status === 'Published'
    )
  })

  return allLogList.map(item => ({
    id: item.id,
    title: item.title || '',
    category: item.category || null,
    tags: item.tags || null,
    summary: item.summary || null,
    slug: item.slug,
    pageIcon: item.pageIcon || '',
    lastEditedDate: item.lastEditedDate,
    type: item.type | ''
  }))
}

/**
 * Get a reduced list of articles for navigation
 * Used in the gitbook theme, only the title, classification, label and classification information
of the article are retained, and the summary, password, date and other data are reduced.
 * The conditions for navigation page must be Posts
 * @param {*} param0
 */
export function getNavPagesForGitBook({ allPages }) {
  const allNavPages = allPages?.filter(post => {
    return (
      post &&
      post?.slug &&
      !post?.slug?.startsWith('http') &&
      post?.type !== 'CONFIG' &&
      post?.type !== 'Menu' &&
      post?.type !== 'SubMenu' &&
      post?.type !== 'Notice' &&
      post?.type !== 'Page' &&
      post?.type !== 'TheLog' &&
      post?.status === 'Published'
    )
  })

  return allNavPages.map(item => ({
    id: item.id,
    title: item.title || '',
    pageCoverThumbnail: item.pageCoverThumbnail || '',
    category: item.category || null,
    tags: item.tags || null,
    summary: item.summary || null,
    slug: item.slug,
    pageIcon: item.pageIcon || '',
    lastEditedDate: item.lastEditedDate,
    type: item.type | ''
  }))
}

/**
 * Get a reduced list of articles for navigation
 * Used in the gitbook theme, only the title, classification, label and classification information
of the article are retained, and the summary, password, date and other data are reduced.
 * The conditions for navigation page must be Posts
 * @param {*} param0
 */
export function getNavPages({ allPages }) {
  const allNavPages = allPages?.filter(post => {
    return (
      post &&
      post?.slug &&
      !post?.slug?.startsWith('http') &&
      post?.type !== 'CONFIG' &&
      post?.type !== 'Menu' &&
      post?.type !== 'SubMenu' &&
      post?.type !== 'Notice' &&
      post?.type !== 'Page' &&
      post?.status === 'Published'
    )
  })

  return allNavPages.map(item => ({
    id: item.id,
    title: item.title || '',
    pageCoverThumbnail: item.pageCoverThumbnail || '',
    category: item.category || null,
    tags: item.tags || null,
    summary: item.summary || null,
    slug: item.slug,
    pageIcon: item.pageIcon || '',
    lastEditedDate: item.lastEditedDate,
    type: item.type | ''
  }))
}

/**
 * Get Writings
 */
async function getWriting(post) {
  if (!post) {
    return null
  }

  post.blockMap = await getPostBlocks(post.id, 'data-writing')
  return post
}

/**
 * Get announcements
 */
async function getNotice(post) {
  if (!post) {
    return null
  }

  post.blockMap = await getPostBlocks(post.id, 'data-notice')
  return post
}

// Get announcements
const EmptyData = pageId => {
  const empty = {
    notice: null,
    siteInfo: getSiteInfo({}),
    allPages: [
      {
        id: 1,
        title: `Unable to get Notion data，Please check Notion_ID： \n current ${pageId}`,
        summary:
          'Visit documentation for help→ https://tangly1024.com/article/vercel-deploy-notion-next',
        status: 'Published',
        type: 'Post',
        slug: '13a171332816461db29d50e9f575b00d',
        date: {
          start_date: '2023-04-24',
          lastEditedDay: '2023-04-24',
          tagItems: []
        }
      }
    ],
    allNavPages: [],
    collection: [],
    collectionQuery: {},
    collectionId: null,
    collectionView: {},
    viewIds: [],
    block: {},
    schema: {},
    tagOptions: [],
    categoryOptions: [],
    rawMetadata: {},
    customNav: [],
    customMenu: [],
    postCount: 1,
    pageIds: [],
    latestPosts: []
  }
  return empty
}

/**
 * Call NotionAPI to obtain Page data
 * @returns {Promise<JSX.Element|null|*>}
 */
async function getDataBaseInfoByNotionAPI({ pageId, from, type = 'Post' }) {
  const pageRecordMap = await getPostBlocks(pageId, from)
  if (!pageRecordMap) {
    console.error('can`t get Notion Data ; Which id is: ', pageId)
    return {}
  }
  pageId = idToUuid(pageId)
  const block = pageRecordMap.block || {}
  const rawMetadata = block[pageId]?.value
  // Check Type Page-Database and Inline-Database
  if (
    rawMetadata?.type !== 'collection_view_page' &&
    rawMetadata?.type !== 'collection_view'
  ) {
    console.error(`pageId "${pageId}" is not a database`)
    return EmptyData(pageId)
  }
  const collection = Object.values(pageRecordMap.collection)[0]?.value || {}
  const siteInfo = getSiteInfo({ collection, block })
  const collectionId = rawMetadata?.collection_id
  const collectionQuery = pageRecordMap.collection_query
  const collectionView = pageRecordMap.collection_view
  const schema = collection?.schema

  const viewIds = rawMetadata?.view_ids
  const collectionData = []
  const pageIds = getAllPageIds(
    collectionQuery,
    collectionId,
    collectionView,
    viewIds
  )
  if (pageIds?.length === 0) {
    console.error(
      'The obtained article list is empty, please check the notification template',
      collectionQuery,
      collection,
      collectionView,
      viewIds,
      pageRecordMap
    )
  }
  for (let i = 0; i < pageIds.length; i++) {
    const id = pageIds[i]
    const value = block[id]?.value
    if (!value) {
      continue
    }
    const properties =
      (await getPageProperties(
        id,
        block,
        schema,
        null,
        getTagOptions(schema)
        // getCategoryOptions(schema),
      )) || null
    if (properties) {
      // console.log('properties:', properties)
      collectionData.push(properties)
    }
  }

  // article count
  let postCount = 0

  // 노션전체 포스트들 Find all Posts and Pages
  const allPages = collectionData.filter(post => {
    // console.log('type::: ', type, 'post?.type', post?.type)
    if (type === 'Writing') {
      if (post?.type === 'Writing' && post.status === 'Published') {
        postCount++
      }
    } else if (type === 'Inspiration') {
      if (post?.type === 'Inspiration' && post.status === 'Published') {
        postCount++
      }
    } else if (type === 'Sideproject') {
      if (post?.type === 'Sideproject' && post.status === 'Published') {
        postCount++
      }
    } else if (type === 'TheLog') {
      if (post?.type === 'TheLog' && post.status === 'Published') {
        postCount++
      }
    } else if (type === 'GuestBook') {
      if (post?.type === 'GuestBook' && post.status === 'Published') {
        postCount++
      }
    } else if (type === 'AGiveAwayLog') {
      if (post?.type === 'AGiveAwayLog' && post.status === 'Published') {
        postCount++
      }
    } else if (type === 'TechLog') {
      if (post?.type === 'TechLog' && post.status === 'Published') {
        postCount++
      }
    } else {
      postCount++
    }
    // if (post?.type === 'Post' && post.status === 'Published') {
    //   postCount++
    // }
    return (
      post &&
      post?.slug &&
      !post?.slug?.startsWith('http') &&
      (post?.status === 'Invisible' || post?.status === 'Published')
    )
  })

  // console.log('allPages', allPages)
  // Sort by date
  if (BLOG.POSTS_SORT_BY === 'date') {
    allPages.sort((a, b) => {
      return b?.publishDate - a?.publishDate
    })
  }

  const notice = await getNotice(
    collectionData.filter(post => {
      return (
        post &&
        post?.type &&
        post?.type === 'Notice' &&
        post.status === 'Published'
      )
    })?.[0]
  )

  // const read = await getWriting(
  //   collectionData.filter(post => {
  //     return (
  //       post &&
  //       post?.type &&
  //       post?.type === 'Read' &&
  //       post.status === 'Published'
  //     )
  //   })?.[0]
  // )
  const categoryOptions = getAllCategories({
    allPages,
    categoryOptions: getCategoryOptions(schema)
  })

  // getsSubTypeOptions
  const tagOptions = getAllTags({ allPages, tagOptions: getTagOptions(schema) })

  // old menu
  const customNav = getCustomNav({
    allPages: collectionData.filter(
      post => post?.type === 'Page' && post.status === 'Published'
    )
  })
  // new menu
  const customMenu = await getCustomMenu({ collectionData })
  const latestPosts = getLatestPosts({ allPages, from, latestPostCount: 6 })
  const allNavPages = getNavPages({ allPages })
  const allNavPagesForGitBook = getNavPagesForGitBook({ allPages })
  const allRyoonLogListForGitBook = getRyoonLogListForGitBook({ allPages })
  return {
    notice,
    siteInfo,
    allPages,
    allNavPages,
    allNavPagesForGitBook,
    allRyoonLogListForGitBook,
    collection,
    collectionQuery,
    collectionId,
    collectionView,
    viewIds,
    block,
    schema,
    tagOptions,
    categoryOptions,
    rawMetadata,
    customNav,
    customMenu,
    postCount,
    pageIds,
    latestPosts
  }
}
