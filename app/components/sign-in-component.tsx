"use client";

import { LogIn } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { Button } from "@/app/components/ui/button";

export default function SignInComponent() {
  const { t } = useTranslation();
  const { status } = useSession();
  const { push } = useRouter();

  const handleSignIn = async () => {
    const result = await signIn("github", { redirect: true, callbackUrl: "/" });

    if (result?.error) {
      toast(t("Shared.toast.error.title"), {
        description: t("Shared.toast.error.login"),
        duration: 5000,
        position: "top-right"
      });
    }
  };

  if (status === "authenticated") {
    push("/");

    return "";
  }

  return (
    <div className="w-full min-h-[calc(100vh-150px)] flex justify-center">
      <div className="max-w-5xl w-full flex flex-col items-center justify-between md:justify-start gap-3 px-5 mt-5 md:mt-24">
        <div className="flex flex-col items-center gap-2 mb-5">
          <h1 className="text-4xl md:text-7xl text-primary font-black text-center">
            {t("SignIn.title")}
          </h1>

          <p className="text-lg text-center">{t("SignIn.subtitle")}</p>
        </div>

        <Button
          type="button"
          data-testid="cypress-btnSignIn"
          className="w-full md:w-max h-14 flex gap-4 text-lg text-background px-5 py-3 lg:mb-3 rounded-none transition-all duration-300 hover:bg-primary-foreground"
          onClick={handleSignIn}
        >
          <LogIn className="text-background" />
          {t("SignIn.textBtn")}
        </Button>
      </div>
    </div>
  );
}
