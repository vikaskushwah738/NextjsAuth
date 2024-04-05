import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path=request.nextUrl.pathname
    
    const ispublicPath =path === '/signin' || path ==='/signup'
    || path ==='/verifyemail'  
    
    const token =request.cookies.get("token")?.value || ''

    if(ispublicPath && token) {
         return NextResponse.redirect(new URL('/', request.url))
    } 
    if(!ispublicPath && !token) {
        return NextResponse.redirect(new URL('/singin', request.url))
   } 
  return NextResponse.redirect(new URL('/home', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/signin',
    '/singup',
    '/profile',
    '/verifyemail'
  ]
}