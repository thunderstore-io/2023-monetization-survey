const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  assetPrefix: isProd ? "/2023-monetization-survey" : "",
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
