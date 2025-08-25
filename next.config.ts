// next.config.ts
import type { NextConfig } from "next";
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'source.unsplash.com',
      "1000logos.net",
      "pluspng.com",
      "logospng.org",
      "www.pngarts.com",
      "upload.wikimedia.org",
      "aqgvzkgzdioyjybiuzyr.supabase.co"
    ]
  }
};

export default withBundleAnalyzer(nextConfig);
