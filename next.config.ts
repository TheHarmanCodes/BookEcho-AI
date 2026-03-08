import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "covers.openlibrary.org" }],
    unoptimized: true,
  },
};

export default nextConfig;
