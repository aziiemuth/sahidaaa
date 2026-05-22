import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow local images with next/image
    // If deploying as static export, uncomment below:
    // unoptimized: true,
  },
  // For static export (optional):
  // output: 'export',
};

export default nextConfig;
