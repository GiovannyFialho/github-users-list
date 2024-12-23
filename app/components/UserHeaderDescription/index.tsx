"use client";

import { Building, CalendarDays, Mail, User, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { RxDividerVertical } from "react-icons/rx";

import { type GitHubProfile } from "@/app/api/auth/[...nextauth]/route";
import { type GetUserQuery } from "@/app/graphql/generated";

interface UserHeaderDescriptionProps {
  user?: Partial<GitHubProfile> | Partial<GetUserQuery["user"]>;
}

export default function UserHeaderDescription({
  user
}: UserHeaderDescriptionProps) {
  const { t, i18n } = useTranslation();

  if (!user) {
    return null;
  }

  const { name, login, email, company } = user;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const cleanDate = new Date(user?.created_at || user?.createdAt)
    .toLocaleDateString(i18n.language, { year: "numeric", month: "short" })
    .replace(/^\w+/, (month) => month.charAt(0).toUpperCase() + month.slice(1))
    .replace(".", "");

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const followers = user?.followers?.totalCount || user?.followers;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const following = user?.following?.totalCount || user?.following;

  return (
    <div className="flex flex-col gap-2">
      {cleanDate !== "" && (
        <div className="w-max flex items-center gap-1 py-1 px-2 bg-primary">
          <CalendarDays size={15} className="text-background" />

          <p className="text-sm text-background font-light text-center">
            {cleanDate}
          </p>
        </div>
      )}

      <h2 className="text-5xl lg:text-7xl font-bold text-primary">{name}</h2>

      <div className="flex items-center gap-2">
        <User size={15} />
        <p className="text-base font-light">{login}</p>
      </div>

      {email && (
        <div className="flex items-center gap-2">
          <Mail size={15} />
          <a
            href={`mailto:${email}`}
            className="text-base font-light hover:text-primary"
          >
            {email}
          </a>
        </div>
      )}

      {company && (
        <div className="flex items-center gap-2">
          <Building size={15} />
          <p className="text-base font-light">{company}</p>
        </div>
      )}

      {(followers || following) && (
        <div className="flex items-center">
          <Users size={15} className="mr-2" />

          {followers && (
            <div className="flex items-center gap-2">
              <p className="text-base font-light">
                {t("Profile.followers", { quantity: followers })}
              </p>
            </div>
          )}

          <RxDividerVertical />

          {following && (
            <div className="flex items-center gap-2">
              <p className="text-base font-light">
                {t("Profile.following", { quantity: following })}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
