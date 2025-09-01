/**
 * CORS Configuration for Cross-Account Support Bridge
 * Configured per Twilio Support recommendations
 */

export const allowedOrigins = [
  'https://nss.connie.team',
  'https://hhovv.connie.team', 
  'https://dev.connie.team',
  'https://devsandbox.connie.team',  // DevSandbox account
  'https://careteam.connie.team',    // Care Team account
  'https://connie.team',             // Legacy/fallback
  'https://flex.twilio.com',         // Flex domains
  'http://localhost:3000'            // Development
];