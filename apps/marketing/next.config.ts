import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@supercloud/shared-ui"],
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://cloud-resource-manager-api.vercel.app/api/:path*",
      },
      {
        source: "/console/:path*",
        destination: "https://cloud-resource-manager-console.vercel.app/console/:path*",
      },
    ];
  },
};

export default nextConfig;
