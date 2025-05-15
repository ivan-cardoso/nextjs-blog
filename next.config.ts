import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/", // The incoming path
        destination: "/blog", // The path to redirect to
        permanent: true, // Set to true for a 308 permanent redirect (recommended for SEO)
        // Set to false for a 307 temporary redirect if this might change
      },
      // You can add more redirects here if needed
      // {
      //   source: '/old-path',
      //   destination: '/new-path',
      //   permanent: true,
      // },
    ];
  },
};

export default nextConfig;
