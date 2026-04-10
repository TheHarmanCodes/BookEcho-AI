import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "covers.openlibrary.org" },
      {
        protocol: "https",
        hostname: "lwkzdcqzlfqo0cmc.public.blob.vercel-storage.com",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
