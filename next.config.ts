import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve images in modern formats with automatic resizing
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
