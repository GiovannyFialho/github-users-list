"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { FaGithub } from "react-icons/fa6";

import { formatBytes } from "@/app/utils/formatBytes";
import { useSession } from "next-auth/react";

export default function ProfileBodyDescription() {
  const { t } = useTranslation();
  const { data: sessionData } = useSession();

  if (!sessionData?.user) {
    return null;
  }

  const {
    html_url,
    plan,
    node_id,
    login,
    id,
    gists_url,
    public_gists,
    private_gists
  } = sessionData.user;

  return (
    <div className="flex flex-col gap-5">
      <Link
        href={`/${node_id}/${login}`}
        rel="noopener noreferrer"
        className="w-max flex items-center gap-2 text-lg font-medium text-background px-3 py-1 shadow-lg bg-primary transition-all duration-300 hover:shadow"
      >
        {t("Profile.seeProfile")}
      </Link>

      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold text-primary">
          {t("Profile.sensitiveInformation")}
        </h2>

        <div className="flex flex-col gap-2">
          <p>
            <strong>ID:</strong> {id}
          </p>

          {plan?.name && (
            <div className="flex flex-col gap-2 my-2 pt-2 border-t">
              <h3 className="text-2xl font-bold text-primary">
                {t("Profile.plan.title")}:
              </h3>

              <p>
                <strong>{t("Profile.plan.name")}:</strong> {plan?.name}
              </p>

              <p>
                <strong>{t("Profile.plan.collaborators")}:</strong>{" "}
                {plan?.collaborators}
              </p>

              <p>
                <strong>{t("Profile.plan.privateRepositories")}:</strong>{" "}
                {plan?.private_repos}
              </p>

              <p>
                <strong>{t("Profile.plan.space")}:</strong>{" "}
                {formatBytes(plan?.space)}
              </p>
            </div>
          )}

          {gists_url ? (
            <div className="flex flex-col gap-2 pt-2 border-t">
              <h3 className="text-2xl font-bold text-primary">Gists:</h3>

              <p>
                <strong>{t("Profile.gists.private")}:</strong> {private_gists}
              </p>

              <p>
                <strong>{t("Profile.gists.public")}:</strong> {public_gists}
              </p>

              <a
                href={gists_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-max flex items-center gap-2 text-lg font-medium text-background px-3 py-1 mt-5 shadow-lg bg-primary transition-all duration-300 hover:shadow"
              >
                {t("Profile.gists.accessNow")}
              </a>
            </div>
          ) : null}
        </div>
      </div>

      {html_url !== "" && (
        <a
          href={html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-max flex items-center gap-2 text-lg font-medium text-background px-3 py-1 mt-20 shadow-lg bg-primary transition-all duration-300 hover:shadow"
        >
          <FaGithub />
          {t("Profile.fullProfile")}
        </a>
      )}
    </div>
  );
}
