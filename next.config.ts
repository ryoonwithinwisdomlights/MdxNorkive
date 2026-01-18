import type { NextConfig } from "next";
import { withContentCollections } from "@content-collections/next";
import withBundleAnalyzer from "@next/bundle-analyzer";
import path from "path";

/** @type {import('next').NextConfig} */
const baseConfig: NextConfig = {
  reactStrictMode: true,
    // Prevent Next.js from mis-detecting workspace root due to external lockfiles.
    outputFileTracingRoot: path.join(__dirname),
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: "standalone",
  staticPageGenerationTimeout: 120,

  // 이미지 최적화 설정
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
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
        hostname: "gravatar.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "camo.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "github.githubassets.com",
        
      },
      { protocol: "https", hostname: "abs.twimg.com" },
      { protocol: "https", hostname: "pbs.twimg.com" },
      { protocol: "https", hostname: "s3.us-west-2.amazonaws.com" },
    ],
  },

  // React 19 호환성을 위한 설정
  experimental: {
    scrollRestoration: true,
    mdxRs: false,
    // React 19의 새로운 기능들을 비활성화
    // reactCompiler: process.env.NODE_ENV === "development" ? true : false,
    // 최적화된 패키지 사용 (Tree shaking 개선)
    inlineCss: true,
    optimizePackageImports: [
      // UI 라이브러리
      "lucide-react",
      "@radix-ui/react-icons",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-alert-dialog",
      "@radix-ui/react-label",
      "@radix-ui/react-slot",
      "@radix-ui/react-visually-hidden",
      // fumadocs
      "fumadocs-core",
      "fumadocs-ui",
      // 유틸리티
      "date-fns",
      "lodash-es",
      "clsx",
      // 상태 관리 및 데이터 페칭
      "@tanstack/react-query",
      "zustand",
      // 기타
      "react-share",
      "sonner",
      "class-variance-authority",
    ],
  },

  // 번들 분석 및 최적화
  webpack: (config, { dev, isServer, webpack }) => {
    config.resolve.alias["@"] = path.resolve(__dirname);

    if (process.env.NODE_ENV === "development") {
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
};

// 번들 분석기 설정
const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default bundleAnalyzer(withContentCollections(baseConfig));
