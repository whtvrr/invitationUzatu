/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  },
  serverExternalPackages: ['mongoose'],
};

module.exports = nextConfig;