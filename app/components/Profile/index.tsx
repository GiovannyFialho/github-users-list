"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/app/components/ui/dropdown-menu";
import { CircleUser, LogOut } from "lucide-react";

export default function Profile() {
  const { data: sessionData, status } = useSession();

  function handleSignOut() {
    signOut();
  }

  if (status !== "authenticated") return;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-10 h-10 p-1 border-2 border-primary rounded-none bg-background">
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

      <DropdownMenuContent className="w-auto mr-5 rounded-none bg-primary">
        <DropdownMenuLabel className="text-base text-background font-medium">
          Olá, {sessionData.user?.name}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer rounded-none focus:bg-primary-foreground">
          <Link
            href="/profile"
            className="text-background hover:bg-primary-foreground"
          >
            Perfil (fazer)
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer rounded-none focus:bg-primary-foreground">
          <Button
            className="w-full flex items-center justify-start gap-2 text-background p-0 m-0 bg-transparent"
            onClick={handleSignOut}
          >
            <LogOut className="text-background" />
            Sign Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
