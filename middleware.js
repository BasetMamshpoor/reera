import {NextResponse} from 'next/server'
import {locales, defaultLocale} from './lib/i18n'

export function middleware(request) {
    const {pathname} = request.nextUrl

    if (pathname === '/') {
        request.nextUrl.pathname = '/fa'
        return NextResponse.rewrite(request.nextUrl)
    }

    const pathnameHasLocale = locales.some(
        (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
    )
    if (pathnameHasLocale) {
        return NextResponse.next()
    }

    request.nextUrl.pathname = `/${defaultLocale}${pathname}`
    return NextResponse.redirect(request.nextUrl)
}

export const config = {
    matcher: [
        '/((?!_next|favicon.ico|api|fonts|static|images|videos|models|sounds|robots.txt).*)'
    ]
}
