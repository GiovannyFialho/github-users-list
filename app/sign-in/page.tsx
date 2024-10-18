import { Metadata } from "next";
import { cookies } from "next/headers";

import SignInComponent from "@/app/components/sign-in-component";

import { type SupportedLanguages } from "@/app/i18n";
import locales from "@/app/i18n/locales";

export const generateMetadata = (): Metadata => {
  const lang =
    (cookies().get("i18next")?.value as SupportedLanguages) || "pt-BR";

  return {
    title: locales[lang]?.translations?.SignIn?.head?.title || "",
    description: locales[lang]?.translations?.Shared?.head?.description || ""
  };
};

export default function SignIn() {
  return <SignInComponent />;
}
