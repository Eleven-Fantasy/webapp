import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Define protected routes that require authentication
    const protectedRoutes = ["/profile"];
    const protectedApiRoutes = ["/api/points", "/api/user"];

    // Check if the current path is a protected route
    const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );
    const isProtectedApiRoute = protectedApiRoutes.some((route) =>
        pathname.startsWith(route)
    );

    // Only check authentication for protected routes
    if (isProtectedRoute || isProtectedApiRoute) {
        // Check for NextAuth session token in cookies
        const hasSession =
            request.cookies.has("next-auth.session-token") ||
            request.cookies.has("__Secure-next-auth.session-token") ||
            request.cookies.has("authjs.session-token") ||
            request.cookies.has("__Secure-authjs.session-token");

        if (!hasSession) {
            if (isProtectedApiRoute) {
                // Return 401 for API routes
                return NextResponse.json(
                    { error: "Unauthorized" },
                    { status: 401 }
                );
            }
            // Redirect to sign-in for protected pages
            const signInUrl = new URL("/signin", request.url);
            signInUrl.searchParams.set("callbackUrl", pathname);
            return NextResponse.redirect(signInUrl);
        }
    }

    // Allow all other routes to pass through
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder (images, fonts)
         */
        "/((?!_next/static|_next/image|favicon.ico|images|fonts).*)",
    ],
};
