import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;

  // 1. Route /api/* to the API app
  if (pathname.startsWith("/api")) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("host", "cloud-resource-manager-api.vercel.app");
    
    return NextResponse.rewrite(
      new URL(`https://cloud-resource-manager-api.vercel.app${pathname}${url.search}`),
      {
        request: {
          headers: requestHeaders,
        },
      }
    );
  }

  // 2. Route /console or /console/* to the Console app
  if (pathname === "/console" || pathname.startsWith("/console/")) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("host", "cloud-resource-manager-console.vercel.app");

    return NextResponse.rewrite(
      new URL(`https://cloud-resource-manager-console.vercel.app${pathname}${url.search}`),
      {
        request: {
          headers: requestHeaders,
        },
      }
    );
  }
}

export const config = {
  matcher: [
    "/api/:path*",
    "/console/:path*",
  ],
};
