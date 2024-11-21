/* eslint-disable no-unused-vars */
import { BLOG } from '@/blog.config'
import dynamic from 'next/dynamic'

// const DebugPanel = dynamic(() => import('@/components/DebugPanel'), {
//   ssr: false
// })

// const Analytics = dynamic(
//   () =>
//     import('@vercel/analytics/react').then(async m => {
//       return m.Analytics
//     }),
//   { ssr: false }
// )

// const AosAnimation = dynamic(() => import('@/components/AOSAnimation'), {
//   ssr: false
// })
// const Ackee = dynamic(() => import('@/components/Ackee'), { ssr: false })
const Gtag = dynamic(() => import('@/components/Gtag'), { ssr: false })
const Busuanzi = dynamic(() => import('@/components/Busuanzi'), { ssr: false })
const GoogleAdsense = dynamic(() => import('@/components/GoogleAdsense'), {
  ssr: false
})
const VConsole = dynamic(() => import('@/components/VConsole'), { ssr: false })

const CustomContextMenu = dynamic(
  () => import('@/components/CustomContextMenu'),
  { ssr: false }
)
const DisableCopy = dynamic(() => import('@/components/DisableCopy'), {
  ssr: false
})

const ExternalPlugin = (props: any) => {
  return (
    <>
      {BLOG.ANALYTICS_GOOGLE_ID && <Gtag />}
      {/* {BLOG.ANALYTICS_VERCEL && <Analytics />} */}
      {typeof BLOG.ANALYTICS_BUSUANZI_ENABLE === 'string' &&
        JSON.parse(BLOG.ANALYTICS_BUSUANZI_ENABLE) && <Busuanzi />}
      {BLOG.ADSENSE_GOOGLE_ID && <GoogleAdsense />}
      {typeof BLOG.CUSTOM_RIGHT_CLICK_CONTEXT_MENU === 'string' &&
        JSON.parse(BLOG.CUSTOM_RIGHT_CLICK_CONTEXT_MENU) && (
          <CustomContextMenu {...props} />
        )}
      {typeof BLOG.CAN_COPY === 'string' && !JSON.parse(BLOG.CAN_COPY) && (
        <DisableCopy />
      )}
      <VConsole />
      {/* <AosAnimation /> */}
    </>
  )
}

export default ExternalPlugin
