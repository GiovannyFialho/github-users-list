"use client";

import { User } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const { t } = useTranslation();

  const [inputFocus, setInputFocus] = useState(false);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col gap-3">
        <h1 className="text-9xl font-bold text-center text-primary mb-5">
          {t("Home.title")}
          <span className="font-light">Github</span>
        </h1>

        <div className="flex items-center gap-4 p-0 border">
          <div
            className={`
              p-3 transition-all duration-300
              ${inputFocus ? "bg-primary-foreground" : "bg-primary"}
            `}
          >
            <User className="text-background" />
          </div>

          <Input
            placeholder={t("Home.search.placeholder")}
            className="h-auto text-lg p-0 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            onFocus={() => setInputFocus(true)}
            onBlur={() => setInputFocus(false)}
          />
        </div>

        <Button
          type="button"
          className="h-auto text-lg text-background font-medium uppercase rounded-none bg-primary hover:bg-primary-foreground"
        >
          {t("Home.search.actionSearch")}
        </Button>
      </div>
    </div>
  );
}
