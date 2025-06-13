import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('auth-token')?.value

  if (req.nextUrl.pathname.startsWith('/private')) {
    if (token !== process.env.HASHED_PASSWORD) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/private/:path*'],
}
