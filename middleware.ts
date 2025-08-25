import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Edge Functions do not support Node.js modules like 'stream', 'fs', 'url', or 'path'.
// Ensure no Node.js APIs are used here.

export function middleware(request: NextRequest) {
  // Rate limiting for admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Security headers only, no Node.js APIs
    const response = NextResponse.next();

    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');

    return response;
  }

  // Security headers for landing pages
  if (request.nextUrl.pathname !== '/' && !request.nextUrl.pathname.startsWith('/api')) {
    const response = NextResponse.next();

    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};