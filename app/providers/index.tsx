"use client";

import { ApolloProvider } from "@apollo/client";
import { SessionProvider } from "next-auth/react";
import { useEffect, useState, type ReactNode } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";

import i18next from "@/app/i18n";
import { client } from "@/app/lib/client";

export function Providers({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(i18n.isInitialized);
  }, [i18n]);

  if (!isReady) return null;

  return (
    <ApolloProvider client={client}>
      <SessionProvider>
        <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
      </SessionProvider>
    </ApolloProvider>
  );
}
