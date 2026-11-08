import type { NextConfig } from "next";

const repo = "black-Pearls";

const nextConfig: NextConfig = {
  output: "export",
  basePath: `/${repo}`,
  assetPrefix: `/${repo}/`,
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
