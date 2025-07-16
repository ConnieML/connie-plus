/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Environment variables
  env: {
    NEXT_PUBLIC_OKTA_ISSUER: process.env.NEXT_PUBLIC_OKTA_ISSUER,
    NEXT_PUBLIC_OKTA_CLIENT_ID: process.env.NEXT_PUBLIC_OKTA_CLIENT_ID,
    NEXT_PUBLIC_OKTA_REDIRECT_URI: process.env.NEXT_PUBLIC_OKTA_REDIRECT_URI,
  },

  // Headers for iframe embedding and CORS
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'ALLOW-FROM https://flex.twilio.com',
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://flex.twilio.com https://*.flex.twilio.com https://nss.connie.team",
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://nss.connie.team',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization, X-Requested-With',
          },
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
        ],
      },
    ];
  },

  // Rewrites for API routes if needed
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;