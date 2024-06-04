import { NextRequest, NextResponse } from 'next/server';
import getSession from './app/session';

interface Routes {
  [key: string]: boolean;
}

const publicOnlyUrls: Routes = {
  '/': true,
  '/login': true,
  '/sms': true,
  '/create-account': true,
  '/github/start': true,
  '/github/complete': true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const exists = publicOnlyUrls[request.nextUrl.pathname];
  if (!session.id) {
    if (!exists) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else {
    if (exists) {
      return NextResponse.redirect(new URL('/post', request.url));
    }
  }
}

export const config = {
  matcher: [
    //middleware 실행하기 싫은 url을 필터링할 정규식을 입력, 이것이것을 제외한 모든 URL을 피하는 것을 의미함
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
