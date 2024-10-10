import { Metadata } from "next";
import { Roboto } from "next/font/google";

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
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `
          }}
        />
      </head>

      <body className={roboto.className}>
        <Providers>
          <Header />

          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
