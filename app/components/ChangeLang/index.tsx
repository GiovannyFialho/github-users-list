"use client";

import { Check, Languages } from "lucide-react";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";

import { Button } from "@/app/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/app/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/app/components/ui/dropdown-menu";
import { Skeleton } from "@/app/components/ui/skeleton";

import { useMediaQuery } from "@/app/hooks/use-media-query";

export default function ChangeLang() {
  const { t, i18n } = useTranslation();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [open, setOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<string | null>(null);

  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [i18n]);

  if (currentLanguage === null) {
    return <Skeleton className="w-32 h-10 rounded-none bg-primary"></Skeleton>;
  }

  function handleLanguageChange(language: string) {
    setCurrentLanguage(language);
    setOpen(false);

    i18n.changeLanguage(language);
  }

  if (isDesktop) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="w-auto h-10 flex items-center gap-2 rounded-none text-background hover:text-background bg-primary hover:bg-primary-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
            variant="outline"
          >
            <Languages className="text-background" />
            {t(`Shared.header.changeLang.${currentLanguage}`)}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56 p-0 rounded-none bg-primary">
          <DropdownMenuLabel className="flex items-center">
            <p className="text-base text-background font-medium px-2 py-1 pt-2">
              {t("Shared.header.changeLang.title")}
            </p>
          </DropdownMenuLabel>

          <DropdownMenuSeparator className="my-0" />

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

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          className="w-auto h-10 flex items-center gap-2 rounded-none text-background hover:text-background bg-primary hover:bg-primary-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
          variant="outline"
        >
          <Languages className="text-background" />
          {t(`Shared.header.changeLang.${currentLanguage}`)}
        </Button>
      </DrawerTrigger>

      <DrawerContent className="rounded-none bg-primary">
        <DrawerHeader className="text-left">
          <DrawerTitle className="flex items-center gap-2 text-3xl text-background">
            <Languages className="text-background" />
            {t("Shared.header.changeLang.title")}
          </DrawerTitle>
        </DrawerHeader>

        <div className="flex flex-col gap-3 px-4">
          <div
            className="flex items-center gap-2 py-3 px-2 transition-all duration-300 hover:bg-primary-foreground"
            onClick={() => handleLanguageChange("pt-BR")}
          >
            {currentLanguage === "pt-BR" && (
              <Check className="text-background" />
            )}
            <p className="text-lg text-background">
              {t("Shared.header.changeLang.pt-BR")}
            </p>
          </div>

          <div
            className="flex items-center gap-2 py-3 px-2 transition-all duration-300 hover:bg-primary-foreground"
            onClick={() => handleLanguageChange("en-US")}
          >
            {currentLanguage === "en-US" && (
              <Check className="text-background" />
            )}
            <p className="text-lg text-background">
              {t("Shared.header.changeLang.en-US")}
            </p>
          </div>
        </div>

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button
              variant="outline"
              className="h-auto text-lg py-3 rounded-none bg-background"
              onClick={() => setOpen(false)}
            >
              {t("Shared.header.changeLang.cancel")}
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
