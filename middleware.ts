import { NextRequest, NextResponse } from "next/server";

import i18next, { i18nConfig } from "@/app/i18n";

export default function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const themeCookie = request.cookies.get("theme")?.value;
  const languageCookie = request.cookies.get("i18next")?.value;

  const lang = languageCookie || i18next.language;
  i18next.init({
    ...i18nConfig,
    lng: lang
  });

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
  matcher: "/:path*"
};
