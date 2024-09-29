/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
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
  },
};

export default nextConfig;
// NEXT_PUBLIC_API_BASE_URL=http://85.239.232.185:9000/backend/api/v1
// NEXT_PUBLIC_API_AUTH_KEY=et_account_auth
// NEXT_PUBLIC_FILE_URL_KEY=http://85.239.232.185:9000/backend/api/v1
