"use client";

import { type ReactNode } from "react";
import { I18nextProvider } from "react-i18next";

import i18next from "@/app/i18n";

export function Providers({ children }: { children: ReactNode }) {
  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
}
