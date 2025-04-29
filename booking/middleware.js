//function that has asccess to the request response cycle and objects
//sit between client and the requests it made and you have access to the request and response objects
//run on any request to any page or on certain routes
//protects certain routes like booking and login...

// middleware.js
import { NextResponse } from "next/server";
import checkAuth from './app/actions/checkAuth'


export async function middleware(request) {
    const {isAuthenticated} = await checkAuth();
    if(!isAuthenticated){
        return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
}

export const config = {
  matcher: [ '/bookings' ],
    /*
     * Match all request paths except for the ones starting with:
    we can make the routes thta define in here to redirect to the login page if we are not logged in
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
}