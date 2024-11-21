import { BLOG } from '@/blog.config'
import { getPostBlocks } from '@/lib/notion'
import { getGlobalData } from '@/lib/notion/getNotionData'
import { generateRss } from '@/lib/rss'
import { generateRobotsTxt } from '@/lib/robots.txt'
import { useRouter } from 'next/router'
import { getLayoutByTheme } from '@/themes/theme'

/**
 * Home page layout
 * @param {*} props
 * @returns
 */
const Index = props => {
  // Load different Layout files based on page path
  const Layout = getLayoutByTheme(useRouter())
  return <Layout {...props} />
}

/**
 * SSG retrieve data

 * @returns
 */
export async function getStaticProps() {
  const from = 'index'
  const props = await getGlobalData({ from })

  const { siteInfo } = props
  props.posts = props.allPages?.filter(
    page =>
      page.type !== 'CONFIG' &&
      page.type !== 'Menu' &&
      page.type !== 'SubMenu' &&
      page.type !== 'Notice' &&
      page.type !== 'Page' &&
      page.status === 'Published'
  )

  const meta = {
    title: `${siteInfo?.title} | ${siteInfo?.description}`,
    description: siteInfo?.description,
    image: siteInfo?.pageCover,
    slug: '',
    type: 'website'
  }
  // Handle pagination
  if (BLOG.POST_LIST_STYLE === 'scroll') {
    // The scrolling list returns all data to the front end by default
  } else if (BLOG.POST_LIST_STYLE === 'page') {
    props.posts = props.posts?.slice(0, BLOG.POSTS_PER_PAGE)
  }

  // Preview article content
  if (BLOG.POST_LIST_PREVIEW === 'true') {
    for (const i in props.posts) {
      const post = props.posts[i]
      if (post.password && post.password !== '') {
        continue
      }
      post.blockMap = await getPostBlocks(
        post.id,
        'slug',
        BLOG.POST_PREVIEW_LINES
      )
    }
  }

  // Generate robotTxt
  generateRobotsTxt()
  // Generate feed subscription
  if (JSON.parse(BLOG.ENABLE_RSS.toString())) {
    generateRss(props?.latestPosts || [])
  }

  // Generate full-text index - only executed when yarn build && process.env.npm_lifecycle_event === 'build'

  delete props.allPages

  return {
    props: {
      meta,
      ...props
    },
    revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND.toString())
  }
}

export default Index
