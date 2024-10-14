"use client";

import { CircleUser, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/app/components/ui/dropdown-menu";

export default function Profile() {
  const { t } = useTranslation();
  const { data: sessionData, status } = useSession();

  function handleSignOut() {
    signOut();
  }

  if (status !== "authenticated") return;

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

        <DropdownMenuItem asChild className="cursor-pointer h-10 rounded-none">
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
}
