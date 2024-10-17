"use client";

import { CircleDot, GitFork, GitPullRequestArrow, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

import { type GitHubProfile } from "@/app/api/auth/[...nextauth]/route";

type RepositoryWithTotalProps = {
  totalCount: number;
};

type RepositoryProps = {
  id: string;
  name: string;
  description: string;
  url: string;
  issues: RepositoryWithTotalProps;
  pullRequests: RepositoryWithTotalProps;
  forks: RepositoryWithTotalProps;
};

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

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const repositories = data?.repositories || null;

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

      {repositories && (
        <div>
          <h2 className="text-3xl font-bold text-primary mb-3">
            {t("Profile.repositories")}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {repositories?.nodes?.map((repository: RepositoryProps) => (
              <div
                key={repository.id}
                className="w-full h-44 flex flex-col justify-between gap-5 px-3 py-2 bg-primary"
              >
                <div className="flex flex-col">
                  <h3 className="text-2xl font-bold text-background">
                    {repository.name}
                  </h3>

                  <p className="max-h-[3rem] text-sm font-normal text-background overflow-hidden text-ellipsis line-clamp-1">
                    {repository.description}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col items-center">
                    <p className="flex items-center gap-1 text-sm text-background font-light">
                      <CircleDot size={15} className="text-background" />
                      Issues
                    </p>

                    <p className="text-2xl font-bold text-background">
                      {repository.issues.totalCount}
                    </p>
                  </div>

                  <div className="flex flex-col items-center">
                    <p className="flex items-center gap-1 text-sm text-background font-light">
                      <GitPullRequestArrow
                        size={15}
                        className="text-background"
                      />
                      Pull requests
                    </p>

                    <p className="text-2xl font-bold text-background">
                      {repository.pullRequests.totalCount}
                    </p>
                  </div>

                  <div className="flex flex-col items-center">
                    <p className="flex items-center gap-1 text-sm text-background font-light">
                      <GitFork size={15} className="text-background" />
                      Forks
                    </p>

                    <p className="text-2xl font-bold text-background">
                      {repository.forks.totalCount}
                    </p>
                  </div>
                </div>
              </div>
            ))}
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
