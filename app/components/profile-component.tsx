"use client";

import { CircleUser } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function ProfileComponent() {
  const { t } = useTranslation();
  const { data: sessionData } = useSession();

  return (
    <div className="w-full min-h-[calc(100vh-64px)] flex">
      <div className="max-w-5xl w-full flex flex-col gap-3 px-5">
        <div className="flex items-center gap-5 pb-5 mb-5 border-b">
          {sessionData?.user?.image ? (
            <Image
              src={sessionData?.user?.image}
              width={200}
              height={200}
              alt={t("Profile.avatar.alt", { name: sessionData.user.name })}
            />
          ) : (
            <CircleUser size={200} />
          )}

          <p className="text-7xl font-medium text-primary">
            {sessionData?.user?.name}
          </p>
        </div>
      </div>
    </div>
  );
}
