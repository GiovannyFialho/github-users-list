"use client";

import { CircleUser } from "lucide-react";
import Image from "next/image";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";

import { type UserProfile } from "@/app/components/user-detail-component";

import { useMediaQuery } from "@/app/hooks/use-media-query";

interface UserAvatarProps {
  data?: UserProfile;
}

export default function UserAvatar({ data }: UserAvatarProps) {
  const { t } = useTranslation();

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (!data) {
    return <CircleUser size={isDesktop ? 200 : 100} />;
  }

  const { name } = data;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const image = data.avatar_url || data?.avatarUrl;

  return (
    <Fragment>
      {image ? (
        <div className="w-max mx-auto lg:mx-0 mb-10 lg:mb-0 border-8 border-primary shadow-lg">
          <Image
            src={image}
            width={200}
            height={200}
            alt={t("Profile.avatar.alt", { name })}
          />
        </div>
      ) : (
        <CircleUser size={200} />
      )}
    </Fragment>
  );
}
