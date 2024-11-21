import { BLOG } from '@/blog.config'

/**
 * Third-party code statistics script
 * @returns {JSX.Element}
 * @constructor
 */
const CommonScript = () => {
  return (
    <>
      {/* Google Statistics */}
      {BLOG.ANALYTICS_GOOGLE_ID && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${BLOG.ANALYTICS_GOOGLE_ID}`}
          />
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${BLOG.ANALYTICS_GOOGLE_ID}', {
                      page_path: window.location.pathname,
                    });
                  `
            }}
          />
        </>
      )}
    </>
  )
}

export default CommonScript
