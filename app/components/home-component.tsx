"use client";

import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";

import SearchUser from "@/app/components/SearchUser";

export default function HomeComponent() {
  const { t } = useTranslation();

  const [searchUser, setSearchUser] = useState("");

  useEffect(() => {
    if (searchUser !== "") {
      console.log({ searchUser });
    }
  }, [searchUser]);

  return (
    <div className="w-full min-h-[calc(100vh-64px)] flex md:items-center justify-center mt-10 md:mt-0">
      <div className="max-w-5xl w-full flex flex-col gap-3 px-5">
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold text-center text-primary mb-5">
          {t("Home.title")}
          <span className="font-light">Github</span>
        </h1>

        <SearchUser
          search={(value) =>
            value !== "" ? setSearchUser(value) : setSearchUser("")
          }
        />
      </div>
    </div>
  );
}
