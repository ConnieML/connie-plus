// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // CORS headers for iframe embedding in Flex
  response.headers.set('Access-Control-Allow-Origin', 'https://flex.twilio.com');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  response.headers.set('Access-Control-Allow-Credentials', 'true');

  // Frame ancestors for Flex CRMcontainer
  response.headers.set(
    'Content-Security-Policy',
    "frame-ancestors 'self' https://flex.twilio.com https://*.flex.twilio.com"
  );

  // Additional security headers
  response.headers.set('X-Frame-Options', 'ALLOW-FROM https://flex.twilio.com');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Okta-specific headers for iframe authentication
  response.headers.set('X-Permitted-Cross-Domain-Policies', 'none');
  
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: response.headers });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};