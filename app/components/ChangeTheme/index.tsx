"use client";

import Cookies from "js-cookie";
import { SunMoon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ChangeTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  function handleChangeTheme() {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);

    Cookies.set("theme", newTheme, {
      path: "/",
      sameSite: "strict",
      expires: 365
    });

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  useEffect(() => {
    const savedTheme = Cookies.get("theme");

    if (savedTheme) {
      setTheme(savedTheme as "light" | "dark");
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      setTheme(prefersDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  return (
    <div
      className="cursor-pointer w-12 h-12 lg:w-auto lg:h-10 flex items-center border-none justify-center lg:p-2 bg-primary hover:bg-primary-foreground"
      onClick={handleChangeTheme}
    >
      <SunMoon className="text-background" />
    </div>
  );
}
