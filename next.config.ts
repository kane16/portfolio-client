import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    if (process.env.NODE_ENV === "development") {
      return [
        {
          source: "/api/auth/:path*",
          destination: "http://localhost:8080/:path*",
        },
        {
          source: "/api/portfolio/:path*",
          destination: "http://localhost:9090/:path*",
        }
      ]
    }
    return [] // No rewrite in production
  },
}

module.exports = {
  output: "standalone",
};

export default nextConfig;
