const isProd = process.env.NODE_ENV === "production";
const assetPrefix = isProd ? "/2023-monetization-survey" : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  assetPrefix,
  publicRuntimeConfig: {
    assetPrefix,
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
