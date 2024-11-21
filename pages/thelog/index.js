import { getGlobalData } from '@/lib/notion/getNotionData'
import { useEffect } from 'react'
import { useGlobal } from '@/lib/global'
import { BLOG } from '@/blog.config'
import { useRouter } from 'next/router'
import { getLayoutByTheme } from '@/themes/theme'
import { isBrowser } from '@/lib/utils'
import { formatDateFmt } from '@/lib/formatDate'

const TheLogIndex = props => {
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
    title: `${locale.NAV.WRITING} | ${siteInfo?.title}`,
    description: siteInfo?.description,
    image: siteInfo?.pageCover,
    slug: 'thelog',
    type: 'website'
  }

  props = { ...props, meta }

  return <Layout {...props} />
}

export async function getStaticProps() {
  const props = await getGlobalData({ from: 'thelog-index', type: 'TheLog' })
  // Handle pagination
  //   console.log('props.allPages', props.allPages)
  // console.log('getStaticProps')
  props.posts = props.allPages?.filter(page => {
    if (page.type === 'TheLog') {
      //   console.log(page)
    }
    return page.type === 'TheLog' && page.status === 'Published'
  })

  //   console.log('props.posts', props.posts)
  const postsSortByDate = Object.create(props.posts)

  postsSortByDate.sort((a, b) => {
    return b?.publishDate - a?.publishDate
  })

  const theLogPosts = {}

  postsSortByDate.forEach(post => {
    const date = formatDateFmt(post.publishDate, 'yyyy-MM')

    if (date !== '2012-12' && date !== '2013-12' && date !== '2015-07') {
      if (theLogPosts[date]) {
        theLogPosts[date].push(post)
      } else {
        theLogPosts[date] = [post]
      }
    }
  })

  props.theLogPosts = theLogPosts

  delete props.allPages

  // console.log(' props.theLogPosts', props.theLogPosts)
  return {
    props,
    revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND)
  }
}

export default TheLogIndex
