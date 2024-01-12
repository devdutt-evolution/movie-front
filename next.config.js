/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
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
