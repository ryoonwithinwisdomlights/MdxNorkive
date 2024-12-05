import type { NextConfig } from "next";
import { BLOG } from "./blog.config";
const path = require("path");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: BLOG.BUNDLE_ANALYZER,
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
  async rewrites() {
    return [
      {
        source: "/:path*.html",
        destination: "/:path*",
      },
    ];
  },
  // Feed is redirected to /public/rss/feed.xml by default
  async redirects() {
    return [
      {
        source: "/feed",
        destination: "/rss/feed.xml",
        permanent: true,
      },
      {
        source: "/records",
        destination: "/",
        permanent: true,
      },
    ];
  },
  async headers() {
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
    // 동적 테마: 동적 경로를 실제 경로에 매핑하기 위해solve.alias 구성을 추가합니다.
    config.resolve.alias["@"] = path.resolve(__dirname);
    // config.resolve.alias.react = path.resolve(__dirname, "node_modules/react");
    // config.resolve.alias["react-dom"] = path.resolve(
    //   __dirname,
    //   "node_modules/react-dom"
    // );
    // Enable source maps in development mode
    if (process.env.NODE_ENV_API === "development") {
      config.devtool = "source-map";
    }

    if (!isServer) {
      config.resolve.fallback = {
        fs: false, // 클라이언트 번들에서 fs 제거
      };
      config.externals = {
        ...config.externals,
        "@headlessui/react": "@headlessui/react", // 서버 번들에서 제외
      };
    }

    return config;
  },
  experimental: {
    scrollRestoration: true,
  },
};

module.exports = withBundleAnalyzer(nextConfig);
