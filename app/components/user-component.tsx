"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "sonner";

import UserDetailComponent from "@/app/components/user-detail-component";

import { useGetUserLazyQuery } from "@/app/graphql/generated";

import tailwindConfig from "@/tailwind.config";

export default function UserComponent() {
  const { t } = useTranslation();
  const params = useParams();

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
      getUser({ variables: { login: params.name } });
    }
  }, [getUser, params]);

  return (
    <div className="w-full lg:min-h-[calc(100vh-144px)] flex justify-center my-10">
      <div className="max-w-5xl w-full flex flex-col gap-3 px-5">
        <div className="flex flex-col lg:flex-row lg:items-center gap-5 pb-5 mb-5 border-b">
          {loadingUser ? (
            <RotatingLines
              width="50"
              strokeColor={
                tailwindConfig.theme?.extend?.colors?.primary.DEFAULT
              }
            />
          ) : user?.user && Object.keys(user.user).length > 0 ? (
            <UserDetailComponent data={user.user} />
          ) : (
            <p>não tem nada</p>
          )}
        </div>
      </div>
    </div>
  );
}
