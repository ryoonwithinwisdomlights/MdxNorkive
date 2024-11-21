import { BLOG } from '@/blog.config'
import { loadExternalResource } from '@/lib/utils'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

/**
 * Initialize Google Ads
 * @returns
 */
export default function GoogleAdsense() {
  const initGoogleAdsense = () => {
    loadExternalResource(
      `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${BLOG.ADSENSE_GOOGLE_ID}`,
      'js'
    ).then(url => {
      setTimeout(() => {
        const ads = document.getElementsByClassName('adsbygoogle')
        const adsbygoogle = window.adsbygoogle
        if (ads.length > 0) {
          for (let i = 0; i <= ads.length; i++) {
            try {
              adsbygoogle.push(ads[i])
            } catch (e) {}
          }
        }
      }, 100)
    })
  }

  const router = useRouter()
  useEffect(() => {
    // Delay loading by 3 seconds
    setTimeout(() => {
      initGoogleAdsense()
    }, 3000)
  }, [router])

  return null
}

/**
 * In-article ad unit
 * Please configure and create corresponding ads in the Google Adsense backend and obtain the corresponding code
 * Edit the following ad units data-ad-slot data-ad-format data-ad-layout-key(If there is)
 * Added the ability to debug locally
 */
const AdSlot = ({ type = 'show' }) => {
  if (!BLOG.ADSENSE_GOOGLE_ID) {
    return null
  }
  // In-article advertising
  if (type === 'in-article') {
    return (
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-adtest={BLOG.ADSENSE_GOOGLE_TEST ? 'on' : 'off'}
        data-ad-client={BLOG.ADSENSE_GOOGLE_ID}
        data-ad-slot={BLOG.ADSENSE_GOOGLE_SLOT_IN_ARTICLE}
      ></ins>
    )
  }

  // 정보 흐름 광고
  if (type === 'flow') {
    return (
      <ins
        className="adsbygoogle"
        data-ad-format="fluid"
        data-ad-layout-key="-5j+cz+30-f7+bf"
        style={{ display: 'block' }}
        data-adtest={BLOG.ADSENSE_GOOGLE_TEST ? 'on' : 'off'}
        data-ad-client={BLOG.ADSENSE_GOOGLE_ID}
        data-ad-slot={BLOG.ADSENSE_GOOGLE_SLOT_FLOW}
      ></ins>
    )
  }

  // 네이티브 광고
  if (type === 'native') {
    return (
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-format="autorelaxed"
        data-adtest={BLOG.ADSENSE_GOOGLE_TEST ? 'on' : 'off'}
        data-ad-client={BLOG.ADSENSE_GOOGLE_ID}
        data-ad-slot={BLOG.ADSENSE_GOOGLE_SLOT_NATIVE}
      ></ins>
    )
  }

  //  디스플레이광고
  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client={BLOG.ADSENSE_GOOGLE_ID}
      data-adtest={BLOG.ADSENSE_GOOGLE_TEST ? 'on' : 'off'}
      data-ad-slot={BLOG.ADSENSE_GOOGLE_SLOT_AUTO}
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  )
}

export { AdSlot }
