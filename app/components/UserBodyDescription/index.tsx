"use client";

import { Fragment } from "react";
import { useTranslation } from "react-i18next";

import { type GitHubProfile } from "@/app/api/auth/[...nextauth]/route";

interface UserBodyDescriptionProps {
  data?: Partial<GitHubProfile>;
}

export default function UserBodyDescription({
  data
}: UserBodyDescriptionProps) {
  const { t } = useTranslation();

  if (!data) {
    return null;
  }

  const { bio } = data;

  return (
    <div className="flex flex-col gap-2">
      {bio?.trim() != "" && (
        <Fragment>
          <h2 className="text-3xl font-medium text-primary">
            {t("Profile.biography")}
          </h2>

          <p>{bio}</p>
        </Fragment>
      )}
    </div>
  );
}
