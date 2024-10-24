"use client";

import { SunMoon } from "lucide-react";

import { useTheme } from "@/app/context/ThemeContext";

export default function ChangeTheme() {
  const { currentTheme, setTheme } = useTheme();

  function handleChangeTheme() {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  }

  return (
    <div
      className="cursor-pointer w-12 h-12 lg:w-auto lg:h-10 flex items-center border-none justify-center lg:p-2 bg-primary hover:bg-primary-foreground"
      onClick={handleChangeTheme}
      data-testid="cypress-themeTrigger"
    >
      <SunMoon className="text-background" />
    </div>
  );
}
