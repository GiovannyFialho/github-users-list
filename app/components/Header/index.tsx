"use client";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import ChangeLang from "@/app/components/ChangeLang";
import ChangeTheme from "@/app/components/ChangeTheme";
import Profile from "@/app/components/Profile";
import { Button } from "@/app/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/app/components/ui/sheet";

import { useMediaQuery } from "@/app/hooks/use-media-query";

export default function Header() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const { push } = useRouter();

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const [openMenu, setOpenMenu] = useState(false);
  const [hasShadow, setHasShadow] = useState(false);
  const [hasCloseProfile, setHasCloseProfile] = useState(false);

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

  useEffect(() => {
    if (hasCloseProfile) {
      setOpenMenu(false);
      push("/profile");
    }
  }, [hasCloseProfile, push]);

  function handleGoToHome() {
    setOpenMenu(false);
    push("/");
  }

  return (
    <header
      className={`w-full h-auto sticky top-0 px-5 py-3 bg-background transition-shadow duration-300 ${
        hasShadow ? "shadow-md" : ""
      }`}
    >
      {isDesktop ? (
        <div className="flex items-center justify-between">
          <nav className="flex items-center gap-2">
            {pathname !== "/sign-in" && (
              <Link
                href="/"
                className={`
                  w-max text-lg font-medium py-0 px-2 transition-all duration-200
                  relative after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-primary after:w-full
                  after:origin-left after:scale-x-0 after:transition-transform after:duration-200 hover:after:scale-x-100
                  ${pathname === "/" ? "after:scale-x-100" : ""}
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
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <Sheet open={openMenu} onOpenChange={setOpenMenu}>
            <SheetTrigger asChild>
              <Button
                type="button"
                className="w-10 h-10 p-0 border-none rounded-none text-background hover:text-background bg-primary hover:bg-primary-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
                variant="outline"
              >
                <Menu size={20} />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="h-screen flex flex-col gap-3 px-2"
            >
              <VisuallyHidden>
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>This is a menu</SheetDescription>
                </SheetHeader>
              </VisuallyHidden>

              <div className="w-full h-full flex flex-col justify-between">
                <Button
                  type="button"
                  variant="link"
                  onClick={handleGoToHome}
                  className={`
                    w-max text-lg font-medium mt-10 py-0 px-2 border-b hover:no-underline hover:border-primary
                    ${
                      pathname === "/" ? "border-primary" : "border-transparent"
                    }
                  `}
                >
                  {t("Home.itemMenu")}
                </Button>

                <div className="flex items-center flex-wrap gap-2 mb-16">
                  <ChangeLang />
                  <ChangeTheme />
                  <Profile goToProfile={(value) => setHasCloseProfile(value)} />
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <p className="text-lg font-bold text-center text-primary">
            {t("Home.title")}
            <span className="font-light">Github</span>
          </p>
        </div>
      )}
    </header>
  );
}
