"use client";

import { Building, Mail, User } from "lucide-react";

import { type GitHubProfile } from "@/app/api/auth/[...nextauth]/route";

interface UserHeaderDescriptionProps {
  data?: Partial<GitHubProfile>;
}

export default function UserHeaderDescription({
  data
}: UserHeaderDescriptionProps) {
  if (!data) {
    return null;
  }

  const { name, login, email, company } = data;

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-3xl lg:text-7xl font-medium text-primary">{name}</h2>

      <div className="flex items-center gap-2">
        <User size={15} />
        <p className="text-base font-light">{login}</p>
      </div>

      {email && (
        <div className="flex items-center gap-2">
          <Mail size={15} />
          <p className="text-base font-light">{email}</p>
        </div>
      )}

      {company && (
        <div className="flex items-center gap-2">
          <Building size={15} />
          <p className="text-base font-light">{company}</p>
        </div>
      )}
    </div>
  );
}
