import { useGlobal } from '@/lib/global'
import { getGlobalData } from '@/lib/notion/getNotionData'
import { BLOG } from '@/blog.config'
import { useRouter } from 'next/router'
import { getLayoutByTheme } from '@/themes/theme'

/**
 * List of articles under the tag
 * @param {*} props
 * @returns
 */
const Tag = props => {
  const { locale } = useGlobal()
  const { tag, siteInfo } = props
  // console.log('siteInfo:', siteInfo)
  // console.log('tag:', tag)
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

export async function getStaticProps({ params: { tag } }) {
  const from = 'tag-props'
  const props = await getGlobalData({ from })

  // filter status
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

  // Process article page count
  props.postCount = props.posts.length

  // Handle pagination
  if (BLOG.POST_LIST_STYLE === 'scroll') {
    // Scroll list returns all data to the front end
  } else if (BLOG.POST_LIST_STYLE === 'page') {
    props.posts = props.posts?.slice(0, BLOG.POSTS_PER_PAGE)
  }

  props.tag = tag
  delete props.allPages
  return {
    props,
    revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND)
  }
}

/**
 * Get all tags
 * @returns
 * @param tags
 */
function getTagNames(tags) {
  const tagNames = []
  tags.forEach(tag => {
    tagNames.push(tag.name)
  })
  return tagNames
}

export async function getStaticPaths() {
  const from = 'tag-static-path'
  const { tagOptions } = await getGlobalData({ from })
  const tagNames = getTagNames(tagOptions)

  return {
    paths: Object.keys(tagNames).map(index => ({
      params: { tag: tagNames[index] }
    })),
    fallback: true
  }
}

export default Tag
