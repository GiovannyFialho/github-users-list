"use client";

import { Fragment } from "react";

import UserAvatar from "@/app/components/UserAvatar";
import UserBodyDescription from "@/app/components/UserBodyDescription";
import UserHeaderDescription from "@/app/components/UserHeaderDescription";

import { useProfileStore } from "@/app/providers/profileProvider";

export default function UserDetailComponent() {
  const profile = useProfileStore((state) => state.profile);

  return (
    <Fragment>
      <div className="flex flex-col lg:flex-row lg:items-center gap-5 pb-5 mb-5 border-b">
        <UserAvatar user={profile} />

        <UserHeaderDescription user={profile} />
      </div>

      <UserBodyDescription />
    </Fragment>
  );
}
