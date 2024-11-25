import { useGlobal } from '@/lib/global'
import { getGlobalData } from '@/lib/notion/getNotionData'
import { BLOG } from '@/blog.config'
import { useRouter } from 'next/router'
import { getLayoutByTheme } from '@/themes/theme'

const Tag = props => {
  const { locale } = useGlobal()
  const { tag, siteInfo } = props

  // Load different Layout files based on page path
  const Layout = getLayoutByTheme(useRouter())

  const meta = {
    title: `${tag} | ${locale.COMMON.TAGS} | ${siteInfo?.title}`,
    description: siteInfo?.description,
    image: siteInfo?.pageCover,
    slug: 'tag/' + tag,
    type: 'website'
  }
  props = { ...props, meta }

  return <Layout {...props} />
}

export async function getStaticProps({ params: { tag, page } }) {
  const from = 'tag-page-props'
  const props = await getGlobalData({ from })
  // Filter status, label
  props.posts = props.allPages
    ?.filter(
      page =>
        page.type !== 'CONFIG' &&
        page.type !== 'Menu' &&
        page.type !== 'SubMenu' &&
        page.type !== 'Notice' &&
        page.type !== 'Page' &&
        page.status === 'Published'
    )
    .filter(post => post && post?.tags && post?.tags.includes(tag))
  // Number of articles processed
  props.postCount = props.posts.length
  // Handle pagination
  props.posts = props.posts.slice(
    BLOG.POSTS_PER_PAGE * (page - 1),
    BLOG.POSTS_PER_PAGE * page
  )

  props.tag = tag
  props.page = page
  delete props.allPages
  return {
    props,
    revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND)
  }
}

export async function getStaticPaths() {
  const from = 'tag-page-static-path'
  const { tagOptions, allPages } = await getGlobalData({ from })
  const paths = []
  tagOptions?.forEach(tag => {
    // Filter status type
    const tagPosts = allPages
      ?.filter(
        page =>
          page.type !== 'CONFIG' &&
          page.type !== 'Menu' &&
          page.type !== 'SubMenu' &&
          page.type !== 'Notice' &&
          page.type !== 'Page' &&
          page.status === 'Published'
      )
      .filter(post => post && post?.tags && post?.tags.includes(tag.name))
    // Process article page count
    const postCount = tagPosts.length
    const totalPages = Math.ceil(postCount / BLOG.POSTS_PER_PAGE)
    if (totalPages > 1) {
      for (let i = 1; i <= totalPages; i++) {
        paths.push({ params: { tag: tag.name, page: '' + i } })
      }
    }
  })
  return {
    paths: paths,
    fallback: true
  }
}

export default Tag
