import type { NextConfig } from "next";
import { withContentCollections } from "@content-collections/next";
import path from "path";

/** @type {import('next').NextConfig} */
const baseConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: "standalone",
  staticPageGenerationTimeout: 120,
  experimental: {
    scrollRestoration: true,
    mdxRs: false,
  },
  images: {
    // Image compression
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gravatar.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "p1.qhimg.com",
      },
      {
        protocol: "https",
        hostname: "ko-fi.com",
      },
      { protocol: "https", hostname: "abs.twimg.com" },
      { protocol: "https", hostname: "pbs.twimg.com" },
      { protocol: "https", hostname: "s3.us-west-2.amazonaws.com" },
      {
        protocol: "https",
        hostname: "prod-files-secure.s3.us-west-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "github.githubassets.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
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
      // externals에서 @headlessui/react 제거
    }

    // lightningcss 문제 해결
    if (process.env.VERCEL) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }

    return config;
  },
};

export default withContentCollections(baseConfig);
