"use client";

import {
  CircleDot,
  Dot,
  GitFork,
  GitPullRequestArrow,
  MapPin,
  Star
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

import { useUserProfile } from "@/app/context/UserProfileContext";

export default function UserBodyDescription() {
  const { t } = useTranslation();
  const { userProfile } = useUserProfile();

  if (!userProfile) {
    return null;
  }

  const { bio, location, repositories, socialAccounts, url, gists } =
    userProfile;

  return (
    <div className="flex flex-col gap-5">
      {bio?.trim() !== "" && (
        <div className="flex flex-col gap-4 lg:gap-3">
          <h2 className="text-3xl font-bold text-primary">
            {t("Profile.biography")}
          </h2>

          <p>{bio}</p>
        </div>
      )}

      {location !== "" && (
        <div className="flex flex-col gap-4 lg:gap-3">
          <h2 className="text-3xl font-bold text-primary">
            {t("Profile.location")}
          </h2>

          <div className="flex items-center gap-2">
            <MapPin />

            <p>{location}</p>
          </div>
        </div>
      )}

      {repositories?.nodes && (
        <div className="flex flex-col gap-4 lg:gap-3">
          <h2 className="text-3xl font-bold text-primary">
            {t("Profile.repositories")}
          </h2>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-5">
            {repositories?.nodes?.map((repository) => (
              <a
                href={repository?.url}
                key={repository?.id}
                className="w-full h-44 flex flex-col justify-between gap-5 px-3 py-2 bg-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex flex-col">
                  <h3 className="text-2xl font-bold text-background">
                    {repository?.name}
                  </h3>

                  <p className="max-h-[3rem] text-sm font-normal text-background overflow-hidden text-ellipsis line-clamp-1">
                    {repository?.description}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col items-center">
                    <p className="flex items-center gap-1 text-sm text-background font-light">
                      <CircleDot size={15} className="text-background" />
                      Issues
                    </p>

                    <p className="text-2xl font-bold text-background">
                      {repository?.issues.totalCount}
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
                      {repository?.pullRequests.totalCount}
                    </p>
                  </div>

                  <div className="flex flex-col items-center">
                    <p className="flex items-center gap-1 text-sm text-background font-light">
                      <GitFork size={15} className="text-background" />
                      Forks
                    </p>

                    <p className="text-2xl font-bold text-background">
                      {repository?.forks.totalCount}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {gists?.nodes && (
        <div className="flex flex-col gap-4 lg:gap-3">
          <h2 className="text-3xl font-bold text-primary">Gists</h2>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-5">
            {gists?.nodes?.map((gist) => (
              <a
                href={gist?.url}
                key={gist?.id}
                className="w-full h-40 flex flex-col justify-between gap-5 px-3 py-2 overflow-auto bg-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3 className="max-h-[3rem] text-lg font-bold text-background">
                  {gist?.description}
                </h3>

                <div className="flex flex-col">
                  {gist?.files?.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <p className="text-lg font-normal text-background">
                        {file?.name}
                      </p>

                      <div className="flex items-center gap-1">
                        <div className="flex items-center gap-1">
                          <p className="flex items-center gap-1 text-sm text-background font-light">
                            <GitFork size={15} className="text-background" />
                            Forks
                          </p>

                          <p className="text-sm font-bold text-background">
                            {gist.forks.totalCount}
                          </p>
                        </div>

                        <Dot className="text-background" />

                        <div className="flex items-center gap-1">
                          <p className="flex items-center gap-1 text-sm text-background font-light">
                            <Star size={15} className="text-background" />
                            Stars
                          </p>

                          <p className="text-sm font-bold text-background">
                            {gist.stargazers.totalCount}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {socialAccounts?.edges && (
        <div className="flex flex-col gap-4 lg:gap-3">
          <h2 className="text-3xl font-bold text-primary">
            {t("Profile.socialMedia")}
          </h2>

          <div className="flex flex-col gap-2">
            {socialAccounts?.edges.map((social) => {
              if (social?.node?.provider === "LINKEDIN") {
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

              if (social?.node?.provider === "TWITTER") {
                return (
                  <div
                    className="flex items-center gap-2"
                    key={social?.node.displayName}
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

      {url !== "" && (
        <a
          href={url}
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
