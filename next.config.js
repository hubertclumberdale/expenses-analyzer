/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [
      "mongoose",
      "@typegoose/typegoose",
      "pdf-parse",
    ],
  },
};

module.exports = nextConfig;
