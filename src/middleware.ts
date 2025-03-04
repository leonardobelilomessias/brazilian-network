import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from './app/module/services/auth-services';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';



export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};

const publicRoutes = ["/",'/landing', '/cadastro', '/entrar',];

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: req, res });
  const pathname = req.nextUrl.pathname;
  await supabase.auth.getSession();

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  const session = await AuthService.isSessionValid()
  if (!session) {
    const isAPIRoute = pathname.startsWith('/api');

    if (isAPIRoute) {
        return NextResponse.next()
      return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
    }

    return NextResponse.redirect(new URL('/entrar', req.url));
  }

  return NextResponse.next();
}