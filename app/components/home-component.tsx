"use client";

import { CircleUser } from "lucide-react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "sonner";

import Logo from "@/app/components/Logo";
import SearchUser from "@/app/components/SearchUser";

import { useGetUsersLazyQuery } from "@/app/graphql/generated";

import tailwindConfig from "@/tailwind.config";

export default function HomeComponent() {
  const { t } = useTranslation();

  const [getUsers, { data: users, loading: loadingUsers, error: errorUsers }] =
    useGetUsersLazyQuery();

  const [initialState, setInitialState] = useState(true);

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
    if (value === "") {
      setInitialState(true);
    } else {
      setInitialState(false);
    }

    getUsers({ variables: { query: value, first: 10 } });
  };

  return (
    <div className="w-full lg:min-h-[calc(100vh-104px)] flex flex-col lg:items-center lg:justify-center gap-10 my-10 md:mt-0">
      <div className="max-w-5xl w-full flex flex-col gap-3 px-5">
        <h1
          data-testid="cypress-title"
          className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold text-center text-primary mb-5"
        >
          <Logo />
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
              <Fragment>
                {initialState === false && (
                  <div className="w-full px-5">
                    <p className="text-lg text-center">
                      {t("Home.requests.searchUsers.nobody")}
                    </p>
                  </div>
                )}
              </Fragment>
            ) : (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 px-5">
                {users?.search.edges?.map((edge) => {
                  if (edge?.node?.__typename === "User") {
                    return (
                      <Link
                        key={edge.node.id}
                        href={`/${edge.node.id}/${edge.node.login}`}
                        className="w-full flex gap-3 border-4 border-primary transition-all duration-300 shadow-lg hover:shadow"
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
                      </Link>
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
