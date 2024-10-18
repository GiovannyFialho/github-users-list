"use client";

import { Fragment } from "react";

import UserAvatar from "@/app/components/UserAvatar";
import UserBodyDescription from "@/app/components/UserBodyDescription";
import UserHeaderDescription from "@/app/components/UserHeaderDescription";

import { useUserProfile } from "@/app/context/UserProfileContext";

export default function UserDetailComponent() {
  const { userProfile } = useUserProfile();

  return (
    <Fragment>
      <div className="flex flex-col lg:flex-row lg:items-center gap-5 pb-5 mb-5 border-b">
        <UserAvatar user={userProfile} />

        <UserHeaderDescription user={userProfile} />
      </div>

      <UserBodyDescription />
    </Fragment>
  );
}
