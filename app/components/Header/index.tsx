"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import ChangeLang from "@/app/components/ChangeLang";
import ChangeTheme from "@/app/components/ChangeTheme";
import Profile from "@/app/components/Profile";

export default function Header() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [hasShadow, setHasShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasShadow(true);
      } else {
        setHasShadow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`w-full h-auto sticky top-0 flex items-center justify-between px-5 py-3 bg-background transition-shadow duration-300 ${
        hasShadow ? "shadow-md" : ""
      }`}
    >
      <nav className="flex items-center gap-2">
        {pathname !== "/sign-in" && (
          <Link
            href="/"
            className={`
              text-lg font-bold text-primary border-b-2 transition-all duration-100 hover:text-primary-foreground hover:border-primary-foreground
              ${
                pathname === "/"
                  ? "border-primary-foreground"
                  : "border-transparent"
              }
            `}
          >
            {t("Home.itemMenu")}
          </Link>
        )}
      </nav>

      <div className="flex items-center gap-2">
        <ChangeLang />
        <ChangeTheme />
        <Profile />
      </div>
    </header>
  );
}
