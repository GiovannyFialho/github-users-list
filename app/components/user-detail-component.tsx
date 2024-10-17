"use client";

import { Fragment } from "react";

import UserAvatar from "@/app/components/UserAvatar";
import UserBodyDescription from "@/app/components/UserBodyDescription";
import UserHeaderDescription from "@/app/components/UserHeaderDescription";

import { type GitHubProfile } from "@/app/api/auth/[...nextauth]/route";

interface UserDetailComponentProps {
  data: Partial<GitHubProfile>;
}

export default function UserDetailComponent({
  data
}: UserDetailComponentProps) {
  return (
    <Fragment>
      <div className="flex flex-col lg:flex-row lg:items-center gap-5 pb-5 mb-5 border-b">
        <UserAvatar data={data} />

        <UserHeaderDescription data={data} />
      </div>

      <UserBodyDescription data={data} />
    </Fragment>
  );
}
