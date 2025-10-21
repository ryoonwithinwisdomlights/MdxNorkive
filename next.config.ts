import type { NextConfig } from "next";
import { withContentCollections } from "@content-collections/next";
import withBundleAnalyzer from "@next/bundle-analyzer";
import path from "path";

/** @type {import('next').NextConfig} */
const baseConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: "standalone",
  staticPageGenerationTimeout: 120,

  // React 19 호환성을 위한 설정
  experimental: {
    scrollRestoration: true,
    mdxRs: false,
    // React 19의 새로운 기능들을 비활성화
    // reactCompiler: process.env.NODE_ENV === "development" ? true : false,
    // 최적화된 패키지 사용 (Tree shaking 개선)
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-icons",
      "@fortawesome/fontawesome-svg-core",
      "@fortawesome/free-solid-svg-icons",
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
    }

    // 프로덕션 환경에서 번들 최적화
    if (!dev && !isServer) {
      // 코드 스플리팅 최적화
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: "all",
          cacheGroups: {
            // 벤더 라이브러리 분리
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendors",
              chunks: "all",
              priority: 10,
              enforce: true,
            },
            // 공통 컴포넌트 분리
            common: {
              name: "common",
              minChunks: 2,
              chunks: "all",
              priority: 5,
              reuseExistingChunk: true,
            },
            // MDX 관련 코드 분리
            mdx: {
              test: /[\\/]content[\\/]/,
              name: "mdx-content",
              chunks: "all",
              priority: 8,
            },
            // Radix UI 컴포넌트 분리
            radix: {
              test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
              name: "radix-ui",
              chunks: "all",
              priority: 9,
            },
            // Font Awesome 분리
            fontawesome: {
              test: /[\\/]node_modules[\\/]@fortawesome[\\/]/,
              name: "fontawesome",
              chunks: "all",
              priority: 9,
            },
          },
        },
        // Tree shaking 최적화
        usedExports: true,
        sideEffects: false,
        // 모듈 연결 최적화
        concatenateModules: true,
        // 최소화 최적화
        minimize: true,
      };

      // 번들 크기 경고 설정
      config.performance = {
        ...config.performance,
        maxEntrypointSize: 512000, // 500KB
        maxAssetSize: 512000, // 500KB
        hints: "warning",
      };
    }

    return config;
  },

  // 이미지 최적화 설정
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
      {
        protocol: "https",
        hostname: "camo.githubusercontent.com",
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
};

// 번들 분석기 설정
const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default bundleAnalyzer(withContentCollections(baseConfig));
