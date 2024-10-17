"use client";

import { CircleUser } from "lucide-react";
import Image from "next/image";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";

import { useMediaQuery } from "@/app/hooks/use-media-query";

import { type GitHubProfile } from "@/app/api/auth/[...nextauth]/route";

interface UserAvatarProps {
  data?: Partial<GitHubProfile>;
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
