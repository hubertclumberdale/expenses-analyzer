/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: [
      "mongoose",
      "@typegoose/typegoose",
      "pdf-parse",
    ],
  },
};

module.exports = nextConfig;
