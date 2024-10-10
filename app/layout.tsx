import { Metadata } from "next";
import { Roboto } from "next/font/google";
import { headers } from "next/headers";

import Header from "@/app/components/Header";
import { Providers } from "@/app/providers";

import "@/app/style/globals.css";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Github List",
  description: "A list based on github's users"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();

  const preferTheme = headersList.get("sec-ch-prefers-color-scheme") || "";
  const cookieTheme =
    headersList.get("cookie")?.match(/theme=([^;]*)/)?.[1] || "";

  const theme = cookieTheme || (preferTheme === "dark" ? "dark" : "light");

  return (
    <html lang="en" className={theme}>
      <body className={roboto.className}>
        <Providers>
          <Header />

          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
