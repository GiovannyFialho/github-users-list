"use client";

import { CircleUser } from "lucide-react";
import Image from "next/image";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";

import { useMediaQuery } from "@/app/hooks/use-media-query";

type Props = {
  name?: string | null | undefined;
  image?: string;
  avatarUrl?: string;
};

interface UserAvatarProps {
  data?: Props;
}

export default function UserAvatar({ data }: UserAvatarProps) {
  const { t } = useTranslation();

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (!data) {
    return <CircleUser size={isDesktop ? 200 : 100} />;
  }

  const { name } = data;
  const image = data.image || data.avatarUrl;

  return (
    <Fragment>
      {image ? (
        <div className="border-8 border-primary shadow-lg">
          <Image
            src={image}
            width={isDesktop ? 200 : 100}
            height={isDesktop ? 200 : 100}
            alt={t("Profile.avatar.alt", { name })}
          />
        </div>
      ) : (
        <CircleUser size={isDesktop ? 200 : 100} />
      )}
    </Fragment>
  );
}
