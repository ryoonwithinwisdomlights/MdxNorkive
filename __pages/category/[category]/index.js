import { getGlobalData } from '@/lib/notion/getNotionData'
import React from 'react'
import { useGlobal } from '@/lib/global'
import { BLOG } from '@/blog.config'
import { useRouter } from 'next/router'
import { getLayoutByTheme } from '@/themes/theme'

/**
 * Category page
 * @param {*} props
 * @returns
 */
export default function Category(props) {
  const { siteInfo } = props
  const { locale } = useGlobal()

  // Load different Layout files based on page path
  const Layout = getLayoutByTheme(useRouter())

  const meta = {
    title: `${props.category} | ${locale.COMMON.CATEGORY} | ${
      siteInfo?.title || ''
    }`,
    description: siteInfo?.description,
    slug: 'category/' + props.category,
    image: siteInfo?.pageCover,
    type: 'website'
  }

  props = { ...props, meta }

  return <Layout {...props} />
}

export async function getStaticProps({ params: { category } }) {
  const from = 'category-props'
  let props = await getGlobalData({ from })

  // filter status
  props.posts = props.allPages?.filter(
    page =>
      page.type !== 'CONFIG' &&
      page.type !== 'Menu' &&
      page.type !== 'SubMenu' &&
      page.type !== 'Notice' &&
      page.type !== 'Page' &&
      page.status === 'Published'
  )
  // Process filtering
  props.posts = props.posts.filter(
    post => post && post.category && post.category.includes(category)
  )
  // Process article page count
  props.postCount = props.posts.length
  // Handle pagination
  if (BLOG.POST_LIST_STYLE === 'scroll') {
    // Scroll list returns all data to the front end
  } else if (BLOG.POST_LIST_STYLE === 'page') {
    props.posts = props.posts?.slice(0, BLOG.POSTS_PER_PAGE)
  }

  delete props.allPages

  props = { ...props, category }

  return {
    props,
    revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND)
  }
}

export async function getStaticPaths() {
  const from = 'category-paths'
  const { categoryOptions } = await getGlobalData({ from })
  return {
    paths: Object.keys(categoryOptions).map(category => ({
      params: { category: categoryOptions[category]?.name }
    })),
    fallback: true
  }
}
