import { Metadata } from "next";
import { cookies } from "next/headers";

import ProfileComponent from "@/app/components/profile-component";

import { type SupportedLanguages } from "@/app/i18n";
import locales from "@/app/i18n/locales";
import thumb from "@/app/images/thumb.png";

export const generateMetadata = (): Metadata => {
  const lang =
    (cookies().get("i18next")?.value as SupportedLanguages) || "pt-BR";

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

  return {
    title: locales[lang]?.translations?.Home?.head?.title || "",
    description: locales[lang]?.translations?.Shared?.head?.description || "",
    openGraph: {
      images: [`${baseUrl}${thumb.src}`],
      type: "website",
      url: `${baseUrl}`
    }
  };
};

export default function About() {
  return <ProfileComponent />;
}
