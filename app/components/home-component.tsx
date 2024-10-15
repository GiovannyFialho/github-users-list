"use client";

import { useTranslation } from "next-i18next";
import { Fragment, useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";

import SearchUser from "@/app/components/SearchUser";
import { toast } from "sonner";

import { useGetUsersLazyQuery } from "@/app/graphql/generated";

import tailwindConfig from "@/tailwind.config";
import { CircleUser } from "lucide-react";
import Image from "next/image";

export default function HomeComponent() {
  const { t } = useTranslation();

  const [getUsers, { data: users, loading: loadingUsers, error: errorUsers }] =
    useGetUsersLazyQuery();

  useEffect(() => {
    if (errorUsers) {
      toast(t("Home.requests.searchUsers.error"), {
        description: errorUsers.message,
        duration: 5000,
        position: "top-right"
      });
    }
  }, [t, errorUsers]);

  const handleSearch = (value: string) => {
    getUsers({ variables: { query: value, first: 10 } });
  };

  return (
    <div className="w-full min-h-[calc(100vh-104px)] flex flex-col md:items-center justify-center gap-10 my-10 md:mt-0">
      <div className="max-w-5xl w-full flex flex-col gap-3 px-5">
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold text-center text-primary mb-5">
          {t("Home.title")}
          <span className="font-light">Github</span>
        </h1>

        <SearchUser search={handleSearch} />
      </div>

      <div className="max-w-5xl w-full flex flex-col justify-center items-center">
        {loadingUsers ? (
          <RotatingLines
            width="50"
            strokeColor={tailwindConfig.theme?.extend?.colors?.primary.DEFAULT}
          />
        ) : (
          <Fragment>
            {users?.search.edges?.length === 0 ? (
              <p className="text-lg text-center">
                {t("Home.requests.searchUsers.nobody")}
              </p>
            ) : (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 px-5">
                {users?.search.edges?.map((edge) => {
                  if (edge?.node?.__typename === "User") {
                    return (
                      <div
                        key={edge.node.id}
                        className="w-full flex gap-3 border-4 border-primary"
                      >
                        {edge.node.avatarUrl ? (
                          <Image
                            src={edge.node.avatarUrl}
                            width={100}
                            height={100}
                            alt={`Avatar de ${edge.node.name}`}
                          />
                        ) : (
                          <CircleUser size={50} />
                        )}

                        <div className="flex flex-col gap my-5">
                          <h3 className="text-base font-bold">
                            {edge.node.name}
                          </h3>
                          <p className="text-sm font-normal">
                            {edge.node.login}
                          </p>
                        </div>
                      </div>
                    );
                  }

                  return null;
                })}
              </div>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
}
