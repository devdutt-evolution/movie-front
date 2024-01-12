/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/posters/**",
      },
      {
        protocol: "https",
        hostname: "movie-back-cn9a.onrender.com",
        port: "443",
        pathname: "/posters/**",
      },
    ],
  },
};

module.exports = nextConfig;
