"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "sonner";

import UserDetailComponent from "@/app/components/user-detail-component";

import { useUserProfile } from "@/app/context/UserProfileContext";

import { useGetUserLazyQuery } from "@/app/graphql/generated";

import tailwindConfig from "@/tailwind.config";

export default function UserComponent() {
  const { t } = useTranslation();
  const params = useParams();
  const { setUserProfile } = useUserProfile();

  const [getUser, { data: user, loading: loadingUser, error: errorUser }] =
    useGetUserLazyQuery();

  useEffect(() => {
    if (errorUser) {
      toast(t("Home.requests.searchUsers.error"), {
        description: errorUser.message,
        duration: 5000,
        position: "top-right"
      });
    }
  }, [t, errorUser]);

  useEffect(() => {
    if (typeof params.name === "string") {
      getUser({ variables: { login: params.name } }).then((result) => {
        setUserProfile(result.data?.user);
      });
    }
  }, [getUser, params, setUserProfile]);

  return (
    <div className="w-full lg:min-h-[calc(100vh-144px)] flex justify-center my-10">
      {loadingUser ? (
        <div className="w-full flex justify-center items-center">
          <RotatingLines
            width="50"
            strokeColor={tailwindConfig.theme?.extend?.colors?.primary.DEFAULT}
          />
        </div>
      ) : user?.user && Object.keys(user.user).length > 0 ? (
        <div className="max-w-5xl w-full flex flex-col gap-3 px-5">
          <UserDetailComponent />
        </div>
      ) : (
        <p className="text-lg text-center">{t("Profile.nobody")}</p>
      )}
    </div>
  );
}
