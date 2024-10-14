"use client";

import { SessionProvider } from "next-auth/react";
import { useEffect, useState, type ReactNode } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";

import i18next from "@/app/i18n";

export function Providers({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(i18n.isInitialized);
  }, [i18n]);

  if (!isReady) return null;

  return (
    <SessionProvider>
      <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
    </SessionProvider>
  );
}
