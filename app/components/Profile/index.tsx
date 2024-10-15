"use client";

import { CircleUser, LogOut, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/app/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/app/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/app/components/ui/dropdown-menu";

import { useMediaQuery } from "@/app/hooks/use-media-query";

interface ProfileProps {
  goToProfile?: (value: boolean) => void;
}

export default function Profile({ goToProfile }: ProfileProps) {
  const { t } = useTranslation();
  const { data: sessionData, status } = useSession();

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const [open, setOpen] = useState(false);

  function handleSignOut() {
    signOut();
  }

  function handleGoToProfile() {
    setOpen(false);
    goToProfile?.(true);
  }

  if (status !== "authenticated") return;

  if (isDesktop) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-10 h-10 p-1 border-2 border-primary rounded-none bg-primary focus-visible:ring-0 hover:bg-primary-foreground">
            {sessionData.user?.image ? (
              <Image
                src={sessionData.user?.image}
                width={35}
                height={35}
                alt={`Imagem de perfil do ${sessionData.user?.name}`}
              />
            ) : (
              <CircleUser />
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-auto mr-5 p-0 rounded-none bg-primary">
          <DropdownMenuLabel className="flex items-center">
            <p className="text-base text-background font-medium px-2 py-1 pt-2">
              {t("Profile.control.hello", { name: sessionData.user?.name })}
            </p>
          </DropdownMenuLabel>

          <DropdownMenuSeparator className="my-0" />

          <DropdownMenuItem asChild>
            <Link
              href="/profile"
              className="cursor-pointer text-sm text-background h-10 px-3 py-2 rounded-none focus:bg-primary-foreground focus:text-background"
            >
              {t("Profile.head.title")}
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            asChild
            className="cursor-pointer h-10 rounded-none"
          >
            <Button
              className="w-full flex items-center justify-start gap-2 text-sm text-background px-3 py-2 bg-transparent focus:bg-primary-foreground focus:text-background focus-visible:ring-0 focus-visible:ring-offset-0"
              onClick={handleSignOut}
            >
              <LogOut size={15} className="text-background" />
              {t("Profile.control.signout")}
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  } else {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button className="w-12 h-12 p-1 border-2 border-primary rounded-none bg-primary focus-visible:ring-0 hover:bg-primary-foreground">
            {sessionData.user?.image ? (
              <Image
                src={sessionData.user?.image}
                width={35}
                height={35}
                alt={`Imagem de perfil do ${sessionData.user?.name}`}
              />
            ) : (
              <CircleUser />
            )}
          </Button>
        </DrawerTrigger>

        <DrawerContent className="rounded-none bg-primary border-none">
          <DrawerHeader>
            <DrawerTitle className="text-2xl text-background font-medium text-left px-2 py-1 pt-2">
              {t("Profile.control.title", { name: sessionData.user?.name })}
            </DrawerTitle>

            <DrawerDescription className="text-sm text-background font-light">
              {t("Profile.control.description")}
            </DrawerDescription>
          </DrawerHeader>

          <div className="flex flex-col gap-3 px-4">
            <Button
              className="cursor-pointer w-full flex items-center justify-start gap-2 text-lg text-background h-10 px-3 py-2 rounded-none focus:bg-primary-foreground focus:text-background"
              onClick={handleGoToProfile}
            >
              <User size={20} className="text-background" />
              {t("Profile.head.title")}
            </Button>

            <Button
              className="w-full flex items-center justify-start gap-2 text-lg text-background px-3 py-2 bg-transparent focus:bg-primary-foreground focus:text-background focus-visible:ring-0 focus-visible:ring-offset-0"
              onClick={handleSignOut}
            >
              <LogOut size={20} className="text-background" />
              {t("Profile.control.signout")}
            </Button>
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
}
