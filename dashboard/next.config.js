/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
        port: "9000",
        protocol: "http",
        pathname: "/**",
      },
      {
        hostname: "85.239.232.185",
        port: "9000",
        protocol: "http",
        pathname: "/**",
      },
      {
        hostname: "etphonehomebands.com",
        protocol: "http",
        pathname: "/**",
      },
      {
        hostname: "etphonehomebands.com",
        protocol: "https",
        pathname: "/**",
      },
    ],
    domains:[
      "localhost",
      "77.237.234.238",
      "77.237.234.238:7000",
    ]
  },
};

module.exports = nextConfig;
