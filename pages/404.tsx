import { getGlobalData } from '@/lib/notion/getNotionData'
import { useGlobal } from '@/lib/global'
import { useRouter } from 'next/router'
import { getLayoutByTheme } from '@/themes/theme'

/**
 * 404
 * @param {*} props
 * @returns
 */
const NoFound = props => {
  const { siteInfo } = useGlobal()
  const meta = {
    title: `${props?.siteInfo?.title} | Page not found`,
    image: props?.siteInfo?.pageCover
  }

  props = { ...props, meta }

  // Load different Layout files based on page path
  const Layout = getLayoutByTheme(useRouter())

  return <Layout {...props} />
}

export async function getStaticProps() {
  const props = (await getGlobalData({ from: '404' })) || {}
  return { props }
}

export default NoFound
