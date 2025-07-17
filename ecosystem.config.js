  module.exports = {
    apps: [{
      name: 'v1.connie.plus',
      script: 'npm',
      args: 'start',
      env_file: './.env.production',
      env: {
        NODE_ENV: 'production',
        NEXT_PUBLIC_OKTA_ISSUER: 'https://trial-2094636.okta.com',
        NEXT_PUBLIC_OKTA_CLIENT_ID: '0oat7hjmxbdY525p9697',
        NEXT_PUBLIC_OKTA_REDIRECT_URI: 'https://v1.connie.plus/callback',
        NEXT_PUBLIC_ALLOWED_PARENT_ORIGIN: 'https://flex.twilio.com',
        NEXT_PUBLIC_FLEX_DOMAIN: 'https://nss.connie.team'
      }
    }]
  };
