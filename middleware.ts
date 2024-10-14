import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export default async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const token = await getToken({ req: request, secret });
  const themeCookie = request.cookies.get("theme")?.value;

  if (!token && request.headers.get("Accept")?.includes("text/html")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (request.headers.get("Accept")?.includes("text/html")) {
    response.headers.set(
      "Accept-CH",
      "Sec-CH-Prefers-Color-Scheme, Sec-CH-Prefers-Contrast"
    );

    response.headers.set(
      "Vary",
      "Sec-CH-Prefers-Color-Scheme, Sec-CH-Prefers-Contrast"
    );

    if (!themeCookie) {
      response.headers.set("Critical-CH", "Sec-CH-Prefers-Color-Scheme");
    }

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|img/|favicon.ico|sign-in).*)"]
};
