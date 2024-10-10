"use client";

import { SunMoon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ChangeTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  function handleChangeTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setTheme(prefersDark ? "dark" : "light");

    if (prefersDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <div
      className="cursor-pointer w-auto h-10 flex items-center justify-center p-2 bg-primary hover:bg-primary-foreground"
      onClick={handleChangeTheme}
    >
      <SunMoon className="text-background" />
    </div>
  );
}
