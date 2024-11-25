/* eslint-disable no-unused-vars */
import { BLOG } from '@/blog.config'
import { getPostBlocks } from '@/lib/notion'
import { getGlobalData } from '@/lib/notion/getNotionData'
import { idToUuid } from 'notion-utils'
import { getNotion } from '@/lib/notion/getNotion'
import Slug, { getRecommendPost } from '..'
import { exchangeSlugToType } from '@/lib/utils'

/**
 * Access the page according to the notion slug
 * Parse directories above level three /article/2023/10/29/test
 * @param {*} props
 * @returns
 */
const PrefixSlug = props => {
  return <Slug {...props} />
}

/**
 * Compile rendering page path
 * @returns
 */
export async function getStaticPaths() {
  if (!BLOG.isProd) {
    return {
      paths: [],
      fallback: true
    }
  }

  const from = 'slug-paths'
  const { allPages } = await getGlobalData({ from })
  return {
    paths: allPages
      ?.filter(
        row => hasMultipleSlashes(row.slug) && row.type.indexOf('Menu') < 0
      )
      .map(row => ({
        params: {
          prefix: row.slug.split('/')[0],
          slug: row.slug.split('/')[1],
          suffix: row.slug.split('/').slice(1)
        }
      })),
    fallback: true
  }
}

/**
 * Fetch page data
 * @param {*} param0
 * @returns
 */
export async function getStaticProps({ params: { prefix, slug, suffix } }) {
  let fullSlug = prefix + '/' + slug + '/' + suffix.join('/')
  // console.log(fullSlug, ': fullSlug')
  // console.log(slug, ': slug')
  // console.log(suffix, ': suffix')
  if (JSON.parse(BLOG.PSEUDO_STATIC)) {
    if (!fullSlug.endsWith('.html')) {
      fullSlug += '.html'
    }
  }
  const from = `slug-props-${fullSlug}`
  const type = exchangeSlugToType(slug)
  // console.log('type::', type)
  const props = await getGlobalData({ from, type: type || 'Post' })
  // Find article in list
  props.post = props?.allPages?.find(p => {
    return p.slug === fullSlug || p.id === idToUuid(fullSlug)
  })

  // Process internal information of articles not in the list
  if (!props?.post) {
    const pageId = fullSlug.slice(-1)[0]
    if (pageId.length >= 32) {
      const post = await getNotion(pageId)
      props.post = post
    }
  }

  // Unable to retrieve article

  if (!props?.post) {
    props.post = null
    return { props, revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND) }
  }

  // Article content loading
  if (!props?.posts?.blockMap) {
    props.post.blockMap = await getPostBlocks(props.post.id, from)
  }
  // Recommended related article processing
  const allPosts = props.allPages?.filter(
    page =>
      page.type !== 'CONFIG' &&
      page.type !== 'Menu' &&
      page.type !== 'SubMenu' &&
      page.type !== 'Notice' &&
      page.type !== 'Page' &&
      page.status === 'Published'
  )
  if (allPosts && allPosts.length > 0) {
    const index = allPosts.indexOf(props.post)
    props.prev = allPosts.slice(index - 1, index)[0] ?? allPosts.slice(-1)[0]
    props.next = allPosts.slice(index + 1, index + 2)[0] ?? allPosts[0]
    props.recommendPosts = getRecommendPost(
      props.post,
      allPosts,
      BLOG.POST_RECOMMEND_COUNT
    )
  } else {
    props.prev = null
    props.next = null
    props.recommendPosts = []
  }

  delete props.allPages
  return {
    props,
    revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND)
  }
}

/**
 * Determine whether it contains more than two /
 * @param {*} str
 * @returns
 */
function hasMultipleSlashes(str) {
  const regex = /\/+/g // Create a regular expression that matches all slash symbols
  const matches = str.match(regex) // Find all matching slash symbols in a string
  return matches && matches.length >= 2 // Determine whether the number of matching slash symbols is greater than or equal to 2
}

export default PrefixSlug
