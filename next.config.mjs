/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["192.168.1.179", "192.168.1.192:8004"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/storage/:path*",
        destination: "http://192.168.1.179:8001/:path*",
      },
      {
        source: "/storage/:path*",
        destination: "http://192.168.1.192:8004/:path*",
      },
      {
        source: "/api/:path*",
        destination: "http://192.168.1.192:8004/:path*", // Proxy to Backend
        //destination: "http://192.168.1.179:8001/:path*", // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
