import { BLOG } from '@/blog.config'
import dynamic from 'next/dynamic'
import Tabs from '@/components/Tabs'
import { isBrowser } from '@/lib/utils'
import { useRouter } from 'next/router'

const GiscusComponent = dynamic(
  () => {
    return import('@/components/Giscus')
  },
  { ssr: false }
)

/**
 * Comment component
 * @param {*} param0
 * @returns
 */
const Comment = ({ siteInfo, frontMatter, className }) => {
  const router = useRouter()

  if (
    isBrowser &&
    ('giscus' in router.query || router.query.target === 'comment')
  ) {
    setTimeout(() => {
      const url = router.asPath.replace('?target=comment', '')
      history.replaceState({}, '', url)
      document
        ?.getElementById('comment')
        ?.scrollIntoView({ block: 'start', behavior: 'smooth' })
    }, 1000)
  }

  if (!frontMatter) {
    return <>Loading...</>
  }

  return (
    <div
      key={frontMatter?.id}
      id="comment"
      className={`comment mt-5 text-neutral-800 dark:text-neutral-300 ${
        className || ''
      }`}
    >
      <Tabs>
        {BLOG.COMMENT_GISCUS_REPO && (
          <div key="Giscus">
            <GiscusComponent className="px-2" />
          </div>
        )}
      </Tabs>
    </div>
  )
}

export default Comment
