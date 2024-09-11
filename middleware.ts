// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware to check for the session token
export function middleware(request: NextRequest) {
  const token =
    request.cookies.get("next-auth.session-token") ||
    request.cookies.get("next-auth.callback-url");

  // If no session token is found, redirect to the sign-in page
  if (!token) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  // Allow the request to proceed if authenticated
  return NextResponse.next();
}

// Specify which routes the middleware should protect
export const config = {
  matcher: [
    "/dashboard/:path*", // Protect dashboard routes
  ],
};
