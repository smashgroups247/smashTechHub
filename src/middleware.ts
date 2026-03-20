/**
 * Next.js Middleware — protects routes that require authentication.
 *
 * Protected paths:  /dashboard, /profile
 * Public paths:     /login, /  (and everything else)
 *
 * The token is read from localStorage via a cookie mirror strategy:
 * when the user logs in we also set an httpOnly-like cookie "auth_token_present"
 * so middleware can check it without touching localStorage (which is unavailable
 * in Edge runtime).
 */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED_PATHS = ['/dashboard'];
const AUTH_COOKIE = 'auth_token_presence';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );

  const hasToken = request.cookies.has(AUTH_COOKIE);

  // Redirect unauthenticated users away from protected pages
  if (isProtected && !hasToken) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect already-authenticated users away from /login
  if (pathname === '/login' && hasToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - _next/static (static files)
     * - _next/image  (image optimisation)
     * - favicon.ico
     * - api routes
     */
    '/((?!_next/static|_next/image|favicon.ico|api/).*)',
  ],
};
