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
  async redirects() {
    return [
      {
        source: "/records",
        destination: "/records",
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
    config.resolve.alias["@"] = path.resolve(__dirname);
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
