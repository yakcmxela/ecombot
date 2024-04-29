/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API: process.env.API_URL,
    AUTH_TOKEN: process.env.AUTH_TOKEN,
    PARTNER_ID: process.env.PARTNER_ID,
  },
};

export default nextConfig;
