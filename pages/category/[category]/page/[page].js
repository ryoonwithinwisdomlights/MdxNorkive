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

export async function getStaticProps({ params: { category, page } }) {
  const from = 'category-page-props'
  let props = await getGlobalData({ from })

  // Filter status type
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
    .filter(post => post && post.category && post.category.includes(category))
  // Process article page count
  props.postCount = props.posts.length
  // Handle pagination
  props.posts = props.posts.slice(
    BLOG.POSTS_PER_PAGE * (page - 1),
    BLOG.POSTS_PER_PAGE * page
  )

  delete props.allPages
  props.page = page

  props = { ...props, category, page }

  return {
    props,
    revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND)
  }
}

export async function getStaticPaths() {
  const from = 'category-paths'
  const { categoryOptions, allPages } = await getGlobalData({ from })
  const paths = []

  categoryOptions?.forEach(category => {
    // Filter status type
    const categoryPosts = allPages
      ?.filter(
        page =>
          page.type !== 'CONFIG' &&
          page.type !== 'Menu' &&
          page.type !== 'SubMenu' &&
          page.type !== 'Notice' &&
          page.type !== 'Page' &&
          page.status === 'Published'
      )
      .filter(
        post => post && post.category && post.category.includes(category.name)
      )
    // Process article page count
    const postCount = categoryPosts.length
    const totalPages = Math.ceil(postCount / BLOG.POSTS_PER_PAGE)
    if (totalPages > 1) {
      for (let i = 1; i <= totalPages; i++) {
        paths.push({ params: { category: category.name, page: '' + i } })
      }
    }
  })

  return {
    paths,
    fallback: true
  }
}
