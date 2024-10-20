import { Metadata } from "next";
import { cookies } from "next/headers";

import UserComponent from "@/app/components/user-component";

import { type SupportedLanguages } from "@/app/i18n";
import locales from "@/app/i18n/locales";
import thumb from "@/app/images/thumb.png";

type UserPageProps = {
  params: {
    id: string;
    name: string;
  };
};

export const generateMetadata = ({ params }: UserPageProps): Metadata => {
  const lang =
    (cookies().get("i18next")?.value as SupportedLanguages) || "pt-BR";

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

  return {
    title:
      `${locales[lang]?.translations?.Profile?.head?.title} | ${params.name}` ||
      params.name,
    description: locales[lang]?.translations?.Shared?.head?.description || "",
    openGraph: {
      images: [`${baseUrl}${thumb.src}`],
      type: "website",
      url: `${baseUrl}`
    }
  };
};

export default function UserPage() {
  return <UserComponent />;
}
