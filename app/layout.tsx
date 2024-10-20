import { Roboto } from "next/font/google";
import { headers } from "next/headers";

import Header from "@/app/components/Header";
import { Toaster } from "@/app/components/ui/sonner";
import { Providers } from "@/app/providers";

import "@/app/style/globals.css";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap"
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();

  const preferTheme = headersList.get("sec-ch-prefers-color-scheme") || "";
  const cookieThemeMatch = headersList.get("cookie")?.match(/theme=([^;]*)/);
  const cookieTheme = cookieThemeMatch ? cookieThemeMatch[1] : "";

  const theme = cookieTheme || (preferTheme === "dark" ? "dark" : "light");

  return (
    <html>
      <body className={roboto.className}>
        <Providers initialTheme={theme}>
          <Header />
          <main>{children}</main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
