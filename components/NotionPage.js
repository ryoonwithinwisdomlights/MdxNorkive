import { NotionRenderer } from 'react-notion-x'
import dynamic from 'next/dynamic'
import mediumZoom from '@fisch0920/medium-zoom'
import React, { useEffect, useRef } from 'react'
import TweetEmbed from 'react-tweet-embed'

import { BLOG } from '@/blog.config'
import 'katex/dist/katex.min.css'
import { mapImgUrl } from '@/lib/notion/mapImage'
import { isBrowser } from '@/lib/utils'

const Code = dynamic(
  () =>
    import('react-notion-x/build/third-party/code').then(async m => {
      return m.Code
    }),
  { ssr: false }
)

const Equation = dynamic(
  () =>
    import('@/components/Equation').then(async m => {
      // chemical equation

      await import('@/lib/mhchem')
      return m.Equation
    }),
  { ssr: false }
)

const Pdf = dynamic(
  () => import('react-notion-x/build/third-party/pdf').then(m => m.Pdf),
  {
    ssr: false
  }
)

// https://github.com/txs
// import PrismMac from '@/components/PrismMac'
const PrismMac = dynamic(() => import('@/components/PrismMac'), {
  ssr: false
})

const Collection = dynamic(
  () =>
    import('react-notion-x/build/third-party/collection').then(
      m => m.Collection
    ),
  { ssr: true }
)

const Modal = dynamic(
  () => import('react-notion-x/build/third-party/modal').then(m => m.Modal),
  { ssr: false }
)

const Tweet = ({ id }) => {
  return <TweetEmbed tweetId={id} />
}

const NotionPage = ({ post, className }) => {
  useEffect(() => {
    autoScrollToTarget()
  }, [])

  const zoom =
    typeof window !== 'undefined' &&
    mediumZoom({
      container: '.notion-viewport',
      background: 'rgba(0, 0, 0, 0.2)',
      margin: getMediumZoomMargin()
    })
  const zoomRef = useRef(zoom ? zoom.clone() : null)

  useEffect(() => {
    // Add the zoom function to the pictures in the gallery
    if (JSON.parse(BLOG.POST_DISABLE_GALLERY_CLICK)) {
      setTimeout(() => {
        if (isBrowser) {
          const imgList = document?.querySelectorAll(
            '.notion-collection-card-cover img'
          )
          if (imgList && zoomRef.current) {
            for (let i = 0; i < imgList.length; i++) {
              zoomRef.current.attach(imgList[i])
            }
          }

          const cards = document.getElementsByClassName(
            'notion-collection-card'
          )
          for (const e of cards) {
            e.removeAttribute('href')
          }
        }
      }, 800)
    }

    /**
     * Handling intra-page connection jumps
     * If the link is the current website, no new window will be opened for access.
     */
    if (isBrowser) {
      const currentURL = window.location.origin + window.location.pathname
      const allAnchorTags = document.getElementsByTagName('a') // Or use document.querySelectorAll('a') Obtain NodeList
      for (const anchorTag of allAnchorTags) {
        if (anchorTag?.target === '_blank') {
          const hrefWithoutQueryHash = anchorTag.href
            .split('?')[0]
            .split('#')[0]
          const hrefWithRelativeHash =
            currentURL.split('#')[0] + anchorTag.href.split('#')[1]

          if (
            currentURL === hrefWithoutQueryHash ||
            currentURL === hrefWithRelativeHash
          ) {
            anchorTag.target = '_self'
          }
        }
      }
    }
  }, [])

  if (!post || !post.blockMap) {
    return <>{post?.summary || ''}</>
  }

  return (
    <div
      id="notion-article"
      className={`mx-auto overflow-hidden ${className || ''}`}
    >
      <NotionRenderer
        recordMap={post.blockMap}
        mapPageUrl={mapPageUrl}
        mapImageUrl={mapImgUrl}
        components={{
          Code,
          Collection,
          Equation,
          Modal,
          Pdf,
          Tweet
        }}
      />

      <PrismMac />
    </div>
  )
}

/**
 * Automatically scroll to the specified area based on url parameters
 */
const autoScrollToTarget = () => {
  setTimeout(() => {
    // Jump to specified title
    const needToJumpToTitle = window.location.hash
    if (needToJumpToTitle) {
      const tocNode = document.getElementById(window.location.hash.substring(1))
      if (tocNode && tocNode?.className?.indexOf('notion') > -1) {
        tocNode.scrollIntoView({ block: 'start', behavior: 'smooth' })
      }
    }
  }, 180)
}

/**
 * Map id to blog post internal link.
 * @param {*} id
 * @returns
 */
const mapPageUrl = id => {
  // return 'https://www.notion.so/' + id.replace(/-/g, '')
  return '/' + id.replace(/-/g, '')
}

/**
 * Zoom
 * @returns
 */
function getMediumZoomMargin() {
  const width = window.innerWidth

  if (width < 500) {
    return 8
  } else if (width < 800) {
    return 20
  } else if (width < 1280) {
    return 30
  } else if (width < 1600) {
    return 40
  } else if (width < 1920) {
    return 48
  } else {
    return 72
  }
}
export default NotionPage
