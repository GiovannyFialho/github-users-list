"use client";

import { Building, CalendarDays, Mail, User, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { RxDividerVertical } from "react-icons/rx";

import { useUserProfile } from "@/app/context/UserProfileContext";

export default function UserHeaderDescription() {
  const { t, i18n } = useTranslation();
  const { userProfile } = useUserProfile();

  if (!userProfile) {
    return null;
  }

  const { name, login, email, company, followers, following } = userProfile;

  const cleanDate = new Date(userProfile.createdAt)
    .toLocaleDateString(i18n.language, { year: "numeric", month: "short" })
    .replace(/^\w+/, (month) => month.charAt(0).toUpperCase() + month.slice(1))
    .replace(".", "");

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

      <h2 className="text-5xl lg:text-7xl font-bold text-primary">
        {name?.split(" ").slice(0, 2).join(" ")}
      </h2>

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

      <div className="flex items-center">
        <Users size={15} className="mr-2" />

        {followers && (
          <div className="flex items-center gap-2">
            <p className="text-base font-light">
              {t("Profile.followers", { quantity: followers.totalCount })}
            </p>
          </div>
        )}

        <RxDividerVertical />

        {following && (
          <div className="flex items-center gap-2">
            <p className="text-base font-light">
              {t("Profile.following", { quantity: following.totalCount })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
