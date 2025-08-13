"use client";

import Script from "next/script";

export default function GoogleAnalytics({
  ANALYTICS_GOOGLE_ID,
}: {
  ANALYTICS_GOOGLE_ID: string;
}) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_GOOGLE_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${ANALYTICS_GOOGLE_ID}');
          `,
        }}
      />
    </>
  );
}
