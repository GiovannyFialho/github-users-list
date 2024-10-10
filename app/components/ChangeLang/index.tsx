"use client";

import i18next from "i18next";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/app/components/ui/dropdown-menu";
import { Languages } from "lucide-react";

export default function ChangeLang() {
  const { t } = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState(i18next.language);

  function handleLanguageChange(language: string) {
    setCurrentLanguage(language);
    i18next.changeLanguage(language);
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="w-auto h-10 flex items-center gap-2 rounded-none text-background bg-primary hover:bg-primary-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
          variant="outline"
        >
          <Languages className="text-background" />

          {t(`Shared.header.changeLang.${currentLanguage}`)}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 rounded-none bg-primary">
        <DropdownMenuLabel className="text-base text-background font-medium">
          {t("Shared.header.changeLang.title")}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuCheckboxItem
          checked={currentLanguage === "pt-BR"}
          onCheckedChange={() => handleLanguageChange("pt-BR")}
          className="cursor-pointer text-background rounded-none focus:bg-primary-foreground focus:text-background"
        >
          {t("Shared.header.changeLang.pt-BR")}
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          checked={currentLanguage === "en-US"}
          onCheckedChange={() => handleLanguageChange("en-US")}
          className="cursor-pointer text-background rounded-none focus:bg-primary-foreground focus:text-background"
        >
          {t("Shared.header.changeLang.en-US")}
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
