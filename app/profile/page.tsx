import { Metadata } from "next";
import { cookies } from "next/headers";

import ProfileComponent from "@/app/components/profile-component";

import { type SupportedLanguages } from "@/app/i18n";
import locales from "@/app/i18n/locales";
import thumb from "@/app/images/thumb.png";

export const generateMetadata = (): Metadata => {
  const lang =
    (cookies().get("i18next")?.value as SupportedLanguages) || "pt-BR";

  return {
    title: locales[lang]?.translations?.Profile?.head?.title || "",
    description: locales[lang]?.translations?.Shared?.head?.description || "",
    openGraph: {
      url: thumb.src
    }
  };
};

export default function About() {
  return <ProfileComponent />;
}
