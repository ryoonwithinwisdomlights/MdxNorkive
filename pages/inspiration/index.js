import { getGlobalData } from '@/lib/notion/getNotionData'
import { useEffect } from 'react'
import { useGlobal } from '@/lib/global'
import { BLOG } from '@/blog.config'
import { useRouter } from 'next/router'
import { getLayoutByTheme } from '@/themes/theme'
import { isBrowser } from '@/lib/utils'
import { formatDateFmt } from '@/lib/formatDate'

const InspirationIndex = props => {
  const { siteInfo } = props
  const { locale } = useGlobal()

  // Load different Layout files based on page path
  const Layout = getLayoutByTheme(useRouter())

  useEffect(() => {
    if (isBrowser) {
      const anchor = window.location.hash
      if (anchor) {
        setTimeout(() => {
          const anchorElement = document.getElementById(anchor.substring(1))
          if (anchorElement) {
            anchorElement.scrollIntoView({ block: 'start', behavior: 'smooth' })
          }
        }, 300)
      }
    }
  }, [])

  const meta = {
    title: `${locale.NAV.INSPIRATION} | ${siteInfo?.title}`,
    description: siteInfo?.description,
    image: siteInfo?.pageCover,
    slug: 'Inspiration',
    type: 'website'
  }

  props = { ...props, meta }

  return <Layout {...props} />
}

export async function getStaticProps() {
  const props = await getGlobalData({
    from: 'inspiration-index',
    type: 'Inspiration'
  })
  // Handle pagination

  props.posts = props.allPages?.filter(page => {
    if (page.type === 'Inspiration') {
      console.log(page)
    }
    return page.type === 'Inspiration' && page.status === 'Published'
  })
  delete props.allPages
  //   console.log('props.posts', props.posts)
  const postsSortByDate = Object.create(props.posts)

  postsSortByDate.sort((a, b) => {
    return b?.publishDate - a?.publishDate
  })

  const InspirationPosts = {}

  postsSortByDate.forEach(post => {
    const date = formatDateFmt(post.publishDate, 'yyyy-MM')
    if (InspirationPosts[date]) {
      InspirationPosts[date].push(post)
    } else {
      InspirationPosts[date] = [post]
    }
  })

  props.InspirationPosts = InspirationPosts
  delete props.allPages

  // console.log(' props.InspirationPosts', props.InspirationPosts)
  return {
    props,
    revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND)
  }
}

export default InspirationIndex
