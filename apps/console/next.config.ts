import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@supercloud/shared-ui"],
  output: "standalone",
  basePath: "/console",
  assetPrefix: "/console",
};

export default nextConfig;
