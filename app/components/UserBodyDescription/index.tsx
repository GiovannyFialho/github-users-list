"use client";

import { MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

import { type GitHubProfile } from "@/app/api/auth/[...nextauth]/route";

type SocialAccountsProps = {
  node: {
    provider: string;
    displayName: string;
  };
};

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

  const { bio, location } = data;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const socialAccounts = data?.social_accounts || data?.socialAccounts;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  const userURL = data?.html_url || data?.url;

  return (
    <div className="flex flex-col gap-5">
      {bio?.trim() !== "" && (
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold text-primary">
            {t("Profile.biography")}
          </h2>

          <p>{bio}</p>
        </div>
      )}

      {location !== "" && (
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold text-primary">
            {t("Profile.location")}
          </h2>

          <div className="flex items-center gap-2">
            <MapPin />

            <p>{location}</p>
          </div>
        </div>
      )}

      {socialAccounts?.edges.length > 0 && (
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold text-primary">
            {t("Profile.socialMedia")}
          </h2>

          <div className="flex flex-col gap-2">
            {socialAccounts?.edges.map((social: SocialAccountsProps) => {
              if (social.node.provider === "LINKEDIN") {
                return (
                  <div
                    className="flex items-center gap-2"
                    key={social.node.displayName}
                  >
                    <FaLinkedinIn />

                    <a
                      href={`https://linkedin.com/${social.node.displayName}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary"
                    >
                      {social.node.displayName}
                    </a>
                  </div>
                );
              }

              if (social.node.provider === "TWITTER") {
                return (
                  <div
                    className="flex items-center gap-2"
                    key={social.node.displayName}
                  >
                    <FaXTwitter />

                    <a
                      href={`https://x.com/${social.node.displayName}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary"
                    >
                      {social.node.displayName}
                    </a>
                  </div>
                );
              }

              return null;
            })}
          </div>
        </div>
      )}

      {userURL !== "" && (
        <a
          href={userURL}
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
