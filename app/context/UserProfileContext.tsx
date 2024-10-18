import { createContext, FC, ReactNode, useContext, useState } from "react";

import { type GetUserQuery } from "@/app/graphql/generated";

export type UserProfile = Partial<GetUserQuery["user"]>;

interface UserProfileContextProps {
  userProfile: UserProfile | null;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
}

const UserProfileContext = createContext<UserProfileContextProps | undefined>(
  undefined
);

export const UserProfileProvider: FC<{ children: ReactNode }> = ({
  children
}) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  return (
    <UserProfileContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProfileProvider");
  }

  return context;
};
