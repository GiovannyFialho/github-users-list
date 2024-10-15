"use client";

import { CircleUser, Mail, User } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

import { useMediaQuery } from "@/app/hooks/use-media-query";

export default function ProfileComponent() {
  const { t } = useTranslation();
  const { data: sessionData } = useSession();

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <div className="w-full lg:min-h-[calc(100vh-144px)] flex justify-center my-10">
      <div className="max-w-5xl w-full flex flex-col gap-3 px-5">
        <div className="flex flex-col lg:flex-row lg:items-center gap-5 pb-5 mb-5 border-b">
          {sessionData?.user?.image ? (
            <Image
              src={sessionData?.user?.image}
              width={isDesktop ? 200 : 100}
              height={isDesktop ? 200 : 100}
              alt={t("Profile.avatar.alt", { name: sessionData.user.name })}
            />
          ) : (
            <CircleUser size={isDesktop ? 200 : 100} />
          )}

          <div className="flex flex-col gap-2">
            <h2 className="text-3xl lg:text-7xl font-medium text-primary">
              {sessionData?.user?.name}
            </h2>

            <div className="flex items-center gap-2">
              <User size={15} />
              <p className="text-base font-light">{sessionData?.user?.login}</p>
            </div>

            <div className="flex items-center gap-2">
              <Mail size={15} />
              <p className="text-base font-light">{sessionData?.user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
