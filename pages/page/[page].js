import { BLOG } from '@/blog.config'
import { getPostBlocks } from '@/lib/notion'
import { getGlobalData } from '@/lib/notion/getNotionData'
import { useRouter } from 'next/router'
import { getLayoutByTheme } from '@/themes/theme'

/**
 * Article list pagination
 * @param {*} props
 * @returns
 */
const Page = props => {
  const { siteInfo } = props

  // Load different Layout files based on page path
  const Layout = getLayoutByTheme(useRouter())

  const meta = {
    title: `${props?.page} | Page | ${siteInfo?.title}`,
    description: siteInfo?.description,
    image: siteInfo?.pageCover,
    slug: 'page/' + props.page,
    type: 'website'
  }

  props = { ...props, meta }

  return <Layout {...props} />
}

export async function getStaticPaths() {
  const from = 'page-paths'
  const { postCount } = await getGlobalData({ from })
  const totalPages = Math.ceil(postCount / BLOG.POSTS_PER_PAGE)
  return {
    // remove first page, we 're not gonna handle that.
    paths: Array.from({ length: totalPages - 1 }, (_, i) => ({
      params: { page: '' + (i + 2) }
    })),
    fallback: true
  }
}

export async function getStaticProps({ params: { page } }) {
  const from = `page-${page}`
  const props = await getGlobalData({ from })
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
  // Handle pagination
  props.posts = allPosts.slice(
    BLOG.POSTS_PER_PAGE * (page - 1),
    BLOG.POSTS_PER_PAGE * page
  )
  props.page = page

  // Handle preview
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

  delete props.allPages
  return {
    props,
    revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND)
  }
}

export default Page
