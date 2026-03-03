import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: 'export',
  basePath: '/trivia-blitz',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
