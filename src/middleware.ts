
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Redirect user to /register if they visit the root
  const token = request.cookies.get("access_token")?.value
  if (request.nextUrl.pathname === '/' && !token) {
    return NextResponse.redirect(new URL('/register', request.url));
  }

  if (['/register', '/login'].includes(request.nextUrl.pathname) && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/((?!_next|_static|favicon.ico).*)'],
};
