import { createContext, ReactNode, useContext, useState } from "react";
import { createStore, StoreApi, useStore } from "zustand";

import { type GetUserQuery } from "@/app/graphql/generated";

export type UserProfile = Partial<GetUserQuery["user"]>;

type ProfileStore = {
  profile: UserProfile | null;
  updateProfile: (user: UserProfile | null) => void;
};

const ProfileContext = createContext<StoreApi<ProfileStore> | undefined>(
  undefined
);

export default function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile] = useState(() =>
    createStore<ProfileStore>((set) => ({
      profile: null,
      updateProfile: (user) => set(() => ({ profile: user }))
    }))
  );

  return (
    <ProfileContext.Provider value={profile}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfileStore<T>(selector: (state: ProfileStore) => T) {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("ProfileContext.Provider is missing");
  }

  return useStore(context, selector);
}
