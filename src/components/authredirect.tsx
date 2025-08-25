"use client";
import { useAuthRedirect } from "@/hook/useAuth";

export const AuthRedirectClient = () => {
  useAuthRedirect();
  return null; // cuma menjalankan hook
};
