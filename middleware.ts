import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const themeCookie = request.cookies.get("theme")?.value;

  // Checa se o request é para um documento HTML
  if (request.headers.get("Accept")?.includes("text/html")) {
    const response = NextResponse.next();

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
  matcher: "/:path*"
};
