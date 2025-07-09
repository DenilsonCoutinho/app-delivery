// middleware.ts na raiz
import { NextResponse, NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('authToken')?.value
  const { pathname } = req.nextUrl

  if (pathname.startsWith('/Order-board')) {
    if (token !== process.env.NEXT_PUBLIC_PASSWORD_TOKEN) {
      const url = req.nextUrl.clone()
      url.pathname = '/login_admin'
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/Order-board/:path*'],
}
