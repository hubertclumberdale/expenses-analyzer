/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [
      "mongoose",
      "@typegoose/typegoose",
      "pdf-parse",
      "pdf2json",
    ],
  },
};

module.exports = nextConfig;
