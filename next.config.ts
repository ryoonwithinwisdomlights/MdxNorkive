import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";
const path = require("path");
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: process.env.EXPORT ? "export" : undefined,
  staticPageGenerationTimeout: 120,
  images: {
    // Image compression
    formats: ["image/avif", "image/webp"],
    // Allow next/image to load images domain name
    domains: [
      "gravatar.com",
      "www.notion.so",
      "avatars.githubusercontent.com",
      "images.unsplash.com",
      "source.unsplash.com",
      "p1.qhimg.com",
      "webmention.io",
      "ko-fi.com",
    ],
  },

  // Feed is redirected to /public/rss/feed.xml by default
  redirects: process.env.EXPORT
    ? undefined
    : async () => {
        return [
          {
            source: "/feed",
            destination: "/rss/feed.xml",
            permanent: true,
          },
        ];
      },
  headers: process.env.EXPORT
    ? undefined
    : async () => {
        return [
          {
            source: "/:path*{/}?",
            headers: [
              { key: "Access-Control-Allow-Credentials", value: "true" },
              { key: "Access-Control-Allow-Origin", value: "*" },
              {
                key: "Access-Control-Allow-Methods",
                value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
              },
              {
                key: "Access-Control-Allow-Headers",
                value:
                  "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
              },
            ],
          },
        ];
      },
  webpack: (config, { dev, isServer }) => {
    // Dynamic theme: Add resolve.alias configuration to map dynamic paths to actual paths

    // Workaround for ensuring that `react` and `react-dom` resolve correctly
    // when using a locally-linked version of `react-notion-x`.
    // @see https://github.com/vercel/next.js/issues/50391
    // const path = require("path");
    const { fileURLToPath } = require("url");
    const dirname = path.dirname(fileURLToPath(import.meta.url));
    config.resolve.alias.react = path.resolve(dirname, "node_modules/react");
    config.resolve.alias["react-dom"] = path.resolve(
      dirname,
      "node_modules/react-dom"
    );
    // Enable source maps in development mode
    if (process.env.NODE_ENV_API === "development") {
      config.devtool = "source-map";
    }
    config.resolve.fallback = { fs: false };
    return config;
  },
  experimental: {
    scrollRestoration: true,
  },
};

// export default withBundleAnalyzer({
//   staticPageGenerationTimeout: 300,
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "www.notion.so",
//         pathname: "**",
//       },
//       {
//         protocol: "https",
//         hostname: "notion.so",
//         pathname: "**",
//       },
//       {
//         protocol: "https",
//         hostname: "images.unsplash.com",
//         pathname: "**",
//       },
//       {
//         protocol: "https",
//         hostname: "pbs.twimg.com",
//         pathname: "**",
//       },
//       {
//         protocol: "https",
//         hostname: "abs.twimg.com",
//         pathname: "**",
//       },
//       {
//         protocol: "https",
//         hostname: "s3.us-west-2.amazonaws.com",
//         pathname: "**",
//       },
//       {
//         protocol: "https",
//         hostname: "transitivebullsh.it",
//         pathname: "**",
//       },
//     ],
//     formats: ["image/avif", "image/webp"],
//     dangerouslyAllowSVG: true,
//     contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
//     // Allow next/image to load images domain name
//     domains: [
//       "gravatar.com",
//       "www.notion.so",
//       "avatars.githubusercontent.com",
//       "images.unsplash.com",
//       "source.unsplash.com",
//       "p1.qhimg.com",
//       "webmention.io",
//     ],
//   },
//   // By default the feed will be redirected to /public/rss/feed.xml
//   async redirects() {
//     return [
//       {
//         source: "/feed",
//         destination: "/rss/feed.xml",
//         permanent: true,
//       },
//     ];
//   },
//   async rewrites() {
//     return [
//       {
//         source: "/:path*.html",
//         destination: "/:path*",
//       },
//     ];
//   },
//   async headers() {
//     return [
//       {
//         source: "/:path*{/}?",
//         headers: [
//           { key: "Access-Control-Allow-Credentials", value: "true" },
//           { key: "Access-Control-Allow-Origin", value: "*" },
//           {
//             key: "Access-Control-Allow-Methods",
//             value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
//           },
//           {
//             key: "Access-Control-Allow-Headers",
//             value:
//               "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
//           },
//         ],
//       },
//     ];
//   },
//   webpack: (config, _context) => {
//     // Workaround for ensuring that `react` and `react-dom` resolve correctly
//     // when using a locally-linked version of `react-notion-x`.
//     // @see https://github.com/vercel/next.js/issues/50391
//     const path = require("path");
//     const { fileURLToPath } = require("url");
//     const dirname = path.dirname(fileURLToPath(import.meta.url));
//     config.resolve.alias.react = path.resolve(dirname, "node_modules/react");
//     config.resolve.alias["react-dom"] = path.resolve(
//       dirname,
//       "node_modules/react-dom"
//     );
//     config.resolve.alias["@theme-components"] = path.resolve(
//       __dirname,
//       "themes",
//       "gitbook"
//     );
//     config.resolve.alias = {
//       ...config.resolve.alias,
//       "node:fs": "fs",
//       "node:fs/promises": "fs/promises",
//       "node:path": "path",
//       "node:url": "url",
//     };
//     return config;
//   },
//   experimental: {
//     scrollRestoration: true,
//   },
//   //   exportPathMap: async function (
//   //     defaultPathMap,
//   //     { dev, dir, outDir, distDir, buildId }
//   //   ) {
//   //     // When exporting, ignore /pages/sitemap.xml.js, otherwise an error will be reported getServerSideProps
//   //     const pages = { ...defaultPathMap };
//   //     delete pages["/sitemap.xml"];
//   //     return pages;
//   //   },
//   compiler: {
//     // ssr and displayName are configured by default
//     styledComponents: {
//       displayName: true,
//       // Enabled by default.
//       ssr: true,

//       pure: true,
//     },
//   },
//   publicRuntimeConfig: {
//     // The configuration here can be obtained on the server side or on the browser side.
//     NODE_ENV_API: process.env.NODE_ENV_API || "prod",
//     THEMES: themes,
//   },
// });
module.exports = withBundleAnalyzer(nextConfig);
