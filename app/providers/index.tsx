"use client";

import { ApolloProvider } from "@apollo/client";
import Cookies from "js-cookie"; // Importar js-cookie para manipular cookies
import { SessionProvider } from "next-auth/react";
import { useEffect, useState, type ReactNode } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import { RotatingLines } from "react-loader-spinner";

import { UserProfileProvider } from "@/app/context/UserProfileContext";

import i18next from "@/app/i18n";
import { client } from "@/app/lib/client";

import tailwindConfig from "@/tailwind.config";

export function Providers({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initializeI18n = async () => {
      await i18n.init();
      setIsReady(true);
    };

    initializeI18n();
  }, [i18n]);

  useEffect(() => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    Cookies.set("theme", systemTheme, { expires: 365, sameSite: "strict" });
  }, []);

  if (!isReady) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <RotatingLines
          width="50"
          strokeColor={tailwindConfig.theme?.extend?.colors?.primary.DEFAULT}
        />
      </div>
    );
  }

  return (
    <ApolloProvider client={client}>
      <SessionProvider>
        <I18nextProvider i18n={i18next}>
          <UserProfileProvider>{children}</UserProfileProvider>
        </I18nextProvider>
      </SessionProvider>
    </ApolloProvider>
  );
}
