import { getGlobalData } from '@/lib/notion/getNotionData'
import { useGlobal } from '@/lib/global'
import { getDataFromCache } from '@/lib/cache/cache_manager'
import { BLOG } from '@/blog.config'
import { useRouter } from 'next/router'
import { getLayoutByTheme } from '@/themes/theme'

const Index = props => {
  const { keyword, siteInfo } = props
  const { locale } = useGlobal()

  // Load different Layout files based on page path
  const Layout = getLayoutByTheme(useRouter())

  const meta = {
    title: `${keyword || ''}${keyword ? ' | ' : ''}${locale.NAV.SEARCH} | ${
      siteInfo?.title
    }`,
    description: siteInfo?.title,
    image: siteInfo?.pageCover,
    slug: 'search/' + (keyword || ''),
    type: 'website'
  }

  props = { ...props, meta, currentSearch: keyword }

  return <Layout {...props} />
}

/**
 * Server-side search
 * @param {*} param0
 * @returns
 */
export async function getStaticProps({ params: { keyword, page } }) {
  const props = await getGlobalData({
    from: 'search-props'
    // pageType: ['Post']
  })
  const { allPages } = props
  const allPosts = allPages?.filter(
    page =>
      page.type !== 'CONFIG' &&
      page.type !== 'Menu' &&
      page.type !== 'SubMenu' &&
      page.type !== 'Notice' &&
      page.type !== 'Page' &&
      page.status === 'Published'
  )
  props.posts = await filterByMemCache(allPosts, keyword)
  props.postCount = props.posts.length
  // Handle pagination
  props.posts = props.posts.slice(
    BLOG.POSTS_PER_PAGE * (page - 1),
    BLOG.POSTS_PER_PAGE * page
  )
  props.keyword = keyword
  props.page = page
  delete props.allPages
  return {
    props,
    revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND)
  }
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { keyword: BLOG.TITLE, page: '1' } }],
    fallback: true
  }
}

/**
 * Splice the specified fields of the object into a string
 * @param sourceTextArray
 * @param targetObj
 * @param key
 * @returns {*}
 */
function appendText(sourceTextArray, targetObj, key) {
  if (!targetObj) {
    return sourceTextArray
  }
  const textArray = targetObj[key]
  const text = textArray ? getTextContent(textArray) : ''
  if (text && text !== 'Untitled') {
    return sourceTextArray.concat(text)
  }
  return sourceTextArray
}

/**
 * Recursively obtain nested arrays
 * @param {*} textArray
 * @returns
 */
function getTextContent(textArray) {
  if (typeof textArray === 'object' && isIterable(textArray)) {
    let result = ''
    for (const textObj of textArray) {
      result = result + getTextContent(textObj)
    }
    return result
  } else if (typeof textArray === 'string') {
    return textArray
  }
}

/**
 * Whether the object can be traversed
 * @param {*} obj
 * @returns
 */
const isIterable = obj =>
  obj != null && typeof obj[Symbol.iterator] === 'function'

/**
 * Full-text indexing in memory cache
 * @param {*} allPosts
 * @param keyword Key words
 * @returns
 */
async function filterByMemCache(allPosts, keyword) {
  const filterPosts = []
  if (keyword) {
    keyword = keyword.trim()
  }
  for (const post of allPosts) {
    const cacheKey = 'page_block_' + post.id
    const page = await getDataFromCache(cacheKey, true)
    const tagContent =
      post?.tags && Array.isArray(post?.tags) ? post?.tags.join(' ') : ''
    const categoryContent =
      post.category && Array.isArray(post.category)
        ? post.category.join(' ')
        : ''
    const articleInfo = post.title + post.summary + tagContent + categoryContent
    let hit = articleInfo.indexOf(keyword) > -1
    let indexContent = [post.summary]
    if (page && page.block) {
      const contentIds = Object.keys(page.block)
      contentIds.forEach(id => {
        const properties = page?.block[id]?.value?.properties
        indexContent = appendText(indexContent, properties, 'title')
        indexContent = appendText(indexContent, properties, 'caption')
      })
    }
    // console.log('Full text search cache', cacheKey, page != null)
    post.results = []
    let hitCount = 0
    for (const i in indexContent) {
      const c = indexContent[i]
      if (!c) {
        continue
      }
      const index = c.toLowerCase().indexOf(keyword.toLowerCase())
      if (index > -1) {
        hit = true
        hitCount += 1
        post.results.push(c)
      } else {
        if ((post.results.length - 1) / hitCount < 3 || i === 0) {
          post.results.push(c)
        }
      }
    }
    if (hit) {
      filterPosts.push(post)
    }
  }
  return filterPosts
}

export default Index
