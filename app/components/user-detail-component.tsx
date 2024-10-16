"use client";

import UserAvatar from "@/app/components/UserAvatar";
import UserHeaderDescription from "@/app/components/UserHeaderDescription";

import { GetUserQuery } from "@/app/graphql/generated";
import { Fragment } from "react";

type UserProps = NonNullable<GetUserQuery["user"]>;

interface UserDetailComponentProps {
  data: UserProps;
}

export default function UserDetailComponent({
  data
}: UserDetailComponentProps) {
  return (
    <Fragment>
      <UserAvatar data={data} />

      <UserHeaderDescription data={data} />
    </Fragment>
  );
}
