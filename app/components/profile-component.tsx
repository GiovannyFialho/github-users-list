"use client";

import { useSession } from "next-auth/react";

import ProfileBodyDescription from "@/app/components/ProfileBodyDescription";
import UserAvatar from "@/app/components/UserAvatar";
import UserHeaderDescription from "@/app/components/UserHeaderDescription";

export default function ProfileComponent() {
  const { data: sessionData } = useSession();

  return (
    <div className="w-full lg:min-h-[calc(100vh-144px)] flex justify-center my-10">
      <div className="max-w-5xl w-full flex flex-col gap-3 px-5">
        <div className="flex flex-col lg:flex-row lg:items-center gap-5 pb-5 mb-5 border-b">
          <UserAvatar user={sessionData?.user} />

          <UserHeaderDescription user={sessionData?.user} />
        </div>

        <ProfileBodyDescription />
      </div>
    </div>
  );
}
