import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@supercloud/shared-ui"],
  output: "standalone",
};

export default nextConfig;
