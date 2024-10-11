import { Metadata } from "next";
import { cookies } from "next/headers";

import AboutComponent from "@/app/components/about-component";

import { type SupportedLanguages } from "@/app/i18n";
import locales from "@/app/i18n/locales";

const lang = (cookies().get("i18next")?.value as SupportedLanguages) || "pt-BR";

export const metadata: Metadata = {
  title: locales[lang]?.translations?.About?.head?.title || "",
  description: locales[lang]?.translations?.Shared?.head?.description || ""
};

export default function About() {
  return <AboutComponent />;
}
