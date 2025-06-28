import { BLOG } from "@/blog.config";

/**
 * Third-party code statistics script
 * @returns {JSX.Element}
 * @constructor
 */
const CommonScript = () => {
  return (
    <>
      {/* Google Statistics */}
      {BLOG.analytics_google_id && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${BLOG.analytics_google_id}`}
          />
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${BLOG.analytics_google_id}', {
                      page_path: window.location.pathname,
                    });
                  `,
            }}
          />
        </>
      )}
    </>
  );
};

export default CommonScript;
