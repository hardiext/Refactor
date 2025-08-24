"use client";

import { createContext, useContext, ReactNode } from "react";
import useGetProfile from "@/hook/useGetProfile";

type ProfileContextType = ReturnType<typeof useGetProfile>;

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ userId, children }: { userId: string; children: ReactNode }) {
  const profileData = useGetProfile({ userId });
  return (
    <ProfileContext.Provider value={profileData}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfileContext() {
  const ctx = useContext(ProfileContext);
  if (!ctx) {
    throw new Error("useProfileContext must be used inside ProfileProvider");
  }
  return ctx;
}
