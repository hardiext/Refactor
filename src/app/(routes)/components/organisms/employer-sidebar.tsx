"use client"; // wajib kalau pakai hooks

import useGetRole from "@/hook/useRole";
import { AppSidebar } from "../../../(dashboard)/components/employer/organisms/sidebar";

export default function EmployeeSidebar() {
  const { role } = useGetRole();
  const isEmployee = role === "employer";

  if (!isEmployee) return null; 

  return <AppSidebar />;
}
