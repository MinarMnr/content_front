import { NextRequest, NextResponse } from "next/server";
export const middleware = (request: NextRequest) => {
  // const token = request.cookies.get("auth-token")?.value;
  // const headers = new Headers(request.headers);
  // headers.set("x-current-path", request.nextUrl.pathname);
  // headers.set("x-current-params", request.nextUrl.search);
  // return NextResponse.next({ headers });
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-current-path", request.nextUrl.pathname);
  requestHeaders.set("x-current-params", request.nextUrl.search);
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  return response;
};

// middleware.ts

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get("auth-token")?.value;

//   if (!token) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   //Verify token here if needed later -- MnR
//   // const isValid = await verifyToken(token);
//   // if (!isValid) {
//   //   return NextResponse.redirect(new URL('/login', request.url));
//   // }

//   return NextResponse.next();
// }

// // Match routes that need to be protected
// export const config = {
//   matcher: ["/admin/:path*"],
// };
